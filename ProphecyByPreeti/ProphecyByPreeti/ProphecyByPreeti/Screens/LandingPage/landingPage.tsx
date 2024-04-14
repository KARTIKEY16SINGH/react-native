import { NavigationProp } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { FirebaseAuth } from "../../Configs/FirebaseConfig";
import { NavigationConstant } from "../../Global/NavigationConstants";
import { useEffect, useState } from "react";
import { CurrentUser } from "../../../App";
import { UserInfoRepository } from "../../Global/UserInfoRepository";

interface RouterProps {
	navigation: NavigationProp<any, any>;
}

const LandingPage = (routerProps: RouterProps) => {
	const [showDetail, setShowDetail] = useState(false);

	useEffect(() => {
		console.log("Inside Use Effect");
		if (CurrentUser) {
			const uid = CurrentUser.uid;
			UserInfoRepository.shared.getUserInfo(uid, (response) => {
                console.log("Landing Page Completion Handler")
				if (response) {
					setShowDetail(false);
				} else {
					setShowDetail(true);
				}
			});
		}
	}, [CurrentUser]);

    if (showDetail == true) {
        routerProps.navigation.navigate(NavigationConstant.detailPage.name)
    }

	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Button
				onPress={() =>
					routerProps.navigation.navigate(
						NavigationConstant.detailPage.name
					)
				}
				title="Open Details"
			/>
			<Button onPress={() => FirebaseAuth.signOut()} title="Logout" />
		</View>
	);
};

export default LandingPage;
