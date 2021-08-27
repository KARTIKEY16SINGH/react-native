import React from "react";
import { FlatList, View, Dimensions } from "react-native";

import CarItem from "../CarItem/index";
import styles from "./styles";
import cars from './cars'

class CarsList extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    data={cars}
                    renderItem={({item})  => <CarItem car={item}/> }
                    snapToAlignment={'start'}
                    decelerationRate={'fast'}
                    snapToInterval={Dimensions.get('window').height}
                    showsVerticalScrollIndicator={'false'}
                />
            </View>
        )
    }
}

export default CarsList;