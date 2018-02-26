import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import WeatherIcon from './WeatherIcon';
import selectIcon from '../helpers/selectIcon';

export default class CurrentWeather extends Component {
  getCurrentWeather(lat, lon) {
    fetch(`https://api.weatherbit.io/v2.0/current?units=I&lat=${lat}&lon=${lon}&key=${Config.WEATHERBIT_API_KEY}`)
      .then(response => {
        if(response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          city: body.data[0].city_name,
          humidity: body.data[0].rh,
          pod: body.data[0].pod,
          state: body.data[0].state_code,
          temp: body.data[0].temp,
          weather: body.data[0].weather
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentWillMount() {
    this.getCurrentWeather(this.props.location.lat, this.props.location.lon);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.update) {
      this.getCurrentWeather(nextProps.location.lat, nextProps.location.lon);
    }
  }

  render() {
    let location, temp, humidity, description, iconName;

    if (this.state !== null) {
      location = `${this.state.city}, ${this.state.state}`;
      temp = `${Math.floor(this.state.temp)}°`;
      iconName = selectIcon(this.state.weather.code, this.state.pod);
      description = this.state.weather.description;
      humidity = (
        <View style={styles.centeredRowContainer}>
          <Text style={styles.hum}>{this.state.humidity}</Text>
          <WeatherIcon name="wi-humidity" size={34} color="#fff" style={styles.humIcon} />
        </View>
      );
    }

    return (
      <View>
        <Text style={styles.location}>{location}</Text>
        <View style={styles.centeredRowContainer}>
          <Text style={styles.temp}>{temp}</Text>
          <Text style={styles.description}>{description}</Text>
          {humidity}
        </View>
        <WeatherIcon name={iconName} size={150} color="#fff" style={styles.icon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  location: {
    color: '#fff',
    fontSize: 28,
    marginTop: 20,
    textAlign: 'center'
  },
  temp: {
    color: '#fff',
    fontSize: 28,
    margin: 20
  },
  hum: {
    color: '#fff',
    fontSize: 28,
    margin: 20,
    marginRight: 0
  },
  icon: {
    textAlign: 'center'
  },
  humIcon: {
    marginTop: 20,
    marginLeft: -5,
    textAlign: 'center'
  },
  description: {
    color: '#fff',
    fontSize: 18,
    marginTop: 26
  },
  centeredRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
