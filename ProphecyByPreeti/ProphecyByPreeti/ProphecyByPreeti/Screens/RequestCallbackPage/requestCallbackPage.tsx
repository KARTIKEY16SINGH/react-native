import React, { useEffect, useState } from "react";
import { SafeAreaView, Button, TextInput, View, Alert } from "react-native";
import { RequestCallbackRepository } from "../../Global/FirebaseRepos/RequestCallbackRepository";
import { UserInfoRepository } from "../../Global/FirebaseRepos/UserInfoRepository";
import { CurrentUser } from "../../../App";
import { RequestCallbackPageStyle } from "./requestCallbackPageStyles";

const style = RequestCallbackPageStyle;

export const RequestCallbackPage = () => {
	const [fetchingRequests, setFetchingRequests] = useState(true);
	const [request, setRequest] = useState(null);
	const [isRequestEditable, setIsRequestEditable] = useState(false);

	useEffect(() => {
		RequestCallbackRepository.shared
			.fetchRequestFor(CurrentUser.uid)
			.then((response) => {
				if (response == null || response == undefined) {
					setRequest(null);
					return;
				}
				setFetchingRequests(false);
				setRequest(response);
			});
	}, []);

	const onDeleteRequest = () => {
		RequestCallbackRepository.shared
			.deleteRequest(CurrentUser.uid)
			.then((response) => {
				setRequest(null);
				setIsRequestEditable(false);
				setFetchingRequests(true);
			});
	};

	const onUpdateRequest = () => {
		if (isRequestEditable == true) {
			RequestCallbackRepository.shared
				.updateRequest(CurrentUser.uid, request)
				.then((response) => {
					console.log(
						"RequestCallbackPage onSubmit response =",
						response
					);
					setFetchingRequests(false);
				});
		}
		setIsRequestEditable(!isRequestEditable);
	};

	const onDescChange = (updatedText: string) => {
		console.log(
			"RequestCallbackPage onDescChange updatedText =",
			updatedText
		);
		const updatedRequest = { desc: updatedText, isBooked: false };
		setRequest(updatedRequest);
		console.log(
			"RequestCallbackPage onDescChange updatedRequest =",
			updatedRequest
		);
	};

	const onSubmit = () => {
		if (request == null || request == undefined) {
			Alert.alert("Invalid request. Please Enter some text");
			return;
		}
		RequestCallbackRepository.shared
			.createRequest(CurrentUser.uid, request)
			.then((response) => {
				console.log(
					"RequestCallbackPage onSubmit response =",
					response
				);
				setFetchingRequests(false);
			});
	};

	return (
		<SafeAreaView style={style.container}>
			{request != null && request != undefined && !fetchingRequests ? (
				<View style={style.requestViewContainer}>
					<View
						style={{
							...style.requestView,
							backgroundColor: isRequestEditable
								? "white"
								: "gray",
						}}
					>
						<TextInput
							defaultValue={request.desc}
							style={style.text}
							editable={isRequestEditable}
							multiline={true}
							onChangeText={onDescChange}
						/>
					</View>
					<View style={style.gap}></View>
					<View style={style.deletRequestButtonView}>
						<Button
							onPress={onDeleteRequest}
							title="Delete Request"
						/>
					</View>
					<View style={style.updateButtonView}>
						<Button
							onPress={onUpdateRequest}
							title={
								isRequestEditable ? "Submit" : "Update Request"
							}
						/>
					</View>
				</View>
			) : (
				<View>
					<TextInput
						placeholder="Please Enter your request"
						style={style.inputTextField}
						editable={true}
						multiline={true}
						onChangeText={onDescChange}
					/>
					<Button title="Submit" onPress={onSubmit} />
				</View>
			)}
		</SafeAreaView>
	);
};
