import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

import OneSignal from 'react-native-onesignal';

export default class App extends Component {
  componentDidMount() {
    OneSignal.setLogLevel(7, 0);
    OneSignal.init('96ef2fff-208d-4b7e-a592-6c45b3633fad', { kOSSettingsKeyAutoPrompt: true });
    OneSignal.inFocusDisplaying(0);

    OneSignal.addEventListener('received', (n) => console.log('received', n));
    OneSignal.addEventListener('opened', (n) => console.log('opened', n));
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received');
    OneSignal.removeEventListener('opened');
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <LoginButton 
            publishPermissions={['publish_actions']}
            onLoginFinished={console.log}
            onLogoutFinished={console.log}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
