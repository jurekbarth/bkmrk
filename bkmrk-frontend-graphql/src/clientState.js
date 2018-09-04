import Auth from './components/Auth';

export const defaults = {
  isAuthenticated: Auth.isAuthenticated(),
};

export const resolvers = {
  Mutation: {
    auth: (_, args, { cache }) => {
      const { isAuthenticated } = args;
      cache.writeData({ data: { isAuthenticated } });
      return null;
    },
  },
};
