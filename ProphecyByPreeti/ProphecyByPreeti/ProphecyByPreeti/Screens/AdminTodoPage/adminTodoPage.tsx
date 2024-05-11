import {
	View,
	Text,
	StyleSheet,
	Alert,
	KeyboardAvoidingView,
	TextInput,
	Button,
	FlatList,
	AlertButton,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { serverTimestamp } from "firebase/firestore";
import { TodoRepository } from "../../Global/FirebaseRepos/TodoRepository";
import { NavigationProp } from "@react-navigation/native";
import { NavigationConstant } from "../../Global/NavigationConstants";
import TodoView from "../../Views/TodoView/TodoView";

interface RouterProps {
	navigation: NavigationProp<any, any>;
}

const AdminTodoPage = (routerProps: RouterProps) => {
	console.log("AdminTodoPage routerProps =", routerProps);
	const [todo, setTodo] = useState("");
	const [fetching, setFetching] = useState(false);
	const [fetchedData, setFetchedData] = useState(null);

	const fetchTodos = () => {
		TodoRepository.shared.fetchAllOpenTodo().then((response) => {
			console.log(
				"AdminTodoPage fetchTodos fetchAllOpenTodos promise response =",
				response
			);
			setFetchedData(response);
			setFetching(false);
		});
	};

	useEffect(() => {
		setFetching(true);
		fetchTodos();
	}, []);

	const onTodoPress = () => {
		console.log("AdminTodoPage onTodoPress todo =", todo);
		if (todo == "") {
			return;
		}
		const todoData = {
			todo: todo,
			userId: "",
			isCompleted: false,
			timestamp: serverTimestamp(),
		};
		TodoRepository.shared.createTodo(todoData).then((response) => {
			console.log(
				"AdminTodoPage onTodoPress createTodo promise response =",
				response
			);
			setTodo("");
			Alert.alert("Added todo for this user");
            fetchTodos()
		});
	};

	const onUserClick = (requestData) => {
		console.log(
			"AdminsCallbackRequest onUserClick requestData =",
			requestData
		);
		routerProps.navigation.navigate(
			NavigationConstant.adminUserPage.name,
			requestData
		);
	};

	const onRequestClick = (requestData) => {
		console.log(
			"AdminsCallbackRequest onRequestClick requestData =",
			requestData
		);
		const markAsDoneButton: AlertButton = {
			text: "Mark As Done",
			onPress: () => {
				console.log(
					"AdminsCallbackRequest onRequestClick requestData =",
					requestData
				);
				const updatedData = { ...requestData.data, isCompleted: true };
				console.log(
					"AdminsCallbackRequest onRequestClick updatedData =",
					updatedData
				);
				TodoRepository.shared.updateTodo(requestData.docId, updatedData).then((response) => {
				    console.log("AdminsCallbackRequest onRequestClick updateRequest promise response =",response)
				    fetchTodos()
				})
			},
		};

		const cancelButton: AlertButton = {
			text: "Cancel",
			onPress: () => {},
		};

		Alert.alert("Are you sure", "Is this task completed ?", [
			markAsDoneButton,
			cancelButton,
		]);
	};

	const layoutTodosView = () => {
        console.log("AdminTodoPage layoutTodosView fetchedData =", fetchedData)
		if (fetchedData == null || fetchedData == undefined) {
			return <Text>No todos available right now</Text>;
		}
		return (
			<FlatList
				data={fetchedData}
                onRefresh={fetchTodos}
                refreshing={fetching}
				renderItem={({ item }) => {
					return <TodoView requestData={item} onUserClick={onUserClick} onTodoClick={onRequestClick}/>;
				}}
			/>
		);
	};

	return (
		<SafeAreaView>
			<KeyboardAvoidingView>
				<TextInput
					style={style.todoInput}
					placeholder="Add Todo for this user"
					defaultValue={todo}
					onChangeText={setTodo}
					multiline={true}
				/>
				<Button title="Add Todo" onPress={onTodoPress} />
			</KeyboardAvoidingView>
			{fetching ? (
				<ActivityIndicator size={"large"} />
			) : (
				layoutTodosView()
			)}
		</SafeAreaView>
	);
};

export default AdminTodoPage;

const style = StyleSheet.create({
	mainView: {},
	todoInput: {
		margin: 10,
		padding: 10,
		backgroundColor: "white",
		fontSize: 17,
	},
	todoListView: {},
});
