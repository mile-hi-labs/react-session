import React, { useEffect, useState } from 'react';
import LoginForm from 'components/auth/login-form';
import { MktRoute } from 'components/basics/routes';
import { Container, Row, Col } from 'components/basics/grids';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';

const LoginRoute = (props) => {
	const { session, store, toast, history } = props;


	// Render
	return (
		<MktRoute title='Library - Login'>
			<Container className='sm pt-3 pb-3'>

				<SectionBlock>
					<LoginForm nextAction={user => history.push(`/users/${user.id}`)} />
				</SectionBlock>

			</Container>
		</MktRoute>
	);
}

export default LoginRoute;
