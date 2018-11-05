import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import ScrollAnimation from 'react-animate-on-scroll';

class PostList extends React.Component {
    // componentDidMount() {
    //     window.addEventListener('scroll', this.onScroll, false);
    // }
    
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.onScroll, false);
    // }
    
    // onScroll = () => {
    //     console.log(this.props.posts.length);
    //     if (
    //       (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
    //       this.props.posts.length
    //     ) {
    //       this.props.onPaginatedSearch();
    //     }
    // }
    renderPosts() {
        return this.props.posts.map((post, i) => {
            return (
                <div className="col-lg-4 col-md-6 card-outer" key={i}>
                    <ScrollAnimation
                        animateIn='fadeInUp'
                        animateOnce={true}>
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
                                    {/* <div
                                        className="card-content" 
                                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                    /> */}
                                </div>
                            </Link>
                        </div>
                    </ScrollAnimation>
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
            <div>
                <div className="row">
                    {this.props.posts.length ?
                        this.renderPosts() :
                        this.renderLoader()
                    }
                </div>
                {
                    this.props.page < this.props.totalPages &&
                    <div className="button-wrapper">
                        <button
                            type="button"
                            onClick={this.props.onPaginatedSearch}
                        >
                            More
                        </button>
                    </div>
                }
            </div>
        );
    }
}

export default PostList;
