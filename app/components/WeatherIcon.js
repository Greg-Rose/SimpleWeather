import React, { Component } from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

export default class WeatherIcon extends Component {
  render() {
    return (
      <Icon name={this.props.name}
            size={this.props.size}
            color={this.props.color}
            style={this.props.style}
      />
    );
  }
}
