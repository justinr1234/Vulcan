import React from 'react';
import { registerStylesheet } from 'meteor/vulcan:lib';

registerStylesheet(
  'css',
  <link name="bootstrap" rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css" key="stylesheet-boostrap3"/>,
  {
    framework: 'bootstrap3'
  }
);

registerStylesheet(
  'css',
  <link name="bootstrap" rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" key="stylesheet-boostrap4"/>,
  {
    framework: 'bootstrap4'
  }
);
