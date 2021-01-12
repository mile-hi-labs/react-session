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

const REGISTER_URL = 'https://library-api.milehilabs.dev/auth/register';

const RegisterForm = (props) => {
  const { session, store, toast, nextAction } = props;
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ taskRunning, setTaskRunning ] = useState(false);


  // Hooks
  useEffect(() => {
    return () => setTaskRunning(false);
  }, [])


  // Methods
  const SubmitAuth = async () => {
    try {
      setTaskRunning(true);
      let data = store.serializerFor('app').serialize({ name: name, email: email, password: password });
      let response = await Axios.post(REGISTER_URL, data);
      let user = store.serializerFor('app').normalize(response.data.data);
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
      <SectionHeader title='Register' subtitle='Please register to continue'/>
      <SectionBody size='sm'>
        <FormGroup label='Name'>
          <FormControl
            type='text'
            placeholder='Robert Redford'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup label='Email'>
          <FormControl
            type='text'
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
            onClick={() => SubmitAuth()}
            className='btn-block'>
            Register<FarIcon icon='chevron-right' className='ml-2'/>
          </Button>
        </FormGroup>
        <FormGroup className='text-center'>
          <h6>Already have an account? <Link to='/login'>Login</Link></h6>
        </FormGroup>
      </SectionBody>
    </Form>
  )
}

export default withSession(withStore(withToast(RegisterForm)));

