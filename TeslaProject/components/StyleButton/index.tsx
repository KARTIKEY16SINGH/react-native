import styles from './styles'
import React from 'react'
import {View, Pressable, Text} from 'react-native'

class StyledButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {type, content, onPress} = this.props
        const backgroundColor = type === 'primary' ? '#171A20CC' : '#FFFFFFA6'
        const textColor = type === 'primary' ? '#FFFFFF' : '#171A20'

        return (
            <View style={styles.container}>
                <Pressable
                    style={[styles.button, {backgroundColor: backgroundColor}]}
                    onPress={onPress}
                >
                    <Text style={[styles.text, {color: textColor}]}>{content}</Text>
                </Pressable>
            </View>
        )
    }
}

export default StyledButton;