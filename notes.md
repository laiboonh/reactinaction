#ReactElement
A ReactElement is a light, stateless, immutable, virtual representation of a
DOM Element.
##Create ReactElement
```
React.createElement(
String/ReactClass type,
 [object props],
 [children ...]
) -> ReactElement 
```
##Render ReactElement
```
ReactDOM.render(
 ReactElement element,
 DOMElement container,
 [function callback]
) -> ReactComponent
```
Example
```javascript
var root = React.createElement('div', {},
    React.createElement('h1', {},"Hello, world!",
        React.createElement('a', {href: 'mailto:mark@ifelse.io'},
            React.createElement('h1', {}, "React In Action"),
            React.createElement('em', {}, "...and now it really is!")
        )
    )
);
var mountTarget = document.getElementById('ourFirstApp');
ReactDOM.render(root,mountTarget);
```
#ReactClass

##Create ReactClass
ReactClass have a "backing instance" unlike ReactElement
```
React.createClass(object specification) ->ReactClass
```
###Specification object
- propTypes let you specify what your component needs to work
- render method needs to be a function that returns exactly one ReactElement
- `this` points to the actual component instance (what React manages) and not what we’ve created as a ReactClass (still just a blueprint).

Example
```javascript
var Post = React.createClass({
    propTypes:{
        user: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        id: React.PropTypes.number.isRequired,
    },
    render:function (){
        return (
            React.createElement('div',{className: 'post'},
                React.createElement('h2',{className: 'postAuthor',id: this.props.id},
                    this.props.user,
                    React.createElement('span',{className: 'postBody'},this.props.content)
                )
            )
        );
    }
});
var App = React.createElement(Post,{
    id: 1,
    content: " said: This is a post!",
    user: 'mark',
});
var mountTarget = document.getElementById('ourFirstApp');
ReactDOM.render(App,mountTarget);
```
###Nesting Components
Take note of `this.props.children` in the render function in Post component. 

Example
```
var Comment = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        content: React.PropTypes.string.isRequired,
        user: React.PropTypes.string.isRequired,
    },
    render: function() {
        return (
            React.createElement('div', {className: 'comment'},
                React.createElement('h2', {className: 'commentAuthor'},
                    this.props.user,
                    React.createElement('span', {className: 'commentContent'},
                        this.props.content
                    )
                )
            )
        );
    }
});


var Post = React.createClass({
    propTypes:{
        user: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        id: React.PropTypes.number.isRequired,
    },
    render:function (){
        return (
            React.createElement('div',{className: 'post'},
                React.createElement('h2',{className: 'postAuthor',id: this.props.id},
                    this.props.user,
                    React.createElement('span',{className: 'postBody'},this.props.content)
                ),
                this.props.children
            )
        );
    }
});
var App = React.createElement(Post,{
    id: 1,
    content: " said: This is a post!",
    user: 'mark',
},
React.createElement(Comment,{
    id: 1,
    content: " said: This is a comment!",
    user: 'bob',
})
);
var mountTarget = document.getElementById('ourFirstApp');
ReactDOM.render(App,mountTarget);
```
###Immutable state (`props`) Muable state (`state`)
`getInitialState` is to set the initial state of the component

Example
```
var CreateComment = React.createClass({
    propTypes: {
        content: React.PropTypes.string,
    },
    getInitialState: function(){
        return {
            content: '',
            user: ''
        };
    },
    render: function() {
        return React.createElement('form',{ className: 'createComment'},
            React.createElement('input',{ type: 'text',placeholder: 'Your name',value: this.state.user,}),
            React.createElement('input',{ type: 'text',placeholder: 'Thoughts?'}),
            React.createElement('input',{ type: 'submit', value: 'Post'})
        );
    }
});
```
##Set state
```
setState(
function|object nextState,
[function callback]
) ->void
```
Example

React ensures that the actual DOM and virtual DOM is in sync. If you took out the eventListener, you will not be key in something in the field and see no response because
`value:this.state.user` maintains the field value is the same as the state value which will  
be empty unless you effect a change in the state   
```
var CreateComment = React.createClass({
    propTypes: {
        content: React.PropTypes.string,
    },
    handleAuthorChange: function(event) {
        this.setState({
            user: event.target.value
        });
    },
    handleContentChange: function(event) {
        this.setState({
            content: event.target.value
        });
    },
    handleSubmit: function(event) {
        event.preventDefault();
        console.log(this.state.content + " - " + this.state.user)
        this.setState( {
            user: '',
            content: ''
        });
    },
    getInitialState: function(){
        return {
            content: '',
            user: ''
        };
    },
    render: function() {
        return React.createElement('form',{ className: 'createComment', onSubmit: this.handleSubmit },
            React.createElement('input',{ type: 'text',placeholder: 'Your name', value:this.state.user, onChange: this.handleAuthorChange }),
            React.createElement('input',{ type: 'text',placeholder: 'Thoughts?', value:this.state.content, onChange: this.handleContentChange }),
            React.createElement('input',{ type: 'submit', value: 'Post'})
        );
    }
});
```
Final Version
- there needs to be a `key` attribute in comments (child component)
- notice in `onCommentSubmit` is configured as a required function in `CreateComment`
```
var data = {
  "post": {
    "id": 123,
    "content": "What we hope ever to do with ease, we must first learn to do with diligence. — Samuel Johnson",
    "user": "Mark Thomas",
  },
  "comments": [{
    "id": 0,
    "user": "David",
    "content": "such. win."
  }, {
    "id": 1,
    "user": "Haley",
    "content": "Love it."
  }, {
    "id": 2,
    "user": "Peter",
    "content": "Who was Samuel Johnson?"
  }, {
    "id": 3,
    "user": "Mitchell",
    "content": "@Peter get off Letters and do your homework"
  }, {
    "id": 4,
    "user": "Peter",
    "content": "@mitchell ok :P"
  }]
};

var Comment = React.createClass({
    propTypes: {
        content: React.PropTypes.string.isRequired,
        user: React.PropTypes.string.isRequired,
    },
    render: function() {
        return (
            React.createElement('div', {className: 'comment'},
                React.createElement('h2', {className: 'commentAuthor'},
                    this.props.user,
                    React.createElement('span', {className: 'commentContent'},
                        this.props.content
                    )
                )
            )
        );
    }
});


var Post = React.createClass({
    propTypes:{
        user: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        id: React.PropTypes.number.isRequired,
    },
    render:function (){
        return (
            React.createElement('div',{className: 'post'},
                React.createElement('h2',{className: 'postAuthor',id: this.props.id},
                    this.props.user,
                    React.createElement('span',{className: 'postBody'},this.props.content)
                ),
                this.props.children
            )
        );
    }
});


var CreateComment = React.createClass({
    propTypes: {
        onCommentSubmit: React.PropTypes.func.isRequired,
        content: React.PropTypes.string,
    },
    handleAuthorChange: function(event) {
        this.setState({
            user: event.target.value
        });
    },
    handleContentChange: function(event) {
        this.setState({
            content: event.target.value
        });
    },
    handleSubmit: function(event) {
        event.preventDefault();
        this.props.onCommentSubmit({
            user: this.state.user.trim(),
            content: this.state.content.trim()
        });
        console.log(this.state.content + " - " + this.state.user)
        this.setState( {
            user: '',
            content: ''
        });
    },
    getInitialState: function(){
        return {
            content: '',
            user: ''
        };
    },
    render: function() {
        return React.createElement('form',{ className: 'createComment', onSubmit: this.handleSubmit },
            React.createElement('input',{ type: 'text',placeholder: 'Your name', value:this.state.user, onChange: this.handleAuthorChange }),
            React.createElement('input',{ type: 'text',placeholder: 'Thoughts?', value:this.state.content, onChange: this.handleContentChange }),
            React.createElement('input',{ type: 'submit', value: 'Post'})
        );
    }
});

var CommentBox = React.createClass({
  propTypes: {
    post: React.PropTypes.object,
    comments: React.PropTypes.arrayOf(React.PropTypes.object),
  },
  getInitialState: function() {
    return {
      comments: this.props.comments
    };
  },
  handleCommentSubmit: function(comment) {
    console.log(comment);
    var comments = this.state.comments;
    // note that we didn't directly modify state
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({
      comments: newComments
    });
  },
  render: function() {
    return (
      React.createElement('div', {
          className: 'commentBox'
        },
        React.createElement(Post, {
          id: this.props.post.id,
          content: this.props.post.content,
          user: this.props.post.user,
        },
        this.state.comments.map(function(comment) {
          return React.createElement(Comment, {
            key: comment.id,
            content: comment.content,
            user: comment.user,
          })
        })),
        React.createElement(CreateComment, {
          onCommentSubmit: this.handleCommentSubmit
        })
      )
    );
  }
});

var mountTarget = document.getElementById('ourFirstApp');
ReactDOM.render(React.createElement(CommentBox, {
    comments: data.comments,
    post: data.post,
}), mountTarget);
```
#JSX
- include the babel compiler `<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.38/browser.min.js"></script>`
- change the javascript type to `<script type="text/babel">`
```
var data = {
  "post": {
    "id": 123,
    "content": "What we hope ever to do with ease, we must first learn to do with diligence. — Samuel Johnson",
    "user": "Mark Thomas",
  },
  "comments": [{
    "id": 0,
    "user": "David",
    "content": "such. win."
  }, {
    "id": 1,
    "user": "Haley",
    "content": "Love it."
  }, {
    "id": 2,
    "user": "Peter",
    "content": "Who was Samuel Johnson?"
  }, {
    "id": 3,
    "user": "Mitchell",
    "content": "@Peter get off Letters and do your homework"
  }, {
    "id": 4,
    "user": "Peter",
    "content": "@mitchell ok :P"
  }]
};

var Comment = React.createClass({
    propTypes: {
        content: React.PropTypes.string.isRequired,
        user: React.PropTypes.string.isRequired,
    },
    render: function() {
        return (
            <div className="comment">
              <div className="commentAuthor">
              {this.props.user + ' : '} <span className="commentContent">{this.props.content}</span>
              </div>
            </div>
        );
    }
});


var Post = React.createClass({
    propTypes:{
        user: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        id: React.PropTypes.number.isRequired,
    },
    render:function (){
        return (
            <div className="post">
                <h2 className="postAuthor">{this.props.user}</h2>
                <span className="postBody">{this.props.content}</span>
                {this.props.children}
            </div>
        );
    }
});


var CreateComment = React.createClass({
    propTypes: {
        onCommentSubmit: React.PropTypes.func.isRequired,
        content: React.PropTypes.string,
    },
    handleAuthorChange: function(event) {
        this.setState({
            user: event.target.value
        });
    },
    handleContentChange: function(event) {
        this.setState({
            content: event.target.value
        });
    },
    handleSubmit: function(event) {
        event.preventDefault();
        this.props.onCommentSubmit({
            user: this.state.user.trim(),
            content: this.state.content.trim()
        });
        console.log(this.state.content + " - " + this.state.user)
        this.setState( {
            user: '',
            content: ''
        });
    },
    getInitialState: function(){
        return {
            content: '',
            user: ''
        };
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit} className="createComment">
            <input
                value={this.state.user}
                onChange={this.handleAuthorChange}
                placeholder="Your name"
                type="text"/>
            <input
                value={this.state.content}
                onChange={this.handleContentChange}
                placeholder="Thoughts?"
                type="text"/>
            <input value="Post" type="submit"/>
            </form>
        );
    }
});

var CommentBox = React.createClass({
  propTypes: {
    post: React.PropTypes.object,
    comments: React.PropTypes.arrayOf(React.PropTypes.object),
  },
  getInitialState: function() {
    return {
      comments: this.props.comments
    };
  },
  handleCommentSubmit: function(comment) {
    console.log(comment);
    var comments = this.state.comments;
    // note that we didn't directly modify state
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({
      comments: newComments
    });
  },
  render: function() {
    return (
        <div className="commentBox" >
        <Post id={this.props.post.id} content={this.props.post.content} user={this.props.post.user}>
        {
            this.state.comments.map(function(comment) {
                return (<Comment key={comment.id} content={comment.content} user={comment.user} />)
            })
        }
        </Post>
        <CreateComment onCommentSubmit={this.handleCommentSubmit}/>
        </div>
    );
  }
});

var mountTarget = document.getElementById('ourFirstApp');
ReactDOM.render(React.createElement(CommentBox, {
    comments: data.comments,
    post: data.post,
}), mountTarget);
```
##What does `setState` do exactly?
It performs a merge of nextState into the current state.

`name` is overwritten to become empty string, `colors.favourite` become blue
```
const ShallowMerge = React.createClass({
    getInitialState: function() {
        return {
            user: {
                name: 'Mark',
                colors: {
                    favorite: 'red',
                }
            }
        };
    },
    onButtonClick: function() {
        this.setState({
            user: {
                colors:{
                    favorite: 'blue'
                }
            }
        });
    },
    render: function(){
        return(
            <div>
            <h1>My favorite color is {this.state.user.colors.favorite} and my name is {this.state.user.name}</h1>
            <button onClick={this.onButtonClick}>show the color!</button>
            </div>
        )
    }
});

ReactDOM.render(
    <ShallowMerge/>,
    document.getElementById('container')
);
```
##Passing a function to `setState`
You can pass a function that provides previousState and currentProps as arguments to setState
```
const Counter = React.createClass({
    getInitialState: function() {
        return{
            count: 0,
        };
    },
    onButtonClick: function () {
        this.setState(function(previousState, currentProps){
            return{count: previousState.count + currentProps.incrementBy};
        });
    },
    render: function() {
        return (
            <div>
            <h1>{this.state.count}</h1>
            <button onClick={this.onButtonClick}>+</button>
            </div>
        )
    }
});

ReactDOM.render(
    <Counter incrementBy={1}/>, 
    document.getElementById('container')
);
```
##`propTypes` specification can be object as well
Notice also `<Counter/>` did not specify `incrementBy` which is a required prop. It's specified in `getDefaultProps`
```
const Counter = React.createClass({
    propTypes:{
        incrementBy: React.PropTypes.number.isRequired,        
        counterStyle: React.PropTypes.shape({
            color: React.PropTypes.string,
            fontSize: React.PropTypes.number
        }),
    },
    getDefaultProps: function() {
        return {
            incrementBy: 1
        };
    },
    getInitialState: function() {
        return {
            count:0
        }
    },
    onButtonClick: function () {
        this.setState(function(previousState, currentProps){
            return {count: previousState.count + currentProps.incrementBy};
        });
    },
    render: function() {
    // this.props.incrementBy = 2;
        return (
            <div>
            <h1>{this.state.count}</h1>
            <button onClick={this.onButtonClick}>+</button>
            </div>
        )
    }
})

ReactDOM.render(
    <Counter/>,
    document.getElementById('container')
);
```
#Stateless functional components
```
...
    render: function() {
        return (
            <Display count={this.state.count} onClick={this.onButtonClick} />
        )
    }
...
const Display = (props) => <div><h1>{props.count}</h1><button onClick={props.onClick}>+</button></div>;
Display.propTypes = {
    count: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired
};
Display.defaultProps = {
    count: 0
};
```