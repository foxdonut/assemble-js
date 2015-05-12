var React = require("react");
var Hello = React.createClass({
  render: function() {
    return (
      <div>Hello, {this.props.name}</div>
    );
  }
});

var Recipe = React.createClass({
  getInitialState: function() {
    return {
      ingredient: "Hummus"
    };
  },
  render: function() {
    return (
      <div>
      We need {this.state.ingredient}
      </div>
    );
  }
});

var RecipeList = React.createClass({
  render: function() {
    return (
      <div>
      RecipeList component text
      </div>
    );
  }
});

var RecipeForm = React.createClass({
  render: function() {
    return (
      <div>
      RecipeForm component text
      </div>
    );
  }
});

var RecipeBook = React.createClass({
  render: function() {
    /* component composition == function componsition */
    return (
      <div>
      Hello, world! I am a RecipeBook.
      <RecipeList/>
      <RecipeForm/>
      </div>
    );
  }
});

React.render(
  <div>
    <div><Hello name="React"/></div>
    <div><Recipe/></div>
    <div><RecipeBook/></div>
  </div>,
  document.getElementById("app")
);
