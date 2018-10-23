import React from 'react';
import { Link } from 'react-router-dom';
import Placeholder from '../../placeholder.jpg';
import Loader from '../Loader';
import LoadingIcon from "../../loading-icon.gif";

class PostList extends React.Component {

    renderPosts() {
        return this.props.posts.map((post, i) => {
            return (
                <div className="col-lg-4 col-md-6 card-outer" key={i}>
                    <div 
                        className="post-card"
                        style={{'backgroundImage': `url(${post.featured_image_src}`}}>
                        <Link to={post.slug}>
                            <div className="card-body">
                                <h4 className="card-title">
                                    {post.title.rendered}
                                </h4>
                                <p className="card-text">
                                    <small>
                                        {post.author_name} &ndash; {post.published_date}
                                    </small>
                                </p>
                                <div
                                    className="card-content" 
                                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            )
        });
    }

    renderLoader() {
        return <Loader/>;
    }

    render() {
        if (!this.props.posts) {
            return null;
        }

        return (
            <div className="row">
                {this.props.posts.length ?
                    this.renderPosts() :
                    this.renderLoader()
                }
            </div>
        );
    }
}

export default PostList;
