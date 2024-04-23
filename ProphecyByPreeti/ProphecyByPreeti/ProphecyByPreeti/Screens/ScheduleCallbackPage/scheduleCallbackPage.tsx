import React, { useEffect, useState } from "react";
import { CalendarList, DateData } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScheduleCallbackPageStyle } from "./scheduleCallbackPageStyles";
import { ActivityIndicator, View } from "react-native";

export const ScheduleCallbackPage = () => {
	const [fetchingSlots, setFetchingSlots] = useState(true);

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

	const getAvailableSlots = (timestamp: number) => {
        console.log("ScheduleCallbackPage getAvailable slots for timestamp =",timestamp)
        setFetchingSlots(!fetchingSlots)
    };

	useEffect(() => {
		getAvailableSlots(todayTimeStamp());
	}, []);

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
                    console.log("Date Pressed date =", date)
                    getAvailableSlots(date.timestamp)
                }}
			/>
			{fetchingSlots ? (
				<ActivityIndicator size={"large"} />
			) : (
				<View></View>
			)}
		</SafeAreaView>
	);
};
