import React from 'react';
import Post from './post';
import CreatePost from './post/CreatePost';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            category: null,
            filters: {
                image: null,
                link: null,
                categories: [],
            },
            loaded: false,
            showBanner: false,
        };
        this.handlePostSubmit = this.handlePostSubmit.bind(this);
    }

    handlePostSubmit(payload) {
        console.log(payload);
        // Disable empty posts
        if (!payload.content) {
            return;
        }

        // Update the local posts state optimistically
        const oldPosts = this.state.posts;
        oldPosts.unshift(payload);

        this.setState({
            posts: oldPosts
        });
    }

    componentDidMount() {
        this.setState({
            posts: [{id: 1, author: 'Lai Boon Hui', content: 'This is my 1st post'}],
            loaded: true
        });
    }

    render() {
        return (
            <div className="app">
                <CreatePost onSubmit={this.handlePostSubmit}/>
                {this.state.loaded ? this.state.posts.map(post => <Post key={post.id} post={post}/>) :
                    <div>not loaded</div>}
            </div>
        );
    }
}