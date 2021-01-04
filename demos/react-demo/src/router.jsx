import React, { Fragment, useEffect } from 'react';
import { Switch, Route, Redirect, useParams, useRouteMatch } from 'react-router-dom';
import { withSession } from '@mile-hi-labs/react-session';
import { withStore } from '@mile-hi-labs/react-data';
import { withToast } from 'contexts/toast-context';

// Routes
import IndexRoute from 'routes/index';

import LoginRoute from 'routes/auth/login';
import RegisterRoute from 'routes/auth/register';
import UsersDetailRoute from 'routes/users/detail';

// Utils
import ErrorBoundary from 'utils/error-boundary';


const Router = (props) => {
  const { session, store, toast } = props;
  const passedProps = { session: session, store: store, toast: toast }

  // Render
  return (
  	<ErrorBoundary>
	    <Switch>
	      <Route exact path='/' render={routeProps => <IndexRoute {...passedProps} {...routeProps}/>} />
        <Route exact path='/login' render={routeProps => <LoginRoute {...passedProps} {...routeProps}/>} />
        <Route exact path='/register' render={routeProps => <RegisterRoute {...passedProps} {...routeProps}/>} />
        {session.authenticated() ? (
          <Route path='/users/:userId'>
            <UsersDetail {...passedProps} />
          </Route>
        ) : (
          <Redirect to='/login'/>
        )}

        <Route path='/*'>
          <Redirect to='/'/>
        </Route>
	    </Switch>
    </ErrorBoundary>
  );
}

const UsersDetail = (props) => {
  const { path } = useRouteMatch();
  const { userId } = useParams();

  return (
    <Switch>
      <Route exact path={path} render={routeProps => <UsersDetailRoute userId={userId} {...props} {...routeProps} />} />
    </Switch>
  )
}

export default withSession(withStore(withToast(Router)));
