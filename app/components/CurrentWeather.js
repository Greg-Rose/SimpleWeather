import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';

export default class CurrentWeather extends Component {
  getCurrentWeather() {
    fetch(`https://api.weatherbit.io/v2.0/current?units=I&lat=${this.props.location.lat}&lon=${this.props.location.lon}&key=${Config.WEATHERBIT_API_KEY}`)
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
          weatherData: body.data[0],
          city: body.data[0].city_name,
          state: body.data[0].state_code,
          temp: body.data[0].temp,
          pod: body.data[0].pod,
          weather: body.data[0].weather
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentWillMount() {
    this.getCurrentWeather();
  }

  render() {
    let location, temp;

    if (this.state !== null) {
      location = `${this.state.city}, ${this.state.state}`;
      temp = `${Math.floor(this.state.temp)}°`;
    }

    return (
      <View>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.temp}>{temp}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  location: {
    fontSize: 28,
    marginTop: 20,
    textAlign: 'center'
  },
  temp: {
    fontSize: 28,
    margin: 20,
    textAlign: 'center'
  }
});
