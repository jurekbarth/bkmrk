import Sequelize from 'sequelize';
import uuid from 'uuid/v4';
import { sql } from '../../db';
import Tag, { ItemTag } from '../Tag';

const Link = sql.define('link', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: () => uuid(),
  },
  title: {
    type: Sequelize.TEXT,
  },
  url: {
    type: Sequelize.TEXT,
    optional: false,
  },
  crawl: {
    type: Sequelize.BOOLEAN,
    defaultValue: () => true,
  },
  image: {
    type: Sequelize.STRING,
  },
  leadimage: {
    type: Sequelize.TEXT,
  },
  author: {
    type: Sequelize.STRING,
  },
  excerpt: {
    type: Sequelize.TEXT,
  },
  content: {
    type: Sequelize.TEXT,
  },
  public: {
    type: Sequelize.BOOLEAN,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: () => new Date(),
  },
});

Tag.Links = Tag.belongsToMany(Link, {
  through: {
    model: ItemTag,
    unique: false,
  },
  foreignKey: 'tag_id',
  constraints: false,
});

Link.Tags = Link.belongsToMany(Tag, {
  through: {
    model: ItemTag,
    unique: false,
  },
  foreignKey: 'taggable_id',
  constraints: false,
});

export default Link;
