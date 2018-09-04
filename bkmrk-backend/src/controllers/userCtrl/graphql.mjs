import graphqlSequelize from 'graphql-sequelize';
import bcrypt from 'bcrypt';
import validator from 'validator';
import crypto from 'crypto';

import User from '../../models/User';

import sendEmailVerification from '../../handlers/mail/verificationMail';
import sendEmailPasswordReset from '../../handlers/mail/passwordResetMail';

import { issueJwt } from '../authCtrl';

const { resolver } = graphqlSequelize;

const resolvers = {
  User: {
    async links(obj, args, context, info) {
      return resolver(User.Link, {
        before: (options) => {
          options.where = options.where || {};
          // check if user is current logged in user
          if (
            (context.currentUser && context.currentUser.uuid !== obj.uuid) ||
            context.currentUser === undefined
          ) {
            options.where.public = true;
          }
          return options;
        },
      })(obj, args, context, info);
    },
  },
  Query: {
    user(obj, args, context, info) {
      const { currentUser } = context;
      if (!currentUser) {
        throw new Error('You must be logged in');
      }
      const { uuid } = currentUser;
      return resolver(User, {
        before: (options) => {
          options.attributes = ['uuid', 'firstName', 'lastName', 'email', 'emailVerified'];
          options.where = options.where || {};
          options.where.uuid = uuid;
          return options;
        },
      })(obj, args, context, info);
    },
  },
  Mutation: {
    async login(_, args, context) {
      const { username, password } = args;
      const { currentUser } = context;
      if (currentUser) {
        throw new Error('You are already logged in. Log out first');
      }
      if (!validator.isEmail(username)) {
        throw new Error('Your username should be your mail');
      }
      if (password.length < 8) {
        throw new Error('Your password is too short');
      }
      const userRef = await User.find({ where: { email: username } });
      if (!userRef) {
        throw new Error('Unknown username');
      }

      const user = userRef.get({ plain: true });
      const same = await bcrypt.compare(password, user.password);
      if (!same) {
        throw new Error('Wrong password');
      }
      const token = issueJwt(user.uuid);
      return { token };
    },
    async registerUser(_, {
      firstName, lastName, email, password,
    }) {
      if (!validator.isEmail(email)) {
        throw new Error(`Provided email is not a valid mail ${email}`);
      }
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error(`There's already a user registered with email ${email}`);
      }
      if (password.length < 8) {
        throw new Error('You must provide a valid password with at least 8 characters!');
      }
      const saltRounds = process.env.SALT_ROUNDS || 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const resetPasswordToken = crypto.randomBytes(20).toString('hex');
      const currentDate = new Date();
      // Add 7 days ;)
      const resetPasswordExpires = new Date(currentDate.getTime() + 604800000);
      const newUserRef = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
        resetPasswordToken,
        resetPasswordExpires,
      });
      const newUser = newUserRef.get({ plain: true });
      sendEmailVerification(email, resetPasswordToken);
      // TODO auto sign in
      const token = issueJwt(newUser.uuid);
      return { token };
    },
    async editUser(_, args, context) {
      const {
        firstName = null, lastName = null, password = null, newPassword = null,
      } = args;
      const { currentUser } = context;
      if (!currentUser) {
        throw new Error('You must be logged in!');
      }
      // find user
      const userObject = await User.findById(currentUser.uuid);

      // if user was deleted or some miracle happend
      if (!userObject) {
        throw new Error('User does not exist!');
      }
      // get plain user object
      const user = userObject.get({ plain: true });

      // check for the updates
      const updates = {};
      if (firstName) {
        updates.firstName = firstName;
      }
      if (lastName) {
        updates.lastName = lastName;
      }

      // update password
      if (newPassword) {
        // if a new password was provided, there must be also the old password
        if (!password) {
          throw new Error('You must provide your old password in order to set a new one');
        }
        // check if the old password still matches
        const same = await bcrypt.compare(password, user.password);
        if (!same) {
          throw new Error('Wrong password');
        }
        // salt & hash new password
        const saltRounds = process.env.SALT_ROUNDS || 10;
        const hash = await bcrypt.hash(newPassword, saltRounds);
        updates.password = hash;
      }
      const updatedUser = await userObject.update({ ...updates });
      const updatedUserObject = updatedUser.get({ plain: true });
      // only return the not exclusive fields
      return {
        uuid: updatedUserObject.uuid,
        firstName: updatedUserObject.firstName,
        lastName: updatedUserObject.lastName,
        email: updatedUserObject.email,
      };
    },
    async validateUserEmail(_, args) {
      const { token } = args;
      if (!token) {
        throw new Error('You must provide a valid token!');
      }
      const currentDate = new Date();
      const user = await User.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: {
            $gt: currentDate,
          },
        },
      });
      if (!user) {
        return {
          success: false,
        };
      }
      await user.update({
        emailVerified: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      });
      return {
        success: true,
      };
    },
    async requestUserResetPassword(_, args) {
      const { email } = args;
      if (!email) {
        throw new Error('You must provide a valid email!');
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('No user found');
      }
      const resetPasswordToken = crypto.randomBytes(20).toString('hex');
      const currentDate = new Date();
      // Add 24 hours ;)
      const resetPasswordExpires = new Date(currentDate.getTime() + 86400000);
      await user.update({
        resetPasswordToken,
        resetPasswordExpires,
      });
      sendEmailPasswordReset(email, resetPasswordToken);
      return {
        success: true,
      };
    },
    async resetUserPassword(_, args) {
      const { email, password, token } = args;
      if (!email) {
        throw new Error('You must provide a valid email!');
      }
      if (!password || password.length < 8) {
        throw new Error('You must provide a valid password with at least 8 characters!');
      }
      if (!token) {
        throw new Error('You must provide a valid token!');
      }
      const currentDate = new Date();
      const user = await User.findOne({
        where: {
          email,
          resetPasswordToken: token,
          resetPasswordExpires: {
            $gt: currentDate,
          },
        },
      });
      if (!user) {
        throw new Error('Something went wrong please try again');
      }
      const saltRounds = process.env.SALT_ROUNDS || 10;
      const hash = await bcrypt.hash(password, saltRounds);
      await user.update({
        password: hash,
        resetPasswordToken: null,
        resetPasswordExpires: null,
        emailVerified: true,
      });
      return {
        success: true,
      };
    },
  },
};

export default resolvers;
