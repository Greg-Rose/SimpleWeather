import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import WeatherIcon from './WeatherIcon';
import selectIcon from '../helpers/selectIcon';

export default class Forecast extends Component {
  render() {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date = new Date(this.props.data.ts * 1000);
    let iconName = selectIcon(this.props.data.weather.code);

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{days[date.getDay()]}</Text>
        <Text style={styles.text}>{Math.floor(this.props.data.max_temp)}°</Text>
        <Text style={styles.text}>{Math.floor(this.props.data.min_temp)}°</Text>
        <WeatherIcon name={iconName} size={50} color="#fff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center',
    marginBottom: 10
  },
  text: {
    color: '#fff',
    marginBottom: 10
  }
});
