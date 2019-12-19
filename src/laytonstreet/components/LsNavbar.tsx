import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, DropdownItem, Nav, NavbarToggler, NavItem } from 'reactstrap';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';

export interface Props {
  activeItem?: string
}

export default function LsNavbar({activeItem}: Props) {
  const [isOpen, setOpen] = React.useState(false);
  const toggle = () => setOpen(!isOpen);

  return (
    <Navbar className="navbar-expand-lg navbar-light bg-light">
      <NavbarBrand href="/">Layton Street</NavbarBrand>
      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
        <Links activeItem={activeItem}>
          <NavItem>
            <NavLink to="/news" className="nav-link" activeClassName="active">
              News
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/maintenance" className="nav-link" activeClassName="active">
              Maintenance
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/faqs" className="nav-link" activeClassName="active">
              FAQs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact-us" className="nav-link" activeClassName="active">
              Contact us
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
        <UserArea />
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
}

function UserArea({showUserFullName}: UserAreaProps) {
  const [userInfo] = React.useState(undefined);
  const loggedIn: boolean = userInfo != undefined;
  return <>
    <Nav className="ml-auto" navbar>
      <NavItem>
        {loggedIn ? <LogoutButton /> : <LoginButton />}
      </NavItem>
    </Nav>
    {/* {loggedIn ? null : <CreateAccountButton />} */}
  </>;
}

function LogoutButton() {
  return (
    <NavLink to="/logout" className="nav-link">
      Sign out <FontAwesomeIcon icon="sign-out-alt" />
    </NavLink>
  );
}

function LoginButton() {
  return (
    <NavLink to="/login" className="nav-link">
      Sign in <FontAwesomeIcon icon="sign-in-alt" />
    </NavLink>
  );
}

// function CreateAccountButton() {
//   const clicked = function(): void { window.location.href = "/create-account" };
//   return <Button className="ml-md-3" onClick={clicked}>Sign up</Button>
// }