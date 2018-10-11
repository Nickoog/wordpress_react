import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Posts from './posts/posts';
import Post from './posts/post';
import Galleries from './gallery/Galleries';
import Gallery from './gallery/Gallery';
import Page from './page';


const Home = ({ location }) => {
    return (
        <TransitionGroup className="transition-group">
            <CSSTransition
            key={location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames="fade"
            >
                <div id="content">
                    <Switch location={location}>
                        <Route exact path={MarquisSettings.path} component={Posts} />
                        <Route exact path={MarquisSettings.path + 'posts/:slug'} component={Post} />
                        <Route exact path={MarquisSettings.path + 'gallery'} component={Galleries} />
                        <Route exact path={MarquisSettings.path + 'gallery/:slug'} component={Gallery} />
                        <Route exact path={MarquisSettings.path + ':slug'} component={Page} />
                        {/* <Route path="*" component={NotFound} /> */}
                    </Switch>   
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default withRouter(Home);
