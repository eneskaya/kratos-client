import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';

import Event from './Event';

class EventsList extends Component {

  render() {
    return (
      <div>
        <Subheader>Events History</Subheader>
        { this.props.events.map( (event) => {
          return (
            <div>
              <Event key={event.id} {...event} />
            </div>
          );
        }) }
      </div>
    );
  }

}

EventsList.propTypes = {
  events: React.PropTypes.array.isRequired
}

export default EventsList;
