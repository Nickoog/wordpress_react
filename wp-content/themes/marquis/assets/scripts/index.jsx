import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Posts from './components/posts/posts';
import Post from './components/posts/post';
import Galleries from './components/gallery/Galleries';
import Gallery from './components/gallery/Gallery';
import NotFound from './components/not-found';
import Page from './components/page';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

// Load the Sass file
//require('./style.scss');

const App = () => (
    <div id="page-inner">
        <Header />
        <div id="content">
            <Switch>
                <Route exact path={MarquisSettings.path} component={Posts} />
                <Route exact path={MarquisSettings.path + 'posts/:slug'} component={Post} />
                <Route exact path={MarquisSettings.path + 'galleries'} component={Galleries} />
                <Route exact path={MarquisSettings.path + 'gallery/:slug'} component={Gallery} />
                <Route exact path={MarquisSettings.path + ':slug'} component={Page} />
                {/* <Route path="*" component={NotFound} /> */}
            </Switch>
        </div>
        <Footer />
    </div>
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