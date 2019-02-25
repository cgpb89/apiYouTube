import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from "mobx-react";
import { Container } from 'reactstrap';
import VideoDetail from './VideoDetail';
import Header from './Header';
import Favorites from './Favorites';
import { RootStore } from '../store/rootStore';
import Shell from './Shell';

const rootStore = new RootStore();

class App extends Component {

    render() {
        return (
            <div>
                <Provider rootStore={rootStore}>
                    <BrowserRouter>
                        <div>
                            <Header />
                            <Container>
                                <Route exact path="/" component={Shell} />
                                <Route exact path="/videoDetail/:videoId" component={VideoDetail} />
                                <Route exact path="/favorites" component={Favorites} />
                            </Container>
                        </div>
                    </BrowserRouter>
                </Provider>
            </div>
        );
    }
}

export default App;