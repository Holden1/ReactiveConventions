import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import LoginButton from './LoginButton';
import { withAuth0 } from '@auth0/auth0-react';

class NavMenu extends Component {
    static displayName = NavMenu.name;

  constructor (props) {
      super(props);
      

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
    }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

    render() {
        const { isAuthenticated } = this.props.auth0;
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">ReactFrontend</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                            {isAuthenticated && ([<NavItem>
                                <NavLink tag={Link} className="text-dark" to="/Convention">Convention</NavLink>
                            </NavItem>,
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/talk">Talk</NavLink>
                            </NavItem>])}
                            
                            <NavItem>
                                <LoginButton />
                        </NavItem>
                    </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default withAuth0(NavMenu);