import React, { useEffect, useState } from 'react';
import { MktRoute } from 'components/basics/routes';
import { Button } from 'components/basics/buttons';
import { Container, Row, Col } from 'components/basics/grids';
import { SectionBlock, SectionHeader, SectionBody, SectionFooter } from 'components/basics/sections';
import { FarIcon } from 'components/vendors/fa-wrapper';

const UsersDetailRoute = (props) => {
	const { userId, session, store, toast, history } = props;
	const [ user, setUser ] = useState({});
	const [ loading, setLoading ] = useState(false);


	// Hooks
	useEffect(() => {
		fetchData();
	}, [])


	// Methods
	const fetchData = async () => {
		try {
			setLoading(true);
			let user = await store.findRecord('user', userId);
			setUser(user);
		} catch (e) {
			toast.showError(e);
		} finally {
			setLoading(false);
		}
	}

	const logout = async () => {
		await session.logout();
		history.push('/');
	}


	// Render
	return (
		<MktRoute title={`Library - User #${userId}`}>
			<Container className='sm pt-3 pb-3'>

				<SectionBlock>
					<SectionHeader title={`Welcome, ${user.name}`} />
					<SectionBody className='xs'>
						<p>This is your user profile. There isn't much here but you can logout using the button below.</p>
					</SectionBody>
					<SectionFooter>
						<Button size='lg' onClick={() => logout()} className='btn-primary btn-block'>
							Logout<FarIcon icon='chevron-right' className='ml-2'/>
						</Button>
					</SectionFooter>
				</SectionBlock>

			</Container>
		</MktRoute>
	);
}

export default UsersDetailRoute;
