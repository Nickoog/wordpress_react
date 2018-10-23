import React from "react";
import PostList from "./Post-list";

const applyUpdateResult = (result) => (prevState) => ({
    posts: [...prevState.posts, ...result.posts],
    page: result.page,
});

const applySetResult = (result) => (prevState) => ({
    posts: result.posts,
    page: result.page,
});

const getPostsUrl = (page) =>
   `${MarquisSettings.URL.api}posts/?page=${page}`;

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        posts: [],
        page: null,
    };
    this.getMorePosts = this.getMorePosts.bind(this);
  }

    componentWillUnmount() {
        
    }

    componentDidMount() {
        this.fetchPosts(this.state.page)
    }

    fetchPosts = (page) =>
        fetch(getPostsUrl(page))
            .then(response => response.json())
            .then(result => this.onSetResult(result, page));

    onSetResult = (result, page) =>
        page === 0
            ? this.setState(applySetResult(result))
            : this.setState(applyUpdateResult(result));

    onPaginatedSearch = (e) =>
        this.fetchStories(this.state.page + 1);

    componentDidUpdate() {
    }

    render() {
        return (
        <div className="posts container">
            <div className="posts-container">
                <PostList posts={this.state.posts} />
            </div>
        </div>
        );
    }
}

export default Posts;

const getMorePosts = () => {
    var that = this;
    var totalPages;

    this.setState({ page: this.state.page + 1 });

    fetch(MarquisSettings.URL.api + "posts/?page=" + this.state.page)
    .then(function (response) {
        for (var pair of response.headers.entries()) {
        // getting the total number of pages
        if (pair[0] == "x-wp-totalpages") {
            totalPages = pair[1];
            
        }

        if (that.state.page >= totalPages) {
            that.setState({ getPosts: false });
        }
        }
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then(function (results) {
        var allPosts = that.state.posts.slice();
        results.forEach(function (single) {
        allPosts.push(single);
        });
        that.setState({ posts: allPosts });
    })
    .catch(function (error) {
        console.log(
        "There has been a problem with your fetch operation: " + error.message
        );
    });
}
