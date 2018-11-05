import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

//components
import PostList from "./Post-list";

let totalPages;

const getPostsQuery = gql`
    {
        posts(posts:"gallery",num:5){
            id
            title
        } 
    }
`;

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            page: 1,
        };
    }
    displayPosts(){
        let data = this.props.data;
        console.log(data)
        if(data.loading){
            return( <div>Loading posts...</div> );
        } else {
            return data.posts.map(post => {
                return(
                    <li key={ post.id }>{ post.title }</li>
                );
            })
        }
    }
    // componentDidMount() {
    //     window.onbeforeunload = function () {
    //         window.scrollTo(0, 0);
    //     };
    //     this.fetchPosts(this.state.page)
    // }

    // fetchPosts = (page) => {
    //     fetch(getPostsUrl(page))
    //         .then(response => {
    //             for (const pair of response.headers.entries()) {
    //                 // getting the total number of pages
    //                 pair[0] === "x-wp-totalpages" ? 
    //                     totalPages = pair[1]: null;

    //             }
    //             return response.json();
    //         })
    //         .then(result => {
    //             let allPosts = this.state.posts.slice();
    //             result.forEach(function (single) {
    //                 allPosts.push(single);
    //             });
    //             this.setState({
    //                 posts: allPosts,
    //                 page: page
    //             });
    //         })
    //         .catch(error => {
    //             console.log(
    //             "There has been a problem with your fetch operation: " + error.message
    //             );
    //         });
    // }

    onPaginatedSearch = (e) => 
        this.fetchPosts(this.state.page + 1);


    render() {
        return (
        <div className="posts container">
            <div className="posts-container">
                <ul>
                    { this.displayPosts() }
                </ul>
                {/* <PostList 
                    posts={this.state.posts}
                    page={this.state.page}
                    totalPages={totalPages}
                    onPaginatedSearch={this.onPaginatedSearch} /> */}
            </div>
        </div>
        );
    }
}

export default graphql(getPostsQuery)(Posts);

