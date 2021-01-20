import React, { useEffect, useState } from 'react';
import { withStore, JsonApiError } from '@mile-hi-labs/react-data';
import { withSession } from '@mile-hi-labs/react-session';
import { withToast } from 'contexts/toast-context';
import Axios from 'axios';
import { Button, ButtonText } from 'components/basics/buttons';
import { Form, FormGroup, FormControl, FormText } from 'components/basics/forms';
import { Container, Row, Col } from 'components/basics/grids';
import { Link } from 'components/basics/links';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { FarIcon } from 'components/vendors/fa-wrapper';
import { isEmpty, logger } from 'utils/helpers';

const LOGIN_URL = 'https://library-api.milehilabs.dev/auth/login';

const LoginForm = (props) => {
  const { session, store, toast, nextAction } = props;
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ taskRunning, setTaskRunning ] = useState(false);


  // Hooks
  useEffect(() => {
    return () => setTaskRunning(false);
  }, [])


  // Methods
  const submitAuth = async () => {
    try {
      setTaskRunning(true);
      let data = store.serializerFor('app').serialize({ email: email, password: password });
      let response = await Axios.post(LOGIN_URL, data);
      let user = store.serializerFor('app').normalize(response.data);
      await session.authenticate('user', user);
      toast.showSuccess('User authenticated!');
      nextAction(user);
    } catch(e) {
      let formattedError = JsonApiError.format(e);
      toast.showError(formattedError);
    } finally {
      setTaskRunning(false);
    }
  }


  // Render
  return (
    <Form onSubmit={e => e.preventDefault()}>
      <SectionHeader title='Login' subtitle='Please login to continue'/>
      <SectionBody size='sm'>
        <FormGroup label='Email'>
          <FormControl
            type='email'
            placeholder='robert@hollywood.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup label='Password'>
          <FormControl
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup className='pt-2'>
          <Button
            type='submit'
            size='lg'
            variant='primary'
            taskRunning={taskRunning}
            onClick={() => submitAuth()}
            className='btn-block'>
            Login<FarIcon icon='chevron-right' className='ml-2'/>
          </Button>
        </FormGroup>
        <FormGroup className='text-center'>
          <h6>Dont have an account? <Link to='register'> Register</Link></h6>
        </FormGroup>
      </SectionBody>
    </Form>
  )
}

export default withSession(withStore(withToast(LoginForm)));

