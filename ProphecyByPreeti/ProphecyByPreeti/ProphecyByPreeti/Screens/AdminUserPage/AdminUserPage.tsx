import { View, Text, ActivityIndicator, Button, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import {
	UserInfoModel,
	UserInfoRepository,
} from "../../Global/FirebaseRepos/UserInfoRepository";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationConstant } from "../../Global/NavigationConstants";

interface RouterProps {
	navigation: NavigationProp<any, any>;
	userId: string;
}

const AdminUserPage = (routerProps: RouterProps) => {
	console.log("AdminUserPage routerProps =", routerProps);
    const {userId} = routerProps.route.params
	const [fetching, setFetching] = useState(true);
	const [userInfo, setUserInfo] = useState<UserInfoModel | null>(null);
    const [todo, setTodo] = useState("")

	useEffect(() => {
		setFetching(true);
		UserInfoRepository.shared
			.getCloudUserInfo(userId)
			.then((response) => {
				console.log(
					"UserView getCloudUserInfo promise response =",
					response
				);
				setUserInfo(response);
				setFetching(false);
			});
	}, []);

    const onChatPress = () => {
        console.log("AdminUserPage onChatPress")
        routerProps.navigation.navigate(NavigationConstant.chatPage.name, userId)
    }

    const onTodoPress = () => {
        console.log("AdminUserPage onTodoPress todo =",todo)
        if(todo == "") {
            return
        }
        
    }

	const layoutDetailsView = () => {
		if (userInfo == null || userInfo == undefined) {
			return <Text>User Details Not Present</Text>;
		}
		return (
			<View style={style.detailsContentView}>
				<View style={style.textContainerView}>
					<Text style={style.defaultTexts}>{userInfo.name}</Text>
					<Text style={style.defaultTexts}>{userInfo.phoneNumber}</Text>
					<Text style={style.defaultTexts}>{userInfo.dob}</Text>
					<Text style={style.defaultTexts}>{userInfo.pob}</Text>
					<Text style={style.defaultTexts}>{userInfo.tob}</Text>
				</View>
                <View style={style.spacerView}/>
                <KeyboardAvoidingView>
                <TextInput style={style.todoInput} placeholder="Add Todo for this user" defaultValue={todo} onChangeText={setTodo} multiline={true}/>
                <Button title="Add Todo" onPress={onTodoPress} />
                <Button title="Chat" onPress={onChatPress} />
                </KeyboardAvoidingView>
			</View>
		);
	};

	return (
		<SafeAreaView style={style.mainView}>
			{fetching ? (
				<ActivityIndicator size={"large"} />
			) : (
				layoutDetailsView()
			)}
		</SafeAreaView>
	);
};

export default AdminUserPage;

const style = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center'
    },
    detailsContentView: {
        flex: 1
    },
    textContainerView: {

    },
    defaultTexts: {
        margin: 10,
        padding: 10,
        fontSize: 20,
        textAlign: 'center'
    },
    spacerView: {
        flex: 1
    },
    todoInput: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        fontSize: 17
    }
})