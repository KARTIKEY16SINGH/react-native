import { StyleSheet } from "react-native";

export const RequestViewStyle = StyleSheet.create({
    mainView: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'flex-start',
        // paddingVertical: 10
        marginVertical: 10
    },
    decriptionTextView: {
        // backgroundColor: 'red'
        marginBottom: 20
    },
    userView: {
        // backgroundColor: 'red'
    },
    descriptionText: {
        fontSize: 22
    },
    userViewText: {
        fontSize: 17,
        color: 'blue'
    },
    separatorView: {
        height: 2,
        backgroundColor: 'gray',
        marginBottom: 10
    }
})