import React from 'react';

var App = React.createClass({
    getInitialState: function(){
        return {
            posts: {
                all: [],
                filtered: [],
            },
            category: null,
            filters: {
                image: null,
                link: null,
                categories: [],
            },
            loaded: false,
            showBanner: false,
        };
    },
    render: function(){
        return (
            <div className="app">
                Letters Social — coming soon!!!
            </div>
        );
    },
});

module.exports = App;