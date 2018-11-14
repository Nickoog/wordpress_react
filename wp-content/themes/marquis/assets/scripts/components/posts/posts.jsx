import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';

//components
import PostCard from "./Post-card";
import Loader from '../Loader';

let totalPages;
// 
const GET_POSTS_QUERY = gql`
    query GetPosts($posts: String, $num: Int)
        {
            posts(posts:$posts, num:$num){
                id
                slug
                author_name
                published_date
                featured_image_src
                title
            } 
        }
        
`;
// {
//     this.props.page < this.props.totalPages &&
//     <div className="button-wrapper">
//         <button
//             type="button"
//             onClick={this.props.onPaginatedSearch}
//         >
//             More
//         </button>
//     </div>
// }
class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: 'posts',
            num: 5,
            page: 1,
        };
    }

    displayPosts(){
        let { data } = this.props;
        console.log(this.props);
        if(data.loading){
            return( <Loader /> );
        } else {
            return data.posts.map(post => <PostCard key={post.id} post={post} />)
        }
    }

    onPaginatedSearch = (e) => 
        this.fetchPosts(this.state.page + 1);


    render() {
        return (
            <div className="posts container">
                <div className="posts-container">
                    <div className="row">
                        { this.displayPosts() }
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(GET_POSTS_QUERY, {
    options: {
        variables: {
            posts: "posts",
            num: 2
        }
    }
})(Posts);
