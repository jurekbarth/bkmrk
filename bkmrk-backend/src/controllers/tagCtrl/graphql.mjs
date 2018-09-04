import graphqlSequelize from 'graphql-sequelize';
import Sequelize from 'sequelize';
import chalk from 'chalk';

import { sql } from '../../db';

import Tag, { ItemTag } from '../../models/Tag';

const { resolver } = graphqlSequelize;

const resolvers = {
  Tag: {
    async links(obj, args, context, info) {
      const { currentUser } = context;
      try {
        const results = await resolver(Tag.Links, {
          before: (options) => {
            options.where = options.where || {};
            options.where.userUuid = currentUser.uuid;
            return options;
          },
        })(obj, args, context, info);
        return results;
      } catch (error) {
        const tagId = obj.id;
        const tag = await Tag.findById(tagId);
        return resolver(Tag.Links, {
          before: (options) => {
            options.where = options.where || {};
            options.where.userUuid = currentUser.uuid;
            return options;
          },
        })(tag, args, context, info);
      }
    },
    async meta(...args) {
      const context = args[2];
      const { currentUser } = context;
      let tagId;
      try {
        tagId = args[0].dataValues.id;
      } catch (error) {
        try {
          tagId = args[0].id;
        } catch (err) {
          // wtf
        }
      }
      const count = await ItemTag.count({
        where: { tag_id: tagId, user_Uuid: currentUser.uuid },
      });
      return { count };
    },
  },
  Query: {
    tag(obj, args, context, info) {
      const { id } = args;
      const { currentUser } = context;
      if (!currentUser) {
        throw new Error('You must be logged in');
      }
      return resolver(Tag, {
        before: (options) => {
          options.where = options.where || {};
          options.where.id = id;
          return options;
        },
      })(obj, args, context, info);
    },
    async tags(obj, { order = null, limit = null }, context, info) {
      /* eslint-disable */
      /*
        🔥 Aweful Resolver
        I don't get sequelize and how it works, so it's a wild mix of custom queries and the basic resolver. It even returns different kind of data.
        1. Basic resolver: It's used when the order arg is undefined. It returns all tags, for everybody
        2. Resolver for args.order === 'LATEST_USAGE', it depends on the merge table for Tags <- MergeTable (ItemTags) -> Links. Sequelize is not happy about this and i'm not sure if it's a good idea, but ItWorks™. It orders by the users latest used tags. Other downsides: You're not able to resolve Links associated with these tags anymore.
        3. Resolver for args.order === 'POPULARITY', it counts for the users most used tags based on the same merge table from above. All downsides apply here aswell.
      */
      /* eslint-enable */
      const { currentUser } = context;
      if (!currentUser) {
        throw new Error('You must be logged in');
      }
      // l for limit is used in the 2, 3 resolver / if statement
      let l = 10;
      if (limit !== null) {
        const parsedLimit = parseInt(limit, 10);
        // eslint-disable-next-line
        if (!isNaN(parsedLimit) && parsedLimit < 100) {
          l = parsedLimit;
        }
      }
      if (order === null) {
        // Get all tags, no filtering at all
        return resolver(Tag, {
          before: (options) => {
            options.where = options.where || {};
            return options;
          },
        })(obj, { limit }, context, info);
      } else if (order === 'LATEST_USAGE') {
        return sql.query(
          `SELECT * FROM (SELECT DISTINCT ON (item_tags.tag_id) item_tags.tag_id AS "id", item_tags."createdAt", tags.title FROM (SELECT * FROM "item_tags" WHERE "item_tags"."user_Uuid" = '${
            currentUser.uuid
          }') AS "item_tags" LEFT OUTER JOIN tags ON item_tags.tag_id = tags.id GROUP BY "item_tags"."tag_id", tags.title, "item_tags"."createdAt" ORDER BY item_tags.tag_id, "item_tags"."createdAt" DESC) AS "item_tags" ORDER BY "item_tags"."createdAt" DESC LIMIT ${l};`,
          { type: Sequelize.QueryTypes.SELECT },
        );
      } else if (order === 'POPULARITY') {
        return sql.query(
          `SELECT item_tags.tag_id AS "id", tags.title, COUNT(item_tags.tag_id) AS "count" FROM (SELECT * FROM "item_tags" WHERE "item_tags"."user_Uuid" = '${
            currentUser.uuid
          }') AS "item_tags" LEFT OUTER JOIN tags ON item_tags.tag_id = tags.id GROUP BY item_tags.tag_id, tags.title ORDER BY "count" DESC LIMIT ${l};`,
          { type: Sequelize.QueryTypes.SELECT },
        );
      }
      // should not happen, if used the right way
      return null;
    },
  },
};

export default resolvers;
