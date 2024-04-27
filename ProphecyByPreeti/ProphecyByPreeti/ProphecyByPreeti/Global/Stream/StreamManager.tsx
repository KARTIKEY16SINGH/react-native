import { User } from "firebase/auth";
import { UserInfoModel } from "../UserInfoRepository";
import { StreamChat } from "stream-chat";

export const StreamDataManager = {
	apiKey: "5zywan3b372r",
};

export class StreamManager {
	static shared = new StreamManager();
	streamClient: StreamChat;
	currentUser: User | null = null;
	currentUserInfo: UserInfoModel | null = null;

	constructor() {
		this.streamClient = StreamChat.getInstance(StreamDataManager.apiKey);
		console.log("Stream Manage init");
	}

	connectUserToStream(response: UserInfoModel, currentUser: User) {
		console.log("StreamManager response =", response);
		this.currentUser = currentUser;
		this.currentUserInfo = response;
		if (currentUser == null || currentUser == undefined) {
			return;
		}
		console.log("CurrentUser email = ", currentUser.email);
		console.log("CurrentUser uid = ", currentUser.uid);
		console.log("CurrentUser name =", response.name);
		const connectUser = async () => {
			// debugger
			await this.streamClient.connectUser(
				{
					id: currentUser.uid,
					name: response.name,
				},
				// currentUser.uid
				this.streamClient.devToken(currentUser.uid)
			);
			// const channel = streamClient.channel("messaging", "preeti", {name: "Preeti"});
			// await channel.create()
		};
		connectUser();
	}

	async createChannel() {
		const channel = this.streamClient.channel(
			"messaging",
			this.currentUser.uid,
			{ name: "Preeti" }
		);
		//  = streamClient.channel("messaging", CurrentUser.uid, {name: "Preeti"});
        console.log("Stream Manager 1 Channel =", channel);
		await channel.watch();
        console.log("Stream Manager 2 Channel =", channel);
		return channel;
	}
}
