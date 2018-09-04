import Sequelize from 'sequelize';
import uuid from 'uuid/v4';
import { sql } from '../../db';
import Link from '../Link';

const User = sql.define('user', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: () => uuid(),
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  emailVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  resetPasswordToken: {
    type: Sequelize.STRING,
  },
  resetPasswordExpires: {
    type: Sequelize.DATE,
  },
});

User.Link = User.hasMany(Link);
Link.User = Link.belongsTo(User);

export default User;
