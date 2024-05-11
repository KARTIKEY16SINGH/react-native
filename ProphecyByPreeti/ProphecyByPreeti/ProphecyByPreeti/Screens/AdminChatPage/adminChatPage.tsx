import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import {
	Channel,
	ChannelList,
	Chat,
	MessageInput,
	MessageList,
	OverlayProvider,
	useChatContext,
} from "stream-chat-expo";
import { StreamManager } from "../../Global/Stream/StreamManager";
import { NavigationProp } from "@react-navigation/native";
import { NavigationConstant } from "../../Global/NavigationConstants";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface RouterProps {
	navigation: NavigationProp<any, any>;
}

const AdminChatPage = (routerProps: RouterProps) => {
	// const { client } = useChatContext();
	const [currentChannel, setCurrentChannel] = useState(null);
	const onChannelPressed = (channel) => {
		// routerProps.navigation.navigate(NavigationConstant.chatScreenPage.name, {channel})
		console.log("AdminChatPage onChannelPressed channel =", channel);
		setCurrentChannel(channel);
	};

	return (
		<OverlayProvider>
			<Chat client={StreamManager.shared.streamClient}>
				{currentChannel != null && currentChannel != undefined ? (
					<SafeAreaView>
						<Channel channel={currentChannel}>
							<Button
								title="Go Back"
								onPress={() => {
									setCurrentChannel(null);
								}}
							/>
							<MessageList />
							<MessageInput />
						</Channel>
					</SafeAreaView>
				) : (
					<ChannelList onSelect={onChannelPressed} />
				)}
			</Chat>
		</OverlayProvider>
	);
};

export default AdminChatPage;

/*

import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ChannelList, Chat, MessageList, OverlayProvider, Channel } from 'stream-chat-expo'
import { StreamManager } from '../../Global/Stream/StreamManager'
import { NavigationProp } from '@react-navigation/native';
import { NavigationConstant } from '../../Global/NavigationConstants';




interface RouterProps {
	navigation: NavigationProp<any, any>;
}

const AdminChatPage = (routerProps: RouterProps) => {
    // const { client } = useChatContext();
    const [currentChannel, setCurrentChannel] = useState(null)
    const onChannelPressed = (channel) => {
        console.log("AdminChatPage onChannelPressed channel =", channel)
        setCurrentChannel(channel)
        // return (<Channel channel={channel}>
        //     <MessageList />
        // </Channel>)
    }

  return (
    <OverlayProvider>
      <Chat client={StreamManager.shared.streamClient} > {
        (currentChannel == null || currentChannel == undefined) ? (<ChannelList onSelect={onChannelPressed}/>)
        : (<Channel channel={channel}>
            <MessageList />
        </Channel>)
}
      </Chat>
    </OverlayProvider>
  )
}

export default AdminChatPage

*/
