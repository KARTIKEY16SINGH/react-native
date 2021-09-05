import React from 'react';
import { View, TouchableWithoutFeedback, Image, Text } from 'react-native';
import styles from './styles';

class MoviewCardView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.poster} source={{ uri: 'https://image.tmdb.org/t/p/original/ic0intvXZSfBlYPIvWXpU1ivUCO.jpg' }} />
        <View style={styles.ratingContainer}>
          <Image source={require('../../assests/star.png')} style={styles.starIcon} />
          <Text style={styles.ratingText} >7.0</Text>
        </View>
      </View>
    );
  }
}

export default MoviewCardView;
