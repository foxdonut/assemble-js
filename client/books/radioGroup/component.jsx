var React = require("react");

var RadioGroup = React.createClass({
  getInitialState: function() {
    return {
      selectedItem: null,
      otherText: null
    };
  },

  onChangeRadio: function(event) {
    this.setState({selectedItem: event.target.value});
  },

  onChangeText: function(event) {
    self.setState({otherText: event.target.value});
  },

  render: function() {
    var specifyLabel = null;

    if (this.state.selectedItem === "other") {
      specifyLabel = (<span>
        <label> - </label>
        <label>
          Please specify:
          <input type="text" value={this.state.otherText} onChange={this.onChangeText}/>
        </label>
      </span>);
    }

    return (
      <div>
        <div>How did you hear about this book?</div>
        <div>
          <label>
            <input type="radio" value="library" checked={this.state.selectedItem === "library"} onClick={this.onChangeRadio}/>
            At the Library
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="bookstore" checked={this.state.selectedItem === "bookstore"} onClick={this.onChangeRadio}/>
            At the Bookstore
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="internet" checked={this.state.selectedItem === "internet"} onClick={this.onChangeRadio}/>
            On the Internet
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="other" checked={this.state.selectedItem === "other"} onClick={this.onChangeRadio}/>
            Other
          </label>
          {specifyLabel}
        </div>
        <div>
          <span>Selected item: {this.state.selectedItem}</span>
        </div>
      </div>
    );
  }
});

module.exports = RadioGroup;
