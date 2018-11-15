import React, { Component } from 'react';
import PostCard from "./PostCard";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';

class Posts extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }
    
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.newPost) {
    //         this.props.posts.unshift(nextProps.newPost);
    //     }
    // }

    render() {
        console.log(this.props);
        const postCard = this.props.posts.map(post => <PostCard key={post.id} post={post}/> )
        return (
        <div className="posts container">
            <div className="row posts-container">
                { postCard }
            </div>
        </div>
        );
    }
}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    //newPost: PropTypes.object
};
  
const mapStateToProps = state => ({
    posts: state.posts.items,
    //newPost: state.posts.item
});
  
export default connect(mapStateToProps, { fetchPosts })(Posts);