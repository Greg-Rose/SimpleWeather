# SimpleWeather

A simple weather app build using React Native.

<img src="SimpleWeather screenshot.png" alt="Demo screenshot" width= "300px"/>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need node, watchman, and xcode installed on your computer.

```bash
# Install prerequisites
$ brew install node
$ brew install watchman
```
Download and install Xcode from the Mac App Store.

After Xcode is installed, install the Xcode command line tools.
  * Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

### Installing

```bash
# Clone source
$ git clone https://github.com/Greg-Rose/SimpleWeather.git SimpleWeather
$ cd SimpleWeather

# Install React Native CLI
$ npm install -g react-native-cli

# Install dependencies
$ yarn install
  or
$ npm install

```

#### Setup external API for weather data

1. Create a free account at https://www.weatherbit.io/account/create
2. Get your API Key from your account
3. Create a .env file in project root directory
4. Add key to .env file:
  * WEATHERBIT_API_KEY=YOUR_API_KEY_HERE

#### Run App on iOS Simulator

```bash
# Run app
$ react-native run-ios
```

View app in simulator window.
