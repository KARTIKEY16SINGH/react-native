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
					RazorPayManager.initiatePayment(
						{
							order_id: "order_O28jlyNEtiwUHq",
							amount: "310000",
							prefill: {
								email: "gaurav.kumar@example.com",
								contact: "9191919191",
								name: "Gaurav Kumar",
							},
						},
						null,
						null
					);
				}}
			/>
		</SafeAreaView>
	);
};
