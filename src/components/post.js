import React, {PropTypes} from 'react';

const Post = (props) => {
    return (
        <div className="post">
            <p className="content">
                {props.post.author} - {props.post.content}
            </p>
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
}

export default Post;

