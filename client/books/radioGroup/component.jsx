var React = require("react");

var Radio = React.createClass({
  render: function() {
    return (
      <div>
        <label>
          <input type="radio" value={this.props.value} checked={this.props.selectedItem === this.props.value} onClick={this.props.onChangeRadio}/>
          {this.props.label}
        </label>
        {this.props.extraContent}
      </div>
    );
  }
});

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
        <Radio value="library" label="At the Library" onChangeRadio={this.onChangeRadio} selectedItem={this.state.selectedItem}/>
        <Radio value="bookstore" label="At the Bookstore" onChangeRadio={this.onChangeRadio} selectedItem={this.state.selectedItem}/>
        <Radio value="internet" label="On the Internet" onChangeRadio={this.onChangeRadio} selectedItem={this.state.selectedItem}/>
        <Radio value="other" label="Other" extraContent={specifyLabel} onChangeRadio={this.onChangeRadio} selectedItem={this.state.selectedItem}/>
        <div>
          <span>Selected item: {this.state.selectedItem}</span>
        </div>
      </div>
    );
  }
});

module.exports = RadioGroup;
