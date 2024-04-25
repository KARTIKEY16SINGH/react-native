import React from "react";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RazorPayManager } from "../../Global/RazorPay/RazorPayManager";

export const MakePayementView = () => {
	return (
		<SafeAreaView>
			<Button
				title="Make Payment"
				onPress={() => {
					RazorPayManager.initiatePayment(null, null, null);
				}}
			/>
		</SafeAreaView>
	);
};
