import React from 'react';
import { View, ImageBackground, Text } from 'react-native';

import styles from './styles';

class CarItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/ModelS.jpeg')} style={styles.bgImage}/>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Model S</Text>
                    <Text style={styles.subtitle}>Starting at $69,420</Text>
                </View>
            </View>
        )
    }
}

export default CarItem;