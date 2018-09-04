import express from 'express';
import apolloServerExpress from 'apollo-server-express';
import Sequelize from 'sequelize';
import chalk from 'chalk';

import { sql } from './db';

import schema from './graphql/schema';

import { isLoggedIn } from './controllers/authCtrl';

import Tag, { ItemTag } from './models/Tag';
import Link from './models/Link';

const { graphqlExpress } = apolloServerExpress;

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hallo welt');
});

router.use(
  '/graphql',
  graphqlExpress((req) => {
    return {
      schema,
      context: {
        currentUser: req.user,
      },
    };
  }),
);

// ######## User Routes ##########
router.get('/me', async (req, res) => {
  res.json({ data: 'todo' });
});
router.post('/me', async (req, res) => {
  const data = req.body;
  res.json({ data });
});

// ######## Tag Routes ##########
router.get('/tag', async (req, res) => {
  console.log(chalk.redBright('####################### start ######################'));
  try {
    const a = await Tag.findAll({
      order: [[Link, 'createdAt', 'DESC']],
      limit: 10,
      where: {
        user_Uuid: 'B53AAA8F-D0E5-4818-B553-6E1FB30FD795',
      },
      include: [
        {
          model: Link,
        },
      ],
    });
    res.json(a);
  } catch (error) {
    res.send(error);
  }
  // SELECT "tag_id", count("tag_id") AS "popularity" FROM "item_tags" GROUP BY "tag_id" ORDER BY "popularity" DESC;
  // SELECT item_tags.tag_id, tags.title, COUNT(item_tags.tag_id) AS "popularity" FROM item_tags LEFT OUTER JOIN tags ON item_tags.tag_id = tags.id GROUP BY item_tags.tag_id, tags.title ORDER BY "popularity" DESC;
  // try {
  //   const a = await sql.query(
  //     'SELECT item_tags.tag_id AS "id", tags.title, COUNT(item_tags.tag_id) AS "count" FROM item_tags LEFT OUTER JOIN tags ON item_tags.tag_id = tags.id GROUP BY item_tags.tag_id, tags.title ORDER BY "count" DESC',
  //     { type: Sequelize.QueryTypes.SELECT },
  //   );
  //   console.log(a);
  //   res.json(a);
  // } catch (error) {
  //   console.log('here', error);
  //   res.send(error);
  // }
  console.log(chalk.blueBright('####################### start ######################'));
});
router.get('/tag/:id', async (req, res) => {
  res.json({ data: 'tag with id' });
});

// ######## Link Routes ##########
router.get('/link', async (req, res) => {
  res.json({ data: 'links' });
});
router.get('/link/:args', async (req, res) => {
  // args --> uuid / url
  res.json({ data: 'links' });
});
router.patch('/link/:uuid', async (req, res) => {
  // args --> uuid / url
  res.json({ data: 'links' });
});
router.delete('/link/:uuid', async (req, res) => {
  res.json({ data: 'links' });
});
router.post('/link', async (req, res) => {
  const data = req.body;
  res.json({ data });
});

// ######## Account Routes ##########
router.post('/login', async (req, res) => {
  const data = req.body;
  res.json({ data });
});
router.post('/register', async (req, res) => {
  const data = req.body;
  res.json({ data });
});
router.post('/verifyEmail', async (req, res) => {
  const data = req.body;
  res.json({ data });
});
router.post('/resetPassword', async (req, res) => {
  const data = req.body;
  res.json({ data });
});

router.get('/jwt', (req, res) => {
  console.log('###################################');
  console.log(req.user);
  res.json(req.user);
});

export default router;
