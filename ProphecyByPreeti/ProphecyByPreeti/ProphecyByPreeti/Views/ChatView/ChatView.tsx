import { StreamChat } from "stream-chat";
import {
	Channel,
	ChannelList,
	Chat,
	MessageInput,
	MessageList,
	OverlayProvider,
} from "stream-chat-expo";
import { StreamDataManager } from "../../Global/Stream/StreamManager";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
	ActivityIndicator,
	SafeAreaViewBase,
	SafeAreaViewComponent,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { CurrentUser } from "../../../App";

const streamClient = StreamChat.getInstance(StreamDataManager.apiKey);

export const ChatView = () => {
	const [loading, setLoading] = useState(false);
	const [channel, setChannel] = useState(null);
	const [selectedChannel, setSelectedChannel] = useState(null);

	useEffect(() => {
		// debugger
		console.log("Chat View useEffect Channel =", channel);
		const connectUser = async () => {
			// const channel = streamClient.channel("messaging", CurrentUser.uid, {name: "Preeti"});
			const channel = streamClient.channel("messaging", {
				members: [CurrentUser.uid, "shivasingh"],
			});
			await channel.watch();
			console.log("Chat View useEffect Channel =", channel);
			// debugger;
			setChannel(channel);
			setLoading(false);
		};
		connectUser();
		// return () => streamClient.disconnectUser();
	}, [streamClient]);

	const onChannelPressed = (channel) => {
		console.log("Chat View channel pressed =", channel);
		setSelectedChannel(channel);
	};

	return loading == true || channel == null || channel == undefined ? (
		<ActivityIndicator size={"large"} />
	) : (
		<OverlayProvider>
			<SafeAreaView>
				<Chat client={streamClient}>
					{/* {selectedChannel ? (
						<Channel channel={selectedChannel}>
							<Text onPress={() => setSelectedChannel(null)}>Go Back</Text>
                            <MessageList />
                            <MessageInput />
						</Channel>
					) : (
						<ChannelList onSelect={onChannelPressed} />
					)} */}
					<Channel channel={channel}>
						<MessageList />
						<MessageInput />
					</Channel>
				</Chat>
			</SafeAreaView>
		</OverlayProvider>
	);
};
