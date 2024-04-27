import RazorpayCheckout from "react-native-razorpay";
import React from "react";
import { UserInfoRepository } from "../FirebaseRepos/UserInfoRepository";

const keyId = "rzp_test_OGAp6KfUXxXqgh";
const firmName = "ProphecyByPreeti";

export const OrderIdForConsultation = "order_O28jlyNEtiwUHq";
/*

{
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.jpg',
    currency: 'INR',
    key: '<YOUR_KEY_ID>',
    amount: '5000',
    name: 'Acme Corp',
    order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
    prefill: {
      email: 'gaurav.kumar@example.com',
      contact: '9191919191',
      name: 'Gaurav Kumar'
    },
    theme: {color: '#53a20e'}
}

*/

export class RazorPayManager {
	static shared = new RazorPayManager()
	constructor() {}

	initiatePayment(options, successCallback, failureCallback) {
		options = {
			...options,
			key: keyId,
			currency: "INR",
			name: firmName,
			send_sms_hash: true,
			allow_rotation: false,
		};
		RazorpayCheckout.open(options)
			.then((data) => {
				console.log(`Success: ${data.razorpay_payment_id}`);
				successCallback(data);
			})
			.catch((error) => {
				console.log(`Error: ${error.code} | ${error.description}`);
				failureCallback(error);
			});
	}

	initiatePaymentForOneHourSession(successCallback, failureCallback) {
		this.initiatePayment(
			{
				order_id: "order_O28jlyNEtiwUHq",
				amount: "310000",
				prefill: {
					contact: "+91".concat(UserInfoRepository.shared.currentUserInfo.phoneNumber),
					name: UserInfoRepository.shared.currentUserInfo.name,
				},
			},
			successCallback,
			failureCallback
		);
	}
}
