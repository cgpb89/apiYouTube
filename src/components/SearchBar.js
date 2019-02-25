import React, { Component } from 'react';
import { Button, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { inject } from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Manages the search input for videos
class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = { term: '' }
    }

    onInputChange = (event) => {
        if (event.target.value.length > 2) {//If the user does not enter more than 2 characters, the search does not trigger.
            this.props.onSearch(this.state.term);
        }
        this.setState({ term: event.target.value });
    }

    onSearch = event => {
        event.preventDefault();
        const { term } = this.state;
        if (term.length > 2) {//If the user does not enter more than 2 characters, the search does not trigger.
            this.props.onSearch(this.state.term);
        } else {
            toast.warn("You need to add more than two characters", {
                position: toast.POSITION.TOP_RIGHT,
                closeOnClick: true
            });
        }

    }

    render() {
        return (
            <div>
                <ToastContainer />
                <Label >Search</Label>
                <InputGroup>
                    <Input type="text" value={this.state.term} onChange={this.onInputChange} placeholder="Look for a video!" />
                    <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={this.onSearch}>
                            <i className="fas fa-search"></i>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}

export default SearchBar = inject('rootStore')(SearchBar);