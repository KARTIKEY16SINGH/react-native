import { NavigationProp } from "@react-navigation/native";
import {
	Text,
	Button,
	KeyboardAvoidingView,
	TextInput,
	View,
} from "react-native";
import { NavigationConstant } from "../../Global/NavigationConstants";
import { SafeAreaView } from "react-native-safe-area-context";
import { DetailPageConstants } from "./detailPageConstants";
import { DetailPageStyle } from "./detailPageStyle";

interface RouterProps {
	navigation: NavigationProp<any, any>;
}

const DetailPage = (routerProps: RouterProps) => {
	return (
		<SafeAreaView style={DetailPageStyle.mainView}>
			<KeyboardAvoidingView>
				<Text style={DetailPageStyle.mainLabelStyel}>
					{DetailPageConstants.mainHeadingText}
				</Text>
				<TextInput
					style={DetailPageStyle.inputStyle}
					placeholder={DetailPageConstants.namePlaceholderText}
				></TextInput>
				<TextInput
					style={DetailPageStyle.inputStyle}
					placeholder={DetailPageConstants.birthDatePlaceholderText}
				></TextInput>
				<TextInput
					style={DetailPageStyle.inputStyle}
					placeholder={DetailPageConstants.birthTimePlaceholderText}
				></TextInput>
				<TextInput
					style={DetailPageStyle.inputStyle}
					placeholder={
						DetailPageConstants.placeOfBirthPlaceholderText
					}
				></TextInput>
				<TextInput
					style={DetailPageStyle.inputStyle}
					placeholder={
						DetailPageConstants.phoneNumberPlaceholderText
					}
                    placeholderTextColor={'#00f'}
				></TextInput>
			</KeyboardAvoidingView>
			<View style={DetailPageStyle.emptyViewStyle}></View>
			<View style={DetailPageStyle.submitNowButtonStyle}>
				<Button title={DetailPageConstants.submitNowButtonTitle} />
			</View>
			<View style={DetailPageStyle.willDoItLaterButtonStyle}>
				<Button
					title={DetailPageConstants.willDoItLaterButtonTitle}
					onPress={() =>
                        routerProps.navigation.canGoBack() ?
                        routerProps.navigation.goBack() 
                        :
						routerProps.navigation.navigate(
							NavigationConstant.landingPage.name
						)
					}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DetailPage;
