import {
	View,
	TextInput,
	ActivityIndicator,
	Button,
	KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { FirebaseAuth } from "../../Configs/FirebaseConfig";
import { loginPageViewStyle } from "./loginPageStyles";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	setPersistence,
	inMemoryPersistence,
} from "firebase/auth";
import { LoginPageConstants } from "./loginPageConstants";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const firebaseAuth = FirebaseAuth;

	const startSignIn = async () => {
		setLoading(true);
		try {
			const response = await signInWithEmailAndPassword(
				firebaseAuth,
				email,
				password
			);
			console.log("LoginPage startSignIn response =",response);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const startSignUp = async () => {
		setLoading(true);
		try {
			const response = await createUserWithEmailAndPassword(
				firebaseAuth,
				email,
				password
			);
			console.log("LoginPage startSignUp response =",response);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={loginPageViewStyle.container}>
			<KeyboardAvoidingView behavior="padding">
				<TextInput
					autoCapitalize="none"
					style={loginPageViewStyle.input}
					placeholder={LoginPageConstants.enterNumberLabel}
					onChangeText={setEmail}
				></TextInput>
				<TextInput
					secureTextEntry={true}
					style={loginPageViewStyle.input}
					placeholder={LoginPageConstants.enterPasswordLabel}
					onChangeText={setPassword}
				></TextInput>

				{loading ? (
					<ActivityIndicator size="large" />
				) : (
					<>
						<Button
							title={LoginPageConstants.loginButtonLabel}
							onPress={startSignIn}
						/>
						<Button
							title={LoginPageConstants.createAccountLabel}
							onPress={startSignUp}
						/>
					</>
				)}
			</KeyboardAvoidingView>
		</View>
	);
};

export default LoginPage;
