import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, {useState}from "react";
import { RazorPayManager } from "../../Global/RazorPay/RazorPayManager";

const SlotView = ({ item, callback, paymentSuccess }) => {
    const [isBooked, setIsBooked] = useState(item.isBooked);

    const successCallback = () => {
        console.log("SlotView successCallback")
        Alert.alert("Payment Successfull")
        setIsBooked(!isBooked)
        console.log("SlotView successCallback item =", item)
        item.isBooked = !isBooked
        console.log("SlotView successCallback updated item =", item)
        paymentSuccess(item)
    }
    const failureCallback = () => {
        console.log("SlotView failureCallback")
        Alert.alert("Payment failed please retry")
    }
	return (
		<View style={isBooked ? styles.selectContainer : styles.container} >
			<TouchableOpacity onPress={() => {
                if (isBooked) {
                    return
                }
                callback(item)
                RazorPayManager.shared.initiatePaymentForOneHourSession(successCallback, failureCallback)
            }}>
				<Text style={styles.text}>{item.time}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SlotView;

const styles = StyleSheet.create({
	container: {
		margin: 10,
		borderRadius: 10,
		backgroundColor: "gray",
        justifyContent: 'center'
	},
    selectContainer: {
		margin: 10,
		borderRadius: 10,
		backgroundColor: "lightblue",
        justifyContent: 'center'
    },
	text: {
		fontSize: 40,
        alignSelf: 'center'
	},
});