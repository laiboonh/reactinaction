import React, {PropTypes} from 'react';

const CreatePost = (props) =>
    <form className="create-post">
        <textarea placeholder="What's on your mind?"/>
        <button onClick={props.handleOnClick} placeholder="Post" className="btn btn-default">Create</button>
    </form>

CreatePost.propTypes = {};
CreatePost.getInitialState = function () {
    return {};
}
CreatePost.defaultProps = {
    handleOnClick: function (event) {
        event.preventDefault();
        console.log("Hi")
    }
}


export default CreatePost;  