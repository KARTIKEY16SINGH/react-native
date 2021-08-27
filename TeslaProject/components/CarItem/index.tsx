import React from 'react';
import { View, ImageBackground, Text } from 'react-native';

import styles from './styles';
import StyledButton from '../StyleButton';

class CarItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {name, tagline, taglineCTA, image} = this.props
        return (
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.bgImage}/>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>
                        {tagline}&nbsp;
                        <Text style={styles.subtitleCTA}>
                            {taglineCTA}
                        </Text>
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <StyledButton 
                        type='primary' 
                        content='Custom Order'
                        onPress={() => console.warn("Custom Order pressed")}
                    />
                    <StyledButton 
                        type='secondary' 
                        content='Existing Inventory'
                        onPress={() => console.warn("Existing Inventory pressed")}
                    />
                </View>
            </View>
        )
    }
}

export default CarItem;