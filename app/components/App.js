import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CurrentWeather from './CurrentWeather';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { lat: null, lon: null },
      hasLocation: false
    };
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        },
        hasLocation: true
      });
    });
  }

  render() {
    let currentWeather;

    if (this.state.hasLocation) {
      currentWeather = <CurrentWeather location={this.state.location} />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>SimpleWeather</Text>
        {currentWeather}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 40
  },
  title: {
    fontSize: 38,
    textAlign: 'center',
    margin: 10,
  }
});
