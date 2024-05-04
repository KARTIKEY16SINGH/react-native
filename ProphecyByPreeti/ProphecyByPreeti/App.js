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
} from "./ProphecyByPreeti/Global/FirebaseRepos/UserInfoRepository";
import { UsersPage } from "./ProphecyByPreeti/Screens/UsersPage/UsersPage";
import { RequestCallbackPage } from "./ProphecyByPreeti/Screens/RequestCallbackPage/requestCallbackPage";
import AdminLandinPage from "./ProphecyByPreeti/Screens/AdminLandingPage/adminLandinPage";
import AdminChatPage from "./ProphecyByPreeti/Screens/AdminChatPage/adminChatPage";
import ChannelScreen from "./ProphecyByPreeti/Screens/ChannelScreen/channelScreen";
import AdminSchedulePage from "./ProphecyByPreeti/Screens/AdminSchedulePage/adminSchedulePage";
import AdminsCallbackRequest from "./ProphecyByPreeti/Screens/AdminsCallbackRequest/adminsCallbackRequest";
import AdminUserPage from "./ProphecyByPreeti/Screens/AdminUserPage/AdminUserPage";
import ChatPage from "./ProphecyByPreeti/Screens/ChatPage/ChatPage";
// import { registerRootComponent } from 'expo';

const NativeStackNavigator = createNativeStackNavigator();

const InsideStackNavigator = createNativeStackNavigator();

const AdminStackNavigator = createNativeStackNavigator();

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
				options={{ headerShown: true }}
			/>
			<InsideStackNavigator.Screen
				name={NavigationConstant.chatWithUsPage.name}
				component={ChatView}
				options={{ headerShown: true }}
			/>
			<InsideStackNavigator.Screen
				name={NavigationConstant.usersPage.name}
				component={UsersPage}
			/>
			<InsideStackNavigator.Screen
				name={NavigationConstant.requestCallbackPage.name}
				component={RequestCallbackPage}
			/>
		</InsideStackNavigator.Navigator>
	);
}

function AdminLayout() {
	return (
		<AdminStackNavigator.Navigator
			initialRouteName={NavigationConstant.landingPage.name}
		>
			<AdminStackNavigator.Screen name={NavigationConstant.landingPage.name} component={AdminLandinPage} options={{headerShown: false}} />
			<AdminStackNavigator.Screen name={NavigationConstant.adminChatPage.name} component={AdminChatPage} />
			<AdminStackNavigator.Screen name={NavigationConstant.chatScreenPage.name} component={ChannelScreen} />
			<AdminStackNavigator.Screen name={NavigationConstant.scheduleMaganagePage.name} component={AdminSchedulePage} />
			<AdminStackNavigator.Screen name={NavigationConstant.adminsCallbackRequest.name} component={AdminsCallbackRequest} />
			<AdminStackNavigator.Screen name={NavigationConstant.adminUserPage.name} component={AdminUserPage} />
			<AdminStackNavigator.Screen name={NavigationConstant.chatPage.name} component={ChatPage} />
		</AdminStackNavigator.Navigator>
	);
}

const adminUid = "48N0IfNp74PPwG5TimOr3xdt2ZL2";

export let CurrentUser: User = undefined;
export let IsAdmin = false;

export default function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [streamReady, setStreamReady] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, (user) => {
			console.log("App useEffect user", user);
			CurrentUser = user;
			setIsAdmin(false);
			if (
				user != null &&
				user != undefined &&
				user.uid != null &&
				user.uid != undefined
			) {
				UserInfoRepository.shared.getUserInfo(user.uid, null);
				if (user.uid == adminUid) {
					console.log("App js onAuthStateChanged yay admin logedin");
					IsAdmin = true;
					setIsAdmin(true);
				}
			}
			if (user == null || user == undefined) {
				UserInfoRepository.shared.currentUserInfo = null;
			}
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

	const layoutAfterLoginStack = () => {
		console.log("App Js layoutAfetLoginStack isAdmin =", isAdmin)
		if (isAdmin == true) {
			return (
				<NativeStackNavigator.Screen
					name="Admin"
					component={AdminLayout}
					options={{ headerShown: false }}
				/>
			);
		}
		return (
			<NativeStackNavigator.Screen
				name="Inside"
				component={InsideLayout}
				options={{ headerShown: false }}
			/>
		);
	};

	return (
		<NavigationContainer>
			<NativeStackNavigator.Navigator
				initialRouteName={NavigationConstant.loginPage.name}
			>
				{currentUser ? (
					layoutAfterLoginStack()
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
