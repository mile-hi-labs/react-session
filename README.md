## Overview
React Session is a session management library for React web applications. The library is built on local-storage and designed to work with [React Data](https://github.com/mile-hi-labs/react-data).


## How it Works
React Session uses the [Context Hook](https://reactjs.org/docs/context.html) api to provide a global session where you can authenticate and persist the current user across multiple browser windows or sessions. Once authenticated, React-Session will also automatically add a JWT token to all API requests sent using React Data. To learn more about React Session, visit the [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-session/).


## Quick Start


### Install
`npm install @mile-hi-labs/react-session`


### Session Provider
Add the following to your `app.jsx` file or near the top of your application.

```
// app.jsx

import React from 'react';
import { storeProvider } from '@mile-hi-labs/react-data';
import { sessionProvider } from '@mile-hi-labs/react-session';
import * as Adapters from 'adapters';
import * as Serializers from 'serializers';
import * as Models from 'models';
import Router from 'router';


const App = (props) => {

  return (
    <StoreProvider adapters={Adapters} serializers={Serializers} models={Models} apiDomain={apiDomain}>
      <StoreContext.Consumer>
        {store => (
          <SessionProvider modelName='user' store={store}>
            <Router />
          </SessionProvider>
        )}
      </StoreContext.Consumer>
    </StoreProvider>
  )
}

export default App;
```

### Session Consumer
Then, you can access the session from any component like so:

```
// components/bootstrap/navbar-wrapper.jsx

import React, { useEffect } from 'react';
import { withSession } from '@mile-hi-labs/react-session';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBarWrapper = (props) => {
  const { session } = props;

  return (
      <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
      <Navbar.Brand href='/' className='mr-15'>Company Name</Navbar.Brand>
      <Nav className='ml-auto'>
        {session.isAuthenticated() ? (
          <Nav.Link className='nav-user'>
            <img src={session.user.photo} className='mr-15'/>
            <h6>{session.user.name}</h6>
          </Nav.Link>
        ) : (
          <Fragment>
            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
            <Nav.Link as={Link} to='/register'>Register</Nav.Link>
          </Fragment>
        )}
      </Nav>
    </Navbar>
  )
}

export default withSession(NavBarWrapper);
```

### Session Authentication
Then, login or register your user and pass the user's credentials to the session like so:

```
// components/auth/login-form.jsx

import React, { useState } from 'react';
import { withSession } from '@mile-hi-labs/react-session';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';

const LOGIN_URL = 'http://localhost:8080/auth/login';

const LoginForm = (props) => {
  const { session, nextAction } = props;
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ taskRunning, setTaskRunning ] = useState(false);


  // Methods
  const login = async () => {
    try {
      setTaskRunning(true);
      let model = await Axios.post(LOGIN_URL, {email: email, password: password});
      await session.authenticate('admin', model);
      console.log('Login Succeeded!');
      nextAction();
    } catch(e) {
      console.log(e);
    } finally {
      setTaskRunning(false);
    }
  }


  // Render
  return (
    <Form onSubmit={e => e.preventDefault()}>
      <Form.Group controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type='email'
          placeholder='redford@hollywood.com'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='email'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='••••••••'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <BasicButton
          title='Login'
          icon='chevron-right'
          taskRunning={taskRunning}
          onClick={() => login()}
        />
      </Form.Group>
    </Form>
  )
}

export default withSession(LoginForm);
```


## Demo
This project comes with a built-in React demo.


## Development
This projects uses Webpack to build the project. Please see `package.json` for available scripts.
- Clone this repository
- Run `npm link` from this project
- Open up the desired project / demo and run `npm link @mile-hi-labs/react-session`
- Run `npm run build` to push code from this project to the consuming project
- You should be able to debug via your browser like normal.


## Links
- [Github](https://github.com/mile-hi-labs/react-session)
- [API Documentation](https://app.gitbook.com/@mile-hi-labs/s/react-session/)
- [Mile Hi Labs](https://milehilabs.io)


