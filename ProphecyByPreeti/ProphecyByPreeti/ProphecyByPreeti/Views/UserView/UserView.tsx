import {
	View,
	Text,
	TouchableOpacity,
	Pressable,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	UserInfoModel,
	UserInfoRepository,
} from "../../Global/FirebaseRepos/UserInfoRepository";

const UserView = ({ userId, onUserClick, style, textStyle }) => {
	const [fetching, setFetching] = useState(true);
	const [userInfo, setUserInfo] = useState<UserInfoModel | null>(null);

	useEffect(() => {
		setFetching(true);
		if (userId == null || userId == undefined) {
			setFetching(false);
			setUserInfo(null);
			return;
		}
		if (userId == "") {
			setFetching(false);
			setUserInfo("");
			return;
		}
		UserInfoRepository.shared.getCloudUserInfo(userId).then((response) => {
			console.log(
				"UserView getCloudUserInfo promise response =",
				response
			);
			setUserInfo(response);
			setFetching(false);
		});
	}, []);

	const laytoutUserView = () => {
		if (userInfo == null || userInfo == undefined) {
			return <Text>Not able to fetch user info</Text>;
		}
		if (userId != "") {
			return (
				<Pressable onPress={onUserClick}>
					<Text style={textStyle}>{userInfo.name}</Text>
				</Pressable>
			);
		}
	};

	return (
		<View style={style}>
			{fetching ? (
				<ActivityIndicator size={"large"} />
			) : (
				laytoutUserView()
			)}
		</View>
	);
};

export default UserView;
