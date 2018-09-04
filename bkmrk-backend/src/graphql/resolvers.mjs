import lodash from 'lodash';
import userResolvers from '../controllers/userCtrl/graphql';
import linkResolvers from '../controllers/linkCtrl/graphql';
import tagResolvers from '../controllers/tagCtrl/graphql';

const { merge } = lodash;

const rootResolvers = {};

const resolveFunctions = merge(rootResolvers, userResolvers, linkResolvers, tagResolvers);

export default resolveFunctions;
