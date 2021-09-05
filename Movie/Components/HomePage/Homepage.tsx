import React from 'react';
import { View } from 'react-native';
import MoviewCardView from '../MovieCard/MovieCardView';
import styles from './styles';

class Homepage extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <MoviewCardView />
            </View>
        )
    }
}

export default Homepage;