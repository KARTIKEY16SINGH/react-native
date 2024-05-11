import { View, Text, ActivityIndicator, FlatList, AlertButton, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { RequestCallbackRepository } from "../../Global/FirebaseRepos/RequestCallbackRepository";
import { SafeAreaView } from "react-native-safe-area-context";
import RequestView from "../../Views/RequestView/RequestView";
import { NavigationProp } from "@react-navigation/native";
import { NavigationConstant } from "../../Global/NavigationConstants";

interface RouterProps {
	navigation: NavigationProp<any, any>;
}

const AdminsCallbackRequest = (routerProps: RouterProps) => {
	const [requests, setRequest] = useState([]);
	const [fetching, setFetching] = useState(true);

    const fetchRequests = () => {
        setFetching(true);
		RequestCallbackRepository.shared.fetchAllRequest().then((response) => {
			console.log(
				"AdminCallbackRequest fetchAllRequest response =",
				response
			);
			if (response == null || response == undefined) {
				setRequest([]);
			} else {
				setRequest(response);
			}
			setFetching(false);
		});
    }

	useEffect(() => {
        fetchRequests()
	}, []);

    const onUserClick = (requestData) => {
        console.log("AdminsCallbackRequest onUserClick requestData =",requestData)
        routerProps.navigation.navigate(NavigationConstant.adminUserPage.name, requestData)
    }

    const onRequestClick = (requestData) => {
        console.log("AdminsCallbackRequest onRequestClick requestData =",requestData)
        const markAsDoneButton: AlertButton = {
            text: "Mark As Done",
            onPress: () => {
                console.log("AdminsCallbackRequest onRequestClick requestData =",requestData)
                const updatedData = {...requestData.data, isBooked: true}
                console.log("AdminsCallbackRequest onRequestClick updatedData =",updatedData)
                RequestCallbackRepository.shared.updateRequest(requestData.userId, updatedData).then((response) => {
                    console.log("AdminsCallbackRequest onRequestClick updateRequest promise response =",response)
                    fetchRequests()
                })
            }
        }

        const cancelButton: AlertButton = {
            text: "Cancel",
            onPress: () => {}
        }

        Alert.alert("Are you sure", "Is this request completed ?", [markAsDoneButton, cancelButton])
    }

	const layoutRequest = () => {
		console.log("AdminCallbackRequest layoutRequest requests =", requests);
		if (requests.length > 0) {
			return (
				<FlatList
					data={requests}
					renderItem={({ item }) => {
						return <RequestView requestData={item} onRequestClick={onRequestClick} onUserClick={onUserClick}/>;
					}}
				/>
			);
		}
		return <Text>No Request Available Currently</Text>;
	};

	return (
		<SafeAreaView>
			{fetching ? <ActivityIndicator size={"large"} /> : layoutRequest()}
		</SafeAreaView>
	);
};

export default AdminsCallbackRequest;
