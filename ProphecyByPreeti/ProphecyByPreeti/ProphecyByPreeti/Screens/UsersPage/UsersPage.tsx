import React, { useEffect, useState } from "react";
import { StreamManager } from "../../Global/Stream/StreamManager";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";
import { UserListItem } from "../../Views/UserListItem/UserListItem";

export const UsersPage = () => {
	const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

	const client = StreamManager.shared.streamClient;

    const fetchUsers = async () => {
        const response = await client.queryUsers({});
        console.log("UserPage useEffect fetchUser response =", response);
        setUsers(response.users);
        setIsLoading(false)
    };

	useEffect(() => {
        setIsLoading(true)
		fetchUsers();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList onRefresh={fetchUsers} refreshing={isLoading}
				data={users}
				renderItem={({ item }) => <UserListItem user={item}/>}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    title: {

    },
    separator: {

    }
})