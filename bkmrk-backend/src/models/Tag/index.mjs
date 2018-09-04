import Sequelize from 'sequelize';
import { sql } from '../../db';

const Tag = sql.define('tag', {
  title: {
    type: Sequelize.STRING,
    unique: true,
  },
  slug: {
    type: Sequelize.STRING,
    unique: true,
  },
});

const ItemTag = sql.define('item_tag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tag_id: {
    type: Sequelize.INTEGER,
    unique: 'item_tag_taggable',
  },
  taggable_id: {
    type: Sequelize.UUID,
    unique: 'item_tag_taggable',
    references: null,
  },
  user_Uuid: {
    type: Sequelize.UUID,
  },
});

export { ItemTag };
export default Tag;
