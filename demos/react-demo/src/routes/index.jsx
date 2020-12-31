import React, { useEffect, useState } from 'react';
import { MktRoute } from 'components/basics/routes';
import { LinkBtn } from 'components/basics/links';
import { Container, Row, Col } from 'components/basics/grids';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { FarIcon } from 'components/vendors/fa-wrapper';

const IndexRoute = (props) => {
	const { session, store, toast, history } = props;


	// Render
	return (
		<MktRoute title='Library - Welcome'>
			<Container className='sm pt-3 pb-3'>

				<SectionBlock>
					<SectionHeader title='React Session Demo' />
					<SectionBody className='xs'>
						<p>This is a demo application for React session. The application shows how to authenticate a user, manage their session, and eventually log them out.</p>
						<p>To get started, please do the following:</p>
						<ul>
							<li>Login or register for an account</li>
							<li>Play with the book store application</li>
							<li>Log out of your account when finished</li>
							<li>Review the code to see how we're doing these things.</li>
						</ul>
						<p>The data served by this application is destroyed / refreshed every 24 hours so don't worry about deleting your account or any changes.</p>
					</SectionBody>
					<SectionFooter>
						<LinkBtn to='/login' className='btn-primary btn-block btn-lg'>
							Get Started <FarIcon icon='chevron-right' className='ml-2'/>
						</LinkBtn>
					</SectionFooter>
				</SectionBlock>

			</Container>
		</MktRoute>
	);
}

export default IndexRoute;
