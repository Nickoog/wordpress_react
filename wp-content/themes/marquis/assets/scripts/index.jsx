import React from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/home/Home';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';
import Galleries from './components/gallery/Galleries';
import Gallery from './components/gallery/Gallery';
import Page from './components/Page';

// lazy components
// const Header = lazy(() => import('./components/Header'));
// const Footer = lazy(() => import('./components/Footer'));
// const Home = lazy(() => import('./components/home/Home'));
// const Posts = lazy(() => import('./components/posts/Posts'));
// const Post = lazy(() => import('./components/posts/Post'));
// const Galleries = lazy(() => import('./components/gallery/Galleries'));
// const Gallery = lazy(() => import('./components/gallery/Gallery'));
// const Page = lazy(() => import('./components/Page'));

import store from './store';

import "animate.css/animate.min.css";

const App = () => (
    <Provider store={store}>
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
    </Provider>
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