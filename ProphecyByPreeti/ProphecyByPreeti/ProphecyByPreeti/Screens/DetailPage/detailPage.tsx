import { NavigationProp } from "@react-navigation/native";
import {
	Text,
	Button,
	KeyboardAvoidingView,
	TextInput,
	View,
	ActivityIndicator,
} from "react-native";
import { NavigationConstant } from "../../Global/NavigationConstants";
import { SafeAreaView } from "react-native-safe-area-context";
import { DetailPageConstants } from "./detailPageConstants";
import { DetailPageStyle } from "./detailPageStyle";
import { useEffect, useState } from "react";
import {
	UserInfoModel,
	UserInfoRepository,
    userInfoConverter,
} from "../../Global/UserInfoRepository";
import { CurrentUser } from "../../../App";

interface RouterProps {
	navigation: NavigationProp<any, any>;
}

const DetailPage = (routerProps: RouterProps) => {
	const [name, setName] = useState(null);
	const [phone, setPhone] = useState(null);
	const [dob, setDob] = useState(null);
	const [pob, setPob] = useState(null);
	const [tob, setTob] = useState(null);
	const [isLoading, setLoading] = useState(true);

	const submitUserDetails = () => {
        console.log("Click Submit now button")
		const uid = CurrentUser.uid;
		const userData = new UserInfoModel(name, phone, dob, tob, pob, null);
        console.log("Current User Data = ", userData)
		UserInfoRepository.shared.createUser(userInfoConverter.toFirestore(userData), uid, () => {
			routerProps.navigation.goBack();
		});
	};

	useEffect(() => {
		const uid = CurrentUser.uid;
		UserInfoRepository.shared
			.getUserInfo(uid, (response) => {
				console.log("Detail Page useEffect completion handler response = ", response);
				if (response) {
					setName(response.name);
					setPhone(response.phoneNumber);
					setDob(response.dob);
					setPob(response.pob);
					setTob(response.tob);
				}
				setLoading(false);
			})
	}, [CurrentUser]);

	return isLoading ? (
		<ActivityIndicator size="large" />
	) : (
		<SafeAreaView style={DetailPageStyle.mainView}>
			<KeyboardAvoidingView>
				<Text style={DetailPageStyle.mainLabelStyel}>
					{DetailPageConstants.mainHeadingText}
				</Text>
				<TextInput
					defaultValue={name}
					style={DetailPageStyle.inputStyle}
					placeholder={DetailPageConstants.namePlaceholderText}
					onChangeText={setName}
				></TextInput>
				<TextInput
					defaultValue={dob}
					style={DetailPageStyle.inputStyle}
					placeholder={DetailPageConstants.birthDatePlaceholderText}
					onChangeText={setDob}
				></TextInput>
				<TextInput
					defaultValue={tob}
					style={DetailPageStyle.inputStyle}
					placeholder={DetailPageConstants.birthTimePlaceholderText}
					onChangeText={setTob}
				></TextInput>
				<TextInput
					defaultValue={pob}
					style={DetailPageStyle.inputStyle}
					placeholder={
						DetailPageConstants.placeOfBirthPlaceholderText
					}
					onChangeText={setPob}
				></TextInput>
				<TextInput
					defaultValue={phone}
					style={DetailPageStyle.inputStyle}
					placeholder={DetailPageConstants.phoneNumberPlaceholderText}
					placeholderTextColor={"#00f"}
					onChangeText={setPhone}
				>
				</TextInput>
			</KeyboardAvoidingView>
			<View style={DetailPageStyle.emptyViewStyle}></View>
			<View style={DetailPageStyle.submitNowButtonStyle}>
				<Button
					title={DetailPageConstants.submitNowButtonTitle}
					onPress={submitUserDetails}
				/>
			</View>
			<View style={DetailPageStyle.willDoItLaterButtonStyle}>
				<Button
					title={DetailPageConstants.willDoItLaterButtonTitle}
					onPress={() =>
						routerProps.navigation.canGoBack()
							? routerProps.navigation.goBack()
							: routerProps.navigation.navigate(
									NavigationConstant.landingPage.name
							  )
					}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DetailPage;
