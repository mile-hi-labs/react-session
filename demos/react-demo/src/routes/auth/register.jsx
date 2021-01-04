import React, { useEffect, useState } from 'react';
import RegisterForm from 'components/auth/register-form';
import { MktRoute } from 'components/basics/routes';
import { Container, Row, Col } from 'components/basics/grids';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';

const RegisterRoute = (props) => {
	const { session, store, toast, history } = props;


	// Render
	return (
		<MktRoute title='Library - Register'>
			<Container className='sm pt-3 pb-3'>

				<SectionBlock>
					<RegisterForm nextAction={user => history.push(`/users/${user.id}`)} />
				</SectionBlock>

			</Container>
		</MktRoute>
	);
}

export default RegisterRoute;
