import App from './app/AppPage.react';
import Auth from './auth/AuthPage.react';
import Fields from './fields/FieldsPage.react';
import Firebase from './firebase/FirebasePage.react';
import Home from './home/HomePage.react';
import Intl from './intl/IntlPage.react';
import Me from './me/MePage.react';
import NotFound from './notfound/NotFoundPage.react';
import Profile from './me/ProfilePage.react';
import React from 'react';
import Todos from './todos/TodosPage.react';
import { IndexRoute, Route } from 'react-router';

import SiteList from './sites/SiteList.react';
import AddSite from './sites/AddSite.react';
import Settings from './settings/Settings.react';

export default function createRoutes(getState) {
  const requireAuth = (nextState, replace) => {
    const loggedInUser = getState().users.viewer;
    if (!loggedInUser) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  };

  return (
    <Route component={App} path="/">
      <IndexRoute component={SiteList} />
      <Route component={Intl} path="intl" />
      <Route component={Fields} path="fields" />
      <Route component={AddSite} path="add" />
      <Route component={Settings} path="settings" />
      <Route component={NotFound} path="*" />
    </Route>
  );
}
