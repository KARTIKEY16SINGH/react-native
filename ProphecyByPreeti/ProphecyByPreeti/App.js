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

const NativeStackNavigator = createNativeStackNavigator();

const InsideStackNavigator = createNativeStackNavigator();

function insideLayout() {
	return (
		<InsideStackNavigator.Navigator>
			<InsideStackNavigator.Screen
				name={NavigationConstant.detailPage.name}
				component={DetailPage}
			/>
			<InsideStackNavigator.Screen
				name={NavigationConstant.landingPage.name}
				component={LandingPage}
			/>
		</InsideStackNavigator.Navigator>
	);
}

export default function App() {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, (user) => {
			console.log("user", user);
			setCurrentUser(user);
		});
	}, []);

	return (
		<NavigationContainer>
			<NativeStackNavigator.Navigator
				initialRouteName={NavigationConstant.loginPage.name}
			>
				{currentUser ? (
					<NativeStackNavigator.Screen
						name="Inside"
						component={insideLayout}
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
