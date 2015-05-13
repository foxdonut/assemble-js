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
  footerGenerator: function(alternative) {
    if (alternative) {
      return (<div>-- this one had an alternative --</div>);
    }
  },
  render: function() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.instructions}</p>
        <p>Alternative: {this.props.alternative}</p>
        <p>We need {this.state.ingredient}</p>
        {this.footerGenerator(this.props.alternative)}
      </div>
    );
  }
});

var RecipeList = React.createClass({
  render: function() {
    return (
      <div>
        RecipeList component text
        <Recipe title="Hot pepper and mushroom pizza" instructions="Combine and serve on warm Naan bread." alternative="Nutritional yeast."/>
        <Recipe title="Bagel special" instructions="Spread spicy hummus and garnish with pickles."/>
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

var BookList = require("./books/bookList/component");

var books = [
  {id: 1, author: "Daoud", title: "Stripes"},
  {id: 2, author: "Moffitt, Daoud", title: "Seven Web Frameworks"}
];

React.render(
  <div>
    <div><Hello name="React"/></div>
    <div><Recipe/></div>
    <div><RecipeBook/></div>
    <div><BookList books={books}/></div>
  </div>,
  document.getElementById("app")
);
