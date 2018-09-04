import Sequelize from "sequelize";

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

// eslint-disable-next-line
export const sql = new Sequelize("postgres", user, password, {
  host: process.env.POSTGRES_HOST || "postgres",
  port: process.env.POSTGRES_PORT || 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

export const Link = sql.define("link", {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: () => uuid()
  },
  title: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING,
    optional: false
  },
  crawl: {
    type: Sequelize.BOOLEAN,
    defaultValue: () => false
  },
  image: {
    type: Sequelize.STRING
  },
  leadimage: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  excerpt: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  },
  public: {
    type: Sequelize.BOOLEAN
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: () => new Date()
  }
});
