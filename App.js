import React from 'react';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import Navigation from './src/navigation/index';

import { StyleSheet } from 'react-native';

import { Block } from './src/components';

// import all used images
const images = [
  require('./src/assets/icons/back.png'),
  require('./src/assets/icons/plants.png'),
  require('./src/assets/icons/seeds.png'),
  require('./src/assets/icons/flowers.png'),
  require('./src/assets/icons/sprayers.png'),
  require('./src/assets/icons/pots.png'),
  require('./src/assets/icons/fertilizers.png'),
  require('./src/assets/images/plants_1.png'),
  require('./src/assets/images/plants_2.png'),
  require('./src/assets/images/plants_3.png'),
  require('./src/assets/images/explore_1.png'),
  require('./src/assets/images/explore_2.png'),
  require('./src/assets/images/explore_3.png'),
  require('./src/assets/images/explore_4.png'),
  require('./src/assets/images/explore_5.png'),
  require('./src/assets/images/explore_6.png'),
  require('./src/assets/images/illustration_1.png'),
  require('./src/assets/images/illustration_2.png'),
  require('./src/assets/images/illustration_3.png'),
  require('./src/assets/images/avatar.png'),
];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  handleResourcesAsync = async () => {
    // we're caching all the images for better performance on the app
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }

    return (
      <Block>
        <Navigation />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
});
