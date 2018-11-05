import React from "react";
import PostList from "./Post-list";

const applyUpdateResult = (result) => (prevState) => ({
    //posts: [...prevState.posts, ...result.posts],
    page: result.page,
});

const applySetResult = (result) => ({
    posts: result,
    page: result.page,
});

const getPostsUrl = (page) =>
   `${MarquisSettings.URL.api}posts/?per_page=18&page=${page}`;

let totalPages;

// getMorePosts = () =>{


//     this.setState({ page: this.state.page + 1 });

//     fetch(MarquisSettings.URL.api + "posts/?page=" + this.state.page)
//     .then(function (response) {
//         for (var pair of response.headers.entries()) {
//         // getting the total number of pages
//         if (pair[0] == "x-wp-totalpages") {
//             totalPages = pair[1];
            
//         }

//         if (that.state.page >= totalPages) {
//             that.setState({ getPosts: false });
//         }
//         }
//         if (!response.ok) {
//             throw Error(response.statusText);
//         }
//         return response.json();
//     })
//     .then(function (results) {
//         var allPosts = that.state.posts.slice();
//         results.forEach(function (single) {
//         allPosts.push(single);
//         });
//         that.setState({ posts: allPosts });
//     })
//     .catch(function (error) {
//         console.log(
//         "There has been a problem with your fetch operation: " + error.message
//         );
//     });
// }

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            page: 1,
        };
    }

    componentDidMount() {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
        this.fetchPosts(this.state.page)
    }

    fetchPosts = (page) => {
        fetch(getPostsUrl(page))
            .then(response => {
                for (const pair of response.headers.entries()) {
                    // getting the total number of pages
                    pair[0] === "x-wp-totalpages" ? 
                        totalPages = pair[1]: null;

                }
                return response.json();
            })
            .then(result => {
                let allPosts = this.state.posts.slice();
                result.forEach(function (single) {
                    allPosts.push(single);
                });
                this.setState({
                    posts: allPosts,
                    page: page
                });
            })
            .catch(error => {
                console.log(
                "There has been a problem with your fetch operation: " + error.message
                );
            });
    }

    onPaginatedSearch = (e) => 
        this.fetchPosts(this.state.page + 1);


    render() {
        return (
        <div className="posts container">
            <div className="posts-container">
                <PostList 
                    posts={this.state.posts}
                    page={this.state.page}
                    totalPages={totalPages}
                    onPaginatedSearch={this.onPaginatedSearch} />
            </div>
        </div>
        );
    }
}

export default Posts;