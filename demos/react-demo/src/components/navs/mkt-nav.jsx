import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withSession } from '@mile-hi-labs/react-session';
import { Button, ButtonText } from 'components/basics/buttons';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownLink } from 'components/basics/dropdowns';
import { Link } from 'components/basics/links';
import { Navbar, NavbarBrand, NavbarToggle, Nav } from 'components/basics/navs';
import { LibLogo } from 'utils/assets/branding';

const MktNav = (props) => {
	const { session, history } = props;
	const [ dropdown, setDropdown ] = useState(false);


	// Methods
	const logout = async () => {
		await session.logout();
		history.push('/');
	}


	// Render
	return (
		<Navbar className='mkt flex-between'>
			<NavbarBrand to='/' img={<img src={LibLogo}/>} className='mr-15' />
			<Nav className='flex-end'>
				{session.authenticated() ? (
					<Dropdown open={dropdown}>
						<DropdownToggle onClick={() => setDropdown(!dropdown)}>{session.user.name}</DropdownToggle>
						<DropdownMenu>
							<DropdownLink to={`/users/${session.user.id}`}>View Profile</DropdownLink>
							<DropdownItem onClick={() => session.logout()}>Logout</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					) : (
					<Fragment>
						<Link to='/login' className='mr-15'>Login</Link>
						<Link to='/register'>Register</Link>
					</Fragment>
				)}
			</Nav>
		</Navbar>
	)
}

export default withRouter(withSession(MktNav));
