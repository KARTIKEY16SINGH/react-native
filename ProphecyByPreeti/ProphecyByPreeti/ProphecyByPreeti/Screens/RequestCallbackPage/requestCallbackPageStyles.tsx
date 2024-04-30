import { StyleSheet } from "react-native";

export const RequestCallbackPageStyle = StyleSheet.create({
    container: {
        justifyContent: "center",
        marginHorizontal: 20,
        flex: 1
    },
    requestViewContainer: {
        // justifyContent: "center",
        // marginHorizontal: 20,
        flex: 1
    },
    requestView: {
        // flex: 1,
        padding: 20,
        borderRadius: 8,
        backgroundColor: 'gray',
        margin: 10
    },
    text: {
        fontSize: 25,
    },
    gap: {
        flex: 1
    },
    deletRequestButtonView: {
        // flex: 1
    },
    updateButtonView: {
        marginBottom: 20
        // flex: 1
    },
    inputTextField: {
        borderRadius: 8,
        fontSize: 25,
        backgroundColor: 'white',
        padding: 10
    }
})