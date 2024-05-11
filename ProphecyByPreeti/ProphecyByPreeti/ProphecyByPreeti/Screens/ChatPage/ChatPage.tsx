import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StreamDataManager, StreamManager } from '../../Global/Stream/StreamManager';
import { Channel, Chat, MessageInput, MessageList, OverlayProvider } from 'stream-chat-expo';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatPage = (routerProps) => {
    console.log("ChatPage routerProps =", routerProps)
    const userId = routerProps.route.params
    const [loading, setLoading] = useState(false);
	const [channel, setChannel] = useState(null);
    const streamClient = StreamManager.shared.streamClient
    
	useEffect(() => {
		// debugger
		console.log("ChatPage useEffect userId =", userId);
        setLoading(true)
		const connectUser = async () => {
			// const channel = streamClient.channel("messaging", CurrentUser.uid, {name: "Preeti"});
			const channel = streamClient.channel("messaging", {
				members: [userId, StreamDataManager.adminId],
			});
			await channel.watch();
			console.log("Chat View useEffect Channel =", channel);
			// debugger;
			setChannel(channel);
			setLoading(false);
		};
		connectUser();
		// return () => streamClient.disconnectUser();
	}, []);

    return loading == true || channel == null || channel == undefined ? (
		<ActivityIndicator size={"large"} />
	) : (
		<OverlayProvider>
			<SafeAreaView>
				<Chat client={streamClient}>
					<Channel channel={channel}>
						<MessageList />
						<MessageInput />
					</Channel>
				</Chat>
			</SafeAreaView>
		</OverlayProvider>
	);
}

export default ChatPage