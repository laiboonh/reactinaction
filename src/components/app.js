import React from 'react';
import Post from './post';
import CreatePost from './post/CreatePostStateless';

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
                <CreatePost/>
                {this.state.loaded ? this.state.posts.map(post => <Post key={post.id} post={post}/>) :
                    <div>not loaded</div>}
            </div>
        );
    }
}