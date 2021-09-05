import { StyleSheet } from 'react-native'
import constants from './constants'

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 350,
        backgroundColor: 'white',
        borderRadius: 50
    },
    ratingContainer: {
        position: 'absolute',
        backgroundColor: constants.ratingBgColor,
        bottom: 0,
        right: 0,
        width: 40,
        height: 50
    }
})

export default styles