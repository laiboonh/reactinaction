import React, {PropTypes} from 'react';

const CreatePost = React.createClass({
    propTypes: {},
    getInitialState: function(){
        return {

        };
    },
    render: function () {
        return (
            React.createElement('form', {className: "create-post"},
                React.createElement('textarea', {placeholder: "What's on your mind?"}),
                React.createElement('button', {
                    onClick: this.handleOnClick,
                    placeholder: "Post",
                    className: "btn btn-default"
                }, "Create")
            )
        );
    },
    handleOnClick: function (event) {
        event.preventDefault();
        this.setState({
            event: "Hi"
        });
    }
});


export default CreatePost;  