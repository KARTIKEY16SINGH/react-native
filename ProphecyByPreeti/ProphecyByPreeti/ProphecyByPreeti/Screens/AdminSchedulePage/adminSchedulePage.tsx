import React, { useEffect, useState } from "react";
import { CalendarList, DateData } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Button, FlatList, KeyboardAvoidingView, Text, TextInput } from "react-native";
import { MakePayementView } from "../../Views/MakePayment/MakePayment";
import { SlotAvailabilityRepository } from "../../Global/FirebaseRepos/SlotsAvailabilityRepository";
import SlotView from "../../Views/SlotView/SlotView";
import { ScheduleCallbackPageStyle } from "../ScheduleCallbackPage/scheduleCallbackPageStyles";

const AdminSchedulePage = () => {
	const [fetchingSlots, setFetchingSlots] = useState(true);
	const [noSlotAvailable, setNoSlotAvailable] = useState(false);
	const [slots, setSlots] = useState(null);
    const [newTimeSlot, setNewTimeSlot] = useState("");
	const initialDate = () => {
		const todayDate = new Date();
		const day = todayDate.getDate();
		const month = todayDate.getMonth() + 1;
		const year = todayDate.getFullYear();

		const result = year + "-" + month + "-" + day;
		console.log("AdminSchedulePage Initial Date =", result);
		return result;
	};

	const todayTimeStamp = () => {
		const today = initialDate();
		const date = new Date(today);
		const timestamp = date.getTime();
		console.log("AdminSchedulePage today timestamp =", timestamp);
		return timestamp;
	};
	const [selectedDate, setSelectedDate] = useState(initialDate())
	const [currentTimeStamp, setCurrentTimeStamp] = useState(todayTimeStamp());

	const getAvailableSlots = (timestamp: number) => {
		setFetchingSlots(true);
		console.log(
			"AdminSchedulePage getAvailable slots for timestamp =",
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
		console.log("AdminSchedulePage onSlotPrese item =", item);
	};

	const onPaymentSuccess = (item, index) => {
		const currentSlots = slots;
		console.log(
			"AdminSchedulePage onPaymentSuccess currentSlots =",
			slots
		);
		currentSlots[index] = item;
		console.log(
			"AdminSchedulePage onPaymentSuccess updatedSlots =",
			currentSlots
		);
		setSlots(currentSlots);
		SlotAvailabilityRepository.shared
			.updateSlots(currentTimeStamp.toString(), currentSlots)
			.then((response) => {
				console.log(
					"AdminSchedulePage updateSlot promise response =",
					response
				);
			});
	};

    const onChangeTimeSlotText = (newText) => {
        setNewTimeSlot(newText)
    }

    const onAddSlot = () => {
        console.log("Admin Schdule Page onAddSlot slots =",slots," current time text=",newTimeSlot)
		if (newTimeSlot == null || newTimeSlot == undefined || newTimeSlot.length == 0 || newTimeSlot == "") {
			return
		}
        let currentSlots = slots
        let isEmpty = false
        if(currentSlots == null || currentSlots == undefined || currentSlots.length == 0) {
            currentSlots = []
            isEmpty = true
        }
        
        currentSlots.push({
            time: newTimeSlot,
            isBooked: false
        })

        console.log("AdminSchedulePage onAddSlot updatedSlots to push currentSlots =",currentSlots)
        if(isEmpty == true) {
            SlotAvailabilityRepository.shared.createSlots(currentTimeStamp.toString(), currentSlots).then((response) => {
                console.log("AdminSchdulePage onAddSlot creatSlot promise response =", response)
				setSlots(currentSlots)
				setNewTimeSlot("")
            })
        } else {
            SlotAvailabilityRepository.shared.updateSlots(currentTimeStamp.toString(), currentSlots).then((response) => {
                console.log("AdminSchdulePage onAddSlot updateSlots promise response =", response)
				setSlots(currentSlots)
				setNewTimeSlot("")
            })
        }
        
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
				// initialDate={selectedDate}
				onDayPress={(date) => {
					console.log("Admin Schedule Page Date Pressed date =", date);
					getAvailableSlots(date.timestamp);
					setCurrentTimeStamp(date.timestamp)
					setSelectedDate(date.dateString)
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
					renderItem={({ item }) => (
						<SlotView
							item={item}
							callback={onSlotPress}
							paymentSuccess={onPaymentSuccess}
						/>
					)}
				/>
			)}
			<KeyboardAvoidingView>
                <TextInput style={ScheduleCallbackPageStyle.timeSlotInputTextField} defaultValue={newTimeSlot} placeholder="Add Time Slot" onChangeText={onChangeTimeSlotText}></TextInput>
                <Button title="Add Slot" onPress={onAddSlot} />
            </KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default AdminSchedulePage;
