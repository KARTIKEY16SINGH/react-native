import { View, Text } from "react-native";
import React from "react";
import { Channel, MessageList, OverlayProvider, Chat, MessageInput, useChannelContext, useChatContext } from "stream-chat-expo";
import { StreamManager } from "../../Global/Stream/StreamManager";

const ChannelScreen = (props) => {
	const channel = props.route;
	console.log("ChannelScreen props =", props, "channel =", channel);
    // const {client} = useChatContext();
	if (!channel) {
		return <Text>Channel Not found</Text>;
	}
	return (
		<OverlayProvider>
			<Chat client={StreamManager.shared.streamClient}>
				<Channel channel={channel}>
					<MessageList />
                    <MessageInput />
				</Channel>
			</Chat>
		</OverlayProvider>
	);
};

export default ChannelScreen;
