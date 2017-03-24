import React, {PropTypes} from 'react';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <form className="create-post">
                <textarea placeholder="What's on your mind?"/>
                <input type="submit" placeholder="Post" className="btn btn-default"/>
            </form>
        );
    }

}

CreatePost.propTypes = {}

export default CreatePost;  