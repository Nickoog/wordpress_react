import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/home/Home';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';
import Galleries from './components/gallery/Galleries';
import Gallery from './components/gallery/Gallery';
import Page from './components/Page';

// package CSS
import "animate.css/animate.min.css";

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

const App = () => (
    <ApolloProvider client={client}>
        <div id="page-inner">
            <Header />
                <div id="content">
                    <Switch>
                        <Route exact path={MarquisSettings.path} component={Home} />
                        <Route exact path={MarquisSettings.path + 'posts'} component={Posts} />
                        <Route exact path={MarquisSettings.path + 'posts/:slug'} component={Post} />
                        <Route exact path={MarquisSettings.path + 'gallery'} component={Galleries} />
                        <Route exact path={MarquisSettings.path + 'gallery/:slug'} component={Gallery} />
                        <Route exact path={MarquisSettings.path + ':slug'} component={Page} />
                        {/* <Route path="*" component={NotFound} /> */}
                    </Switch>   
                </div>
            <Footer />
        </div>
    </ApolloProvider>
);

// Routes
const routes = (
    <Router>
        <Route path="/" component={App} />
    </Router>
);

render(
    (routes), document.getElementById('page')
);