import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { StreamManager } from "../../Global/Stream/StreamManager";

export const UserListItem = ({ user }) => {
	console.log("UserListItem current user name =", user.name);
	if (user.name == null || user.name == undefined || user.name == "") {
		return;
	}

    const client = StreamManager.shared.streamClient

    const onPress = async () => {
        const channel = client.channel("messaging", {members: [user.id, "shivasingh"]})
        await channel.watch()
    }

	return (
		<Pressable style={styles.root} onPress={onPress}>
			<Text style={styles.text}>{user.name}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	root: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
		padding: 10,
		backgroundColor: "#F8F7F1",
	},
	text: {
		margin: 10,
		fontSize: 25,
	},
});
