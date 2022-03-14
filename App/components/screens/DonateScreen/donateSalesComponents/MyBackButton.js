import React from 'react';
import { Button } from 'react-native';
import styles from './style/styles';
import { withNavigation } from 'react-navigation';

class MyBackButton extends React.Component {
  render() {
    return <Button style={styles.backButtonSytle} title="Back" color="#c91a1a" onPress={() => { this.props.navigation.goBack() }} />;
  }
}

export default withNavigation(MyBackButton)