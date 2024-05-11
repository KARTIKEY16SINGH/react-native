import { StyleSheet } from "react-native";

export const DetailPageStyle = StyleSheet.create(
    {
        mainView: {
            justifyContent: "center",
            marginHorizontal: 20,
            flex: 1
        },
        mainLabelStyel: {
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 18,
            marginVertical: 20
        },
        inputStyle: {
            height: 50,
            marginVertical: 10,
            backgroundColor: '#fff',
            fontSize: 15,
            borderWidth: 1,
            borderRadius: 4,
            padding: 10,
        },
        submitNowButtonStyle: {
            backgroundColor: '#dcdcdc',
            borderRadius: 4,
            marginVertical: 10
        },
        willDoItLaterButtonStyle: {
            marginBottom: 30
        },
        emptyViewStyle: {
            flex: 1
        }
    }
)