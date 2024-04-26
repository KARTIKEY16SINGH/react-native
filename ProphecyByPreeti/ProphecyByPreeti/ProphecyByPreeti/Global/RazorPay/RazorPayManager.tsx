import RazorpayCheckout from "react-native-razorpay";
import React from "react";

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

export const RazorPayManager = {
	initiatePayment: (options, successCallback, failureCallback) => {
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
	},
};
