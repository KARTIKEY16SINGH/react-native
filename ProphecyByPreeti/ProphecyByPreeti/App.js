import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import LoginPage from "./ProphecyByPreeti/Screens/LoginPage/loginPage";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "./ProphecyByPreeti/Configs/FirebaseConfig";
import { NavigationConstant } from "./ProphecyByPreeti/Global/NavigationConstants";
import DetailPage from "./ProphecyByPreeti/Screens/DetailPage/detailPage";
import LandingPage from "./ProphecyByPreeti/Screens/LandingPage/landingPage";
import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { ScheduleCallbackPage } from "./ProphecyByPreeti/Screens/ScheduleCallbackPage/scheduleCallbackPage";
import { StreamChat } from "stream-chat";
import {
	StreamDataManager,
	StreamManager,
} from "./ProphecyByPreeti/Global/Stream/StreamManager";
import { ChatView } from "./ProphecyByPreeti/Views/ChatView/ChatView";
import {
	UserInfoModel,
	UserInfoRepository,
} from "./ProphecyByPreeti/Global/UserInfoRepository";
import { UsersPage } from "./ProphecyByPreeti/Screens/UsersPage/UsersPage";
// import { registerRootComponent } from 'expo';

const NativeStackNavigator = createNativeStackNavigator();

const InsideStackNavigator = createNativeStackNavigator();

const streamClient = StreamManager.shared.streamClient;

function InsideLayout() {
	return (
		<InsideStackNavigator.Navigator
			initialRouteName={NavigationConstant.landingPage.name}
		>
			<InsideStackNavigator.Screen
				name={NavigationConstant.landingPage.name}
				component={LandingPage}
				options={{ headerShown: false }}
			/>
			<InsideStackNavigator.Screen
				name={NavigationConstant.detailPage.name}
				component={DetailPage}
				options={{ headerShown: false }}
			/>
			<InsideStackNavigator.Screen
				name={NavigationConstant.scheduleCallbackPage.name}
				component={ScheduleCallbackPage}
				options={{ headerShown: false }}
			/>
			<InsideStackNavigator.Screen
				name={NavigationConstant.chatWithUsPage.name}
				component={ChatView}
				options={{ headerShown: true }}
			/>
			<InsideStackNavigator.Screen name={NavigationConstant.usersPage.name}
			component={UsersPage} />
		</InsideStackNavigator.Navigator>
	);
}

export let CurrentUser: User = undefined;

export default function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [streamReady, setStreamReady] = useState(false);
	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, (user) => {
			console.log("App useEffect user", user);
			CurrentUser = user;
			UserInfoRepository.shared.getUserInfo(user.uid, (response) => {
				console.log("App userInfoRepository getUserInfo callback function")
				StreamManager.shared.connectUserToStream(response, user);
				setStreamReady(true)
			});
			setCurrentUser(user);
		});
	}, []);

	const connectUserToStream = (response: UserInfoModel) => {
		if (currentUser == null || currentUser == undefined) {
			return;
		}
		console.log("CurrentUser email = ", currentUser.email);
		console.log("CurrentUser uid = ", currentUser.uid);
		console.log("CurrentUser name =", response.name);
		const connectUser = async () => {
			// debugger
			await streamClient.connectUser(
				{
					id: currentUser.uid,
					name: response.name,
				},
				// currentUser.uid
				streamClient.devToken(currentUser.uid)
			);
			// const channel = streamClient.channel("messaging", "preeti", {name: "Preeti"});
			// await channel.create()
		};
		connectUser();
	};

	useEffect(() => {
		return () => streamClient.disconnectUser();
	}, []);

	return (
		<NavigationContainer>
			<NativeStackNavigator.Navigator
				initialRouteName={NavigationConstant.loginPage.name}
			>
				{(currentUser && streamReady) ? (
					<NativeStackNavigator.Screen
						name="Inside"
						component={InsideLayout}
						options={{ headerShown: false }}
					/>
				) : (
					<NativeStackNavigator.Screen
						name={NavigationConstant.loginPage.name}
						component={LoginPage}
						options={{ headerShown: false }}
					/>
				)}
			</NativeStackNavigator.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
