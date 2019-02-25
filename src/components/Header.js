import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Clock from 'react-live-clock';
import {
    Collapse, Navbar, NavbarToggler, Nav, NavItem
} from 'reactstrap';
import { inject, observer } from 'mobx-react';

//shows the title of the site and the current hour
@observer
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    toggle = ()=> {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onBack = () => {
        this.props.rootStore.video = null;
    }

    render() {
        const back = this.props.rootStore.video ? true : false;

        return (
            <Navbar color="dark" light expand="md">
                <Link className="noDecoration fontColor" to='/' onClick={this.onBack}>
                    Watch It Now!! {back ? <i className="fas fa-reply iconProps"></i> : ''}
                </Link>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="fontColor">
                            <Link className="noDecoration fontColor" to='/favorites' onClick={this.onBack}>
                                <i className="far fa-star iSpace handPointer"></i>
                            </Link>
                        </NavItem>
                        <NavItem className="fontColor">
                            <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar >
        );
    }
}


export default Header = inject('rootStore')(Header);
