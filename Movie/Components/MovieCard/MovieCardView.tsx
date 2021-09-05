import React from 'react';
import { View, TouchableWithoutFeedback, Image, Text } from 'react-native';
import styles from './styles';

class MoviewCardView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.poster} />
        <View style={styles.ratingContainer}>
          <Image />
          <Text />
        </View>
      </View>
    );
  }
}

export default MoviewCardView;
