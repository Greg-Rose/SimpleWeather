import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Forecast from './Forecast';
import Config from 'react-native-config';

export default class ForecastContainer extends Component {
  getForecast() {
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?days=6&units=I&lat=${this.props.location.lat}&lon=${this.props.location.lon}&key=${Config.WEATHERBIT_API_KEY}`)
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
        this.setState({forecastData: body.data});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentWillMount() {
    this.getForecast();
  }

  render() {
    let forecast;

    if (this.state !== null) {
      forecast = this.state.forecastData.map((forecastEntry, index) => {
        return (
          <Forecast
            key={index}
            data={forecastEntry}
          />
        );
      });
    }

    return (
      <View style={styles.container}>
        {forecast}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 10
  }
});
