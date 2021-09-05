import { StyleSheet } from 'react-native'
import constants from './constants'

const styles = StyleSheet.create({
    container: {
        top: '30%',
        width: constants.mainWidth,
        height: constants.mainHeight,
        backgroundColor: 'white',
        borderRadius: constants.mainBorderRadius
    },
    poster: {
        width: '100%',
        height: '100%',
        borderRadius: constants.mainBorderRadius,
        resizeMode: 'stretch'
    },
    ratingContainer: {
        position: 'absolute',
        backgroundColor: constants.ratingBgColor,
        bottom: 0,
        right: 0,
        width: constants.ratingContWidth,
        height: constants.ratingContHeight,
        borderBottomRightRadius: constants.mainBorderRadius,
        borderTopLeftRadius: constants.ratingCardBTopLeftorderRadius,
        alignItems: 'center',
        justifyContent: 'center'
    },
    starIcon: {
        top: 5,
        flex: 0.35,
        width: '100%',
        resizeMode: 'contain'
    },
    ratingText: {
        marginTop: '15%',
        fontWeight: 'bold',
        fontSize: 15
    }
})

export default styles