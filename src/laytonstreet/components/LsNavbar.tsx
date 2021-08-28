import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { login, logout } from 'laytonstreet/api/LaytonStreetApi';
import { UserContext } from 'laytonstreet/contexts/UserContext';
import { UserInfo } from 'laytonstreet/types/LaytonStreetTypes';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, DropdownItem, Nav, NavbarToggler, NavItem } from 'reactstrap';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import Icon from './Icon';

export interface Props {
  activeItem?: string
  onLogin: (userInfo: UserInfo) => void
  onLogout: () => void
}

export default function LsNavbar({ activeItem, onLogin, onLogout }: Props) {
  const [isOpen, setOpen] = React.useState(false);
  const toggle = () => setOpen(!isOpen);

  return (
    <Navbar className="navbar-expand-lg navbar-light bg-light">
      <NavbarBrand href="/"><Icon icon="layton-street"/>Layton Street</NavbarBrand>
      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
        <Links activeItem={activeItem}>
          <NavItem>
            <NavLink to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/news" className="nav-link" activeClassName="active">
              News
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/faqs" className="nav-link" activeClassName="active">
              FAQs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about-us" className="nav-link" activeClassName="active">
              About us
            </NavLink>
          </NavItem>
          {/* <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Members
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                Option 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </Links>
        {isOpen ? <DropdownItem divider /> : null}
        <UserArea onLogin={onLogin} onLogout={onLogout} />
      </Collapse>
    </Navbar>
  );
}

function Links(props: any) {
  return (
    <Nav className="mr-auto" navbar>
      {props.children}
    </Nav>
  );
}

interface UserAreaProps {
  showUserFullName?: boolean;
  onLogin: (userInfo: UserInfo) => void
  onLogout: () => void
}

function UserArea({ showUserFullName, onLogin, onLogout }: UserAreaProps) {
  const userInfo = React.useContext(UserContext);
  const loggedIn: boolean = userInfo != undefined;
  return <>
    <Nav className="ml-auto" navbar>
      {loggedIn &&
        <NavItem>
          <span className="navbar-text">
            {`Signed in as ${userInfo?.displayName}`}&nbsp;<Icon icon="user" />&nbsp; 
          </span>
        </NavItem>
      }
      <NavItem>
        {loggedIn ? <LogoutButton onLogout={onLogout} /> : <LoginButton onLogin={onLogin} />}
      </NavItem>
    </Nav>
    {/* {loggedIn ? null : <CreateAccountButton />} */}
  </>;
}

function LogoutButton({ onLogout }: { onLogout: () => void }) {
  const onClick = async () => {
    await logout();
    onLogout();
  }
  return (
    <NavLink to="/logout" className="nav-link" onClick={onClick}>
      Sign out <FontAwesomeIcon icon="sign-out-alt" />
    </NavLink>
  );
}

function LoginButton({ onLogin }: { onLogin: (userInfo: UserInfo) => void }) {
  const onClick = async () => {
    const { redirectUri, userInfo } = await login();
    if (redirectUri) {
      window.location.href = redirectUri;
    }
    if (userInfo) {
      onLogin(userInfo);
    }
  }
  return (
    <NavLink to="#" className="nav-link" onClick={onClick}>
      Sign in <FontAwesomeIcon icon="sign-in-alt" />
    </NavLink>
  );
}

// function CreateAccountButton() {
//   const clicked = function(): void { window.location.href = "/create-account" };
//   return <Button className="ml-md-3" onClick={clicked}>Sign up</Button>
// }