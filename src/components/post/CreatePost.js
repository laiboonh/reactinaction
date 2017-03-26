import React, {PropTypes} from 'react';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);

        this.state = {
            content: '',
            valid: true
        }
    }

    handlePostChange(event) {
        const content = event.target.value;
        this.setState({
            content: content,
            valid: content.length <= 10
        });
    }

    handleSubmit(event) {



        event.preventDefault();

        console.log(this.state.valid);

        if (!this.state.valid) {
            return;
        }

        console.log("inside handleSubmit");

        if(this.props.onSubmit){
            const newPost = {
                date: Date.now(),
                id: Date.now(),
                content: this.state.content
            }
            this.props.onSubmit(newPost);
            this.setState({
                content: '',
                valid: true,
            });
        }
    }

    render() {
        return (
            <form
                className="create-post"
                onSubmit={this.handleSubmit}>
                <textarea
                    value={this.state.content}
                    onChange={this.handlePostChange}
                    placeholder="What's on your mind?"/>
                {
                    this.state.valid ? null : <div>your post is too long! :(</div>
                }
                <input
                    type="submit"
                    placeholder="Post"
                    className="btn btn-default"/>
            </form>
        );
    }
}

CreatePost.propTypes = {}

export default CreatePost;  