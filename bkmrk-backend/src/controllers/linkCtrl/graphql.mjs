import graphqlSequelize from 'graphql-sequelize';

import fetch from 'node-fetch';
import validator from 'validator';
import Link from '../../models/Link';
import Tag, { ItemTag } from '../../models/Tag';

const { resolver } = graphqlSequelize;

const resolvers = {
  Link: {
    async tags(...args) {
      const results = await resolver(Link.Tags)(...args);
      return results;
    },
  },
  Query: {
    async link(obj, args, context, info) {
      const { uuid } = args;
      const { currentUser } = context;

      if (!currentUser) {
        throw new Error('You must be logged in');
      }
      return resolver(Link, {
        before: (options) => {
          // eslint-disable-next-line
          options.where = options.where || {};
          options.where.uuid = uuid;
          options.where.userUuid = currentUser.uuid;
          return options;
        },
      })(obj, args, context, info);
    },
    async links(obj, args, context, info) {
      // for any user, remove non public fields
      let { limit = 25 } = args;
      if (limit > 100) {
        limit = 100;
      }
      const { currentUser } = context;
      if (!currentUser) {
        throw new Error('You must be logged in!');
      }
      const result = await resolver(Link, {
        before: (options) => {
          // (options, args)
          options.limit = limit;
          options.where = options.where || {};
          options.where.userUuid = currentUser.uuid;
          options.order = [['createdAt', 'DESC']];
          return options;
        },
      })(obj, args, context, info);
      return result;
    },
  },
  Mutation: {
    async deleteLink(_, args, context) {
      const { uuid } = args;
      const { currentUser } = context;
      if (!currentUser) {
        throw new Error('You must be logged in to delete Links!');
      }
      if (!validator.isUUID(uuid)) {
        throw new Error(`You must provide a valid link uuid: ${uuid}`);
      }

      const link = await Link.findById(uuid);
      if (link === null) {
        throw new Error('Ooops we can not find your link');
      }
      const linkObject = link.get({ plain: true });
      if (linkObject.userUuid !== currentUser.uuid) {
        throw new Error('You are not the owner of this link!');
      }
      link.destroy();
      ItemTag.destroy({ where: { taggable_id: uuid } });
      return { success: true };
    },
    async editLink(_, args, context) {
      const {
        uuid, tags = null, title = null, author = null, excerpt = null,
      } = args;
      const { currentUser } = context;
      if (!currentUser) {
        throw new Error('You must be logged in to edit Links!');
      }
      if (!validator.isUUID(uuid)) {
        throw new Error(`You must provide a valid link uuid: ${uuid}`);
      }

      const link = await Link.findById(uuid);
      const linkObject = link.get({ plain: true });
      if (linkObject.userUuid !== currentUser.uuid) {
        throw new Error('You are not the owner of this link!');
      }
      if (tags) {
        const newTags = [];
        await Promise.all(tags.map((tag) => {
          return Tag.findOrCreate({
            title: tag.title,
            where: { title: tag.title },
          }).spread(async (i, created) => {
            newTags.push(i);
          });
        }));
        link.setTags(newTags, { through: { user_Uuid: currentUser.uuid } });
      }
      const updates = {};
      if (title) {
        updates.title = title;
      }
      if (author) {
        updates.author = author;
      }
      if (excerpt) {
        updates.excerpt = excerpt;
      }
      const updatedLink = await link.update({ ...updates });
      return updatedLink;
    },
    async addLink(_, args, context) {
      const { currentUser } = context;
      const { url } = args;
      const options = {
        protocols: ['http', 'https'],
        require_protocol: true,
      };
      if (!currentUser) {
        throw new Error('You must be logged in to save Links!');
      }
      if (!currentUser.emailVerified) {
        throw new Error('Verify Email Address first');
      }
      if (!validator.isURL(url, options)) {
        throw new Error(`You must provide a valid url: ${url}`);
      }
      const queryResult = await Link.findOne({
        where: {
          url,
          userUuid: currentUser.uuid,
        },
      });
      if (queryResult) {
        throw new Error(`You have already saved this url: ${url}`);
      }
      const link = await Link.create({
        ...args,
        userUuid: currentUser.uuid,
      });
      if (args.tags) {
        await Promise.all(args.tags.map((tag) => {
          return Tag.findOrCreate({
            title: tag.title,
            where: { title: tag.title },
          }).spread(async (i, created) => {
            await i.addLink(link, { through: { user_Uuid: currentUser.uuid } });
          });
        }));
      }
      const linkObject = link.get({ plain: true });
      const data = {
        url: linkObject.url,
        userUuid: linkObject.userUuid,
        uuid: linkObject.uuid,
      };
      const apiUrl = process.env.CRAWLER_API_URL || 'http://crawler:3001/crawlData';
      const res = await fetch(apiUrl, {
        headers: {
          'x-api-key': process.env.CRAWLER_API_KEY,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
      return link;
    },
  },
};

export default resolvers;
