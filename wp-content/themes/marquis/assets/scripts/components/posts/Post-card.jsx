import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';

const PostCard = ({ post }) => {
    const { title, featured_image_src, author_name, published_date, slug } = post;
    return (
        <div className="col-lg-4 col-md-6 card-outer">
            <ScrollAnimation
                animateIn='fadeInUp'
                animateOnce={true}>
                <div 
                    className="post-card"
                    style={{'backgroundImage': `url(${ featured_image_src }`}}>
                    <Link to={ slug }>
                        <div className="card-body">
                            <h4 className="card-title">
                                { title }
                            </h4>
                            <p className="card-text">
                                <small>
                                    { author_name } &ndash; { published_date }
                                </small>
                            </p>
                        </div>
                    </Link>
                </div>
            </ScrollAnimation>
        </div>
    );
}

export default PostCard;
