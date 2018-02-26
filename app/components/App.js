import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, SafeAreaView, ScrollView, RefreshControl, View } from 'react-native';
import CurrentWeather from './CurrentWeather';
import ForecastContainer from './ForecastContainer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { lat: null, lon: null },
      hasLocation: false,
      refreshing: false,
      message: false,
      updateWeather: false,
      timestamp: 0
    };
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation() {
    if (Date.now() > this.state.timestamp + 300000) {
      let success = (position) => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          },
          timestamp: Date.now(),
          hasLocation: true,
          refreshing: false,
          updateWeather: true
        });
      };

      let error = () => {
        this.setState({
          message: true,
          hasLocation: false,
          refreshing: false,
          timestamp: 0
        });
      };

      let options = { enableHighAccuracy: true, maximumAge: 0 };

      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      this.setState({ refreshing: false });
    }
  }

  _onRefresh() {
    this.setState({ refreshing: true, updateWeather: false });
    this.getLocation();
  }

  render() {
    let currentWeather, forecast, message;

    if (this.state.hasLocation) {
      currentWeather = <CurrentWeather location={this.state.location} update={this.state.updateWeather} />;
      forecast = <ForecastContainer location={this.state.location} update={this.state.updateWeather} />;
    }
    else if (this.state.message) {
      message = <Text style={styles.message}>We cannot get your location.</Text>
    }

    return (
      <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
      />
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#fff"
            />
          }
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>SimpleWeather</Text>
          </View>
          {message}
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
    paddingTop: 20
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
  message: {
    color: '#fff',
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#247BA0'
  }
});
