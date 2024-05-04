import React, { useEffect, useState } from "react";
import { StreamManager } from "../../Global/Stream/StreamManager";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";
import { UserListItem } from "../../Views/UserListItem/UserListItem";
import UserView from "../../Views/UserView/UserView";
import { UserInfoRepository } from "../../Global/FirebaseRepos/UserInfoRepository";
import { NavigationProp } from "@react-navigation/native";
import { NavigationConstant } from "../../Global/NavigationConstants";

interface RouterProps {
	navigation: NavigationProp<any, any>;
}

export const UsersPage = (routerProps: RouterProps) => {
	const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUsers = async () => {
        UserInfoRepository.shared.fetchAllUsers().then((response) => {
            console.log("UserPage fetchUsers fetachAllUsers promise response =",response)
            setUsers(response)
            setIsLoading(false)
        })
    };

	useEffect(() => {
        setIsLoading(true)
		fetchUsers();
	}, []);

    const onUserClick = (userInfoData) => {
        console.log(
			"UsersPage onUserClick requestData =",
			userInfoData
		);
		routerProps.navigation.navigate(
			NavigationConstant.adminUserPage.name,
			userInfoData
		);
    }

	return (
		<SafeAreaView style={styles.container}>
			<FlatList onRefresh={fetchUsers} refreshing={isLoading}
				data={users}
				renderItem={({ item }) => <UserView userData={item.data} onUserClick={ () => onUserClick(item)} style={styles.userView} textStyle={styles.userViewText}/>}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    userView: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white'
    },
    userViewText: {
        fontSize: 25
    }
})