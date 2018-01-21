import React from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'meteor/vulcan:core';

const Flash = ({message, type}) => {
  
  type = type === "error" ? "danger" : type; // if type is "error", use "danger" instead

  return (
    <Components.Alert className="flash-message" bsStyle={type}>
      {Array.isArray(message) ? 
        <ul>
          {message.map((message, index) => 
            <li key={index}>{message.content}</li>
          )}
        </ul>
        : <span>{message.content}</span>
      }
    </Components.Alert>
  )
}

Flash.propTypes = {
  message: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired])
}

registerComponent('FormFlash', Flash);