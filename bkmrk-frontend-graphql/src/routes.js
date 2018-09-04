import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// Skeletons
import AuthSkeleton from './components/AuthSkeleton';
import Skeleton from './components/Skeleton';

// Static Components
import Home from './components/Home';
import NotFound from './components/NotFound';
import LegalNotice from './components/LegalNotice';
import Privacy from './components/Privacy';
import Contact from './components/Contact';
import SignUpSuccess from './components/SignUpSuccess';

// Authentication
import AuthAdapter from './connectors/AuthAdapter/graphql';

// User Accounts
import VerifyEmail from './connectors/VerifyEmail/graphql';
import Settings from './connectors/Settings/graphql';
import SignUp from './connectors/SignUp/graphql';
import Logout from './connectors/Logout/graphql';
import Login from './connectors/Login/graphql';

import ResetPasswordRequest from './connectors/ResetPasswordRequest/graphql';
import ResetPasswordRequestSuccess from './components/ResetPasswordRequestSuccess';
import ResetPassword from './connectors/ResetPassword/graphql';

// Auth Routes
import Dashboard from './connectors/Dashboard/graphql';
import BookmarkDetail from './connectors/BookmarkDetail/graphql';
import BookmarkEdit from './connectors/BookmarkEdit/graphql';
import Tag from './connectors/Tag/graphql';
import AddLink from './connectors/AddLink/graphql';

const both = [
  <Route key="routeId0" path="/signup/success" component={SignUpSuccess} />,
  <Route key="routeId1" path="/verify/:token" component={VerifyEmail} />,
  <Route key="routeId2" exact path="/contact" component={Contact} />,
  <Route key="routeId3" exact path="/privacy" component={Privacy} />,
  <Route key="routeId4" exact path="/imprint" component={LegalNotice} />,
  <Route key="routeId6" exact path="/logout" component={Logout} />,
  <Route key="routeId5" component={NotFound} />,
];

const Router = (props) => {
  const { isAuthenticated } = props;
  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <AuthSkeleton>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/link/new" component={AddLink} />
            <Route exact path="/link/:uuid" component={BookmarkDetail} />
            <Route exact path="/link/:uuid/edit" component={BookmarkEdit} />
            <Route exact path="/tag/:id" component={Tag} />
            <Route exact path="/settings" component={Settings} />
            {both}
          </Switch>
        </AuthSkeleton>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Skeleton>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/resetPassword" component={ResetPasswordRequest} />
          <Route exact path="/resetPassword/success" component={ResetPasswordRequestSuccess} />
          <Route exact path="/resetPassword/:token" component={ResetPassword} />
          {both}
        </Switch>
      </Skeleton>
    </BrowserRouter>
  );
};

Router.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const routes = () => {
  return (
    <AuthAdapter>
      <Router />
    </AuthAdapter>
  );
};
export default routes;
