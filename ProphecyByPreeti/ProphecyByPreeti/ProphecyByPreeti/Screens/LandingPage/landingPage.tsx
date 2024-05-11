import { NavigationProp } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { FirebaseAuth } from "../../Configs/FirebaseConfig";
import { NavigationConstant } from "../../Global/NavigationConstants";
import { useEffect, useState } from "react";
import { CurrentUser } from "../../../App";
import { UserInfoRepository } from "../../Global/FirebaseRepos/UserInfoRepository";

interface RouterProps {
	navigation: NavigationProp<any, any>;
}

const LandingPage = (routerProps: RouterProps) => {
	const [showDetail, setShowDetail] = useState(false);

	useEffect(() => {
		console.log("LandingPage Inside Use Effect");
		if (CurrentUser) {
			const userInfo = UserInfoRepository.shared.currentUserInfo;
			console.log("Landing Page UserInfo =", userInfo);
			if (userInfo == null || userInfo == undefined) {
				const uid = CurrentUser.uid;
				const callbackfn = (response) => {
					console.log(
						"Landing Page Completion Handler response =",
						response
					);
					if (response != null && response != undefined) {
						setShowDetail(false);
					} else {
						setShowDetail(true);
					}
				}
				UserInfoRepository.shared.getUserInfo(uid, callbackfn);
			}
		}
	}, []);

	if (showDetail == true) {
		routerProps.navigation.navigate(NavigationConstant.detailPage.name);
	}

	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Button
				onPress={() =>
					routerProps.navigation.navigate(
						NavigationConstant.detailPage.name
					)
				}
				title="Update Details"
			/>

			<Button
				title="Schedule a call"
				onPress={() =>
					routerProps.navigation.navigate(
						NavigationConstant.scheduleCallbackPage.name
					)
				}
			/>
			<Button
				title="Request callback"
				onPress={() => {
					routerProps.navigation.navigate(
						NavigationConstant.requestCallbackPage.name
					);
				}}
			/>
			<Button
				title="Chat With Us"
				onPress={() =>
					routerProps.navigation.navigate(
						NavigationConstant.chatWithUsPage.name
					)
				}
			/>

			<Button
				onPress={() =>
					routerProps.navigation.navigate(
						NavigationConstant.usersPage.name
					)
				}
				title="Users Page"
			/>

			<Button onPress={() => FirebaseAuth.signOut()} title="Logout" />
		</View>
	);
};

export default LandingPage;
