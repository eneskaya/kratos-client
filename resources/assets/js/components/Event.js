import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import moment from 'moment';

class Event extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: moment(this.props.time)
    };
    this.startTimeWatch();
  }

  render() {
    const payload = () => {
        if (this.props.payload) {
          return (
            <span>
              <b>Payload</b>: <pre>{JSON.stringify(this.props.payload)}</pre>
            </span>
          );
        }

        return (<b>No Payload attached</b>);
    };

    return (
      <Card style={{ marginBottom: 10 }}>
        <CardHeader
          title={this.props.name}
          subtitle={moment(this.state.time).add(2, 'hours').fromNow() + ' at ' +  moment(this.state.time).format('HH:mm:ss')}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <b>ID:</b>: {this.props.id} <br/>
          <b>Reason</b>: {this.props.reason} <br/>
          <b>Game</b>: {this.props.game} <br/>
          <b>Type</b>: {this.props.type} <br/>
          <b>Resource</b>: {this.props.resource} <br/>
          <b>Player ID</b>: {this.props.player} <br/>
          <b>Time</b>: {this.props.time} <br/>
          {payload()}
        </CardText>
      </Card>
    );
  }

  // Update the time.fromNow() display
  startTimeWatch() {
    setInterval(() => {
      this.setState({
        time: moment(this.state.time)
      });
    }, 60 * 1000);
  }
}

Event.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  game: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  reason: React.PropTypes.string.isRequired,
  resource: React.PropTypes.string.isRequired,
  player: React.PropTypes.string.isRequired,
  time: React.PropTypes.string.isRequired,
  payload: React.PropTypes.object
};

export default Event;
