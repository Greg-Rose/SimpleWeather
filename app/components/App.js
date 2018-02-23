import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, SafeAreaView, ScrollView, View } from 'react-native';
import CurrentWeather from './CurrentWeather';
import ForecastContainer from './ForecastContainer';

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
    let currentWeather, forecast;

    if (this.state.hasLocation) {
      currentWeather = <CurrentWeather location={this.state.location} />;
      forecast = <ForecastContainer location={this.state.location} />;
    }

    return (
      <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
      />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>SimpleWeather</Text>
          </View>
          {currentWeather}
          {forecast}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#247BA0',
    paddingTop: 40
  },
  titleContainer: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1
  },
  title: {
    color: '#fff',
    fontSize: 38,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    textAlign: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#247BA0'
  }
});
