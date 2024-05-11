import React, { useEffect, useState } from "react";
import { CalendarList, DateData } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScheduleCallbackPageStyle } from "./scheduleCallbackPageStyles";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { MakePayementView } from "../../Views/MakePayment/MakePayment";
import { SlotAvailabilityRepository } from "../../Global/FirebaseRepos/SlotsAvailabilityRepository";
import SlotView from "../../Views/SlotView/SlotView";

export const ScheduleCallbackPage = () => {
	const [fetchingSlots, setFetchingSlots] = useState(true);
	const [noSlotAvailable, setNoSlotAvailable] = useState(false);
	const [slots, setSlots] = useState(null);
	const initialDate = () => {
		const todayDate = new Date();
		const day = todayDate.getDate();
		const month = todayDate.getMonth() + 1;
		const year = todayDate.getFullYear();

		const result = year + "-" + month + "-" + day;
		console.log("ScheduleCallbackPage Initial Date =", result);
		return result;
	};

	const todayTimeStamp = () => {
		const today = initialDate();
		const date = new Date(today);
		const timestamp = date.getTime();
		console.log("ScheduleCallbackPage today timestamp =", timestamp);
		return timestamp;
	};
	const [currentTimeStamp, setCurrentTimeStamp] = useState(todayTimeStamp())



	const getAvailableSlots = (timestamp: number) => {
		setFetchingSlots(true)
		console.log(
			"ScheduleCallbackPage getAvailable slots for timestamp =",
			timestamp
		);
		SlotAvailabilityRepository.shared
			.getSlots(timestamp.toString())
			.then((response) => {
				console.log(
					"ScheduleCallabckPage getSlots promis response =",
					response
				);
				setFetchingSlots(false);
				if (
					response == null ||
					response == undefined ||
					response.slots.length == 0
				) {
					console.log(
						"ScheduleCallabckPage getSlots promis exiting from if"
					);
					setNoSlotAvailable(true);
					setSlots([]);
					return;
				}
				console.log(
					"ScheduleCallabckPage getSlots promis not exiting from if"
				);
				setNoSlotAvailable(false);
				setSlots(response.slots);
			});
	};

	useEffect(() => {
		getAvailableSlots(currentTimeStamp);
	}, []);

	const onSlotPress = (item) => {
		console.log("ScheduleCallbackPage onSlotPrese item =",item)
	}

	const onPaymentSuccess = (item, index) => {
		const currentSlots = slots
		console.log("ScheduleCallbackPage onPaymentSuccess currentSlots =", slots)
		currentSlots[index] = item
		console.log("ScheduleCallbackPage onPaymentSuccess updatedSlots =", currentSlots)
		setSlots(currentSlots)
		SlotAvailabilityRepository.shared.updateSlots(currentTimeStamp.toString(), currentSlots).then((response) => {
			console.log("ScheduleCallbackPage updateSlot promise response =",response)
		})
	}

	return (
		<SafeAreaView style={ScheduleCallbackPageStyle.mainScreen}>
			<CalendarList
				minDate={initialDate()}
				pastScrollRange={0}
				futureScrollRange={1}
				horizontal={true}
				pagingEnabled={true}
				scrollEnabled={true}
				style={ScheduleCallbackPageStyle.calendar}
				onDayPress={(date) => {
					console.log("Date Pressed date =", date);
					getAvailableSlots(date.timestamp);
				}}
			/>
			{fetchingSlots ? (
				<ActivityIndicator size={"large"} />
			) : noSlotAvailable ? (
				<Text>No Slots Available for selected date</Text>
			) : (
				<FlatList
				refreshing={fetchingSlots}
				onRefresh={() => getAvailableSlots(currentTimeStamp)}
					data={slots}
					renderItem={({ item }) => <SlotView item={item} callback={onSlotPress} paymentSuccess={onPaymentSuccess}
					/>}
				/>
			)}
			{/* <MakePayementView /> */}
		</SafeAreaView>
	);
};
