import React from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import Detail from '../DetailComponent';

class MyNavigationButton extends React.Component {

  render() {

    return <Button title="Details" color="#c91a1a" onPress={() => {
      this.props.navigation.navigate('SalesDetail',
        {
          image: this.props.author,
          bio: this.props.description,
          title: this.props.title
        })
    }}
    />;

  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(MyNavigationButton);