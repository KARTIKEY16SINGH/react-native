import React from 'react';
import {View, TouchableWithoutFeedback, Image, Text} from 'react-native';
import Shimmer from './Shimmer';
import styles from './styles';
import UrlManager from '../../Managers/UrlManager';

class MoviewCardView extends React.Component {
  private TAG = 'MoviewCardView';
  render() {
    // console.log(this.TAG, 'render() props ===> ', this.props);
    const {loading, data} = this.props;
    return loading === true ? (
      <Shimmer />
    ) : (
      <View style={styles.container}>
        <Image
          style={styles.poster}
          source={{
            uri: UrlManager.shared.getImageUrl(data.poster_path),
          }}
        />
        <View style={styles.ratingContainer}>
          <Image
            source={require('../../assests/star.png')}
            style={styles.starIcon}
          />
          <Text style={styles.ratingText}>{data.vote_average}</Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {popularMovies} = state;
  return {loading: popularMovies.loading};
}

export default MoviewCardView;
