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
import { StreamDataManager } from "./ProphecyByPreeti/Global/Stream/StreamManager";
import { ChatView } from "./ProphecyByPreeti/Views/ChatView/ChatView";
// import { registerRootComponent } from 'expo';

const NativeStackNavigator = createNativeStackNavigator();

const InsideStackNavigator = createNativeStackNavigator();

const streamClient = StreamChat.getInstance(StreamDataManager.apiKey);

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
				options={{ headerShown: false }}
			/>
		</InsideStackNavigator.Navigator>
	);
}

export let CurrentUser: User = undefined;

export default function App() {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, (user) => {
			console.log("user", user);
			setCurrentUser(user);
			CurrentUser = user;
		});
	}, []);

	useEffect(() => {
		const connectUser = async () => {
			await streamClient.connectUser(
				{
					id: "kartikey",
					name: "Kartikey Singh",
				},
				streamClient.devToken("kartikey")
			);
			// const channel = streamClient.channel("messaging", "preeti", {name: "Preeti"});
			// await channel.create()
		};
		connectUser();

		return () => streamClient.disconnectUser();
	}, []);

	return (
		<NavigationContainer>
			<NativeStackNavigator.Navigator
				initialRouteName={NavigationConstant.loginPage.name}
			>
				{currentUser ? (
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
