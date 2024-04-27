import {
	Timestamp,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
} from "firebase/firestore";
import { FirestoreCollections, getCollection } from "../FireStoreManager";
import { Firestore } from "../../Configs/FirebaseConfig";

interface UserInfo {
	name: string | null;
	phoneNumber: string | null;
	dob: string | null;
	tob: string | null;
	pob: string | null;
	timestamp: Timestamp;
}

export class UserInfoRepository {
	static shared = new UserInfoRepository();
	constructor() {}
	collectionName: string = FirestoreCollections.userInfo;

	currentUserInfo: UserInfoModel | null = null;

	getUserInfoReceivers: Array<(response: UserInfoModel) => {}> = [];

	isGetUserInfoFetching = false;

	async createUser(userData, id: string, completionHandler) {
		const cloudDoc = doc(Firestore, this.collectionName, id);
		await setDoc(cloudDoc, userInfoConverter.toFirestore(userData)).then(
			(any) => {
				console.log("Create User Resolve Block");
			}
		);
	}

	async getUserInfo(id: string, completionHandler) {
		console.log("UserInfoRepository getUserInfo called with id =", id);
		this.getUserInfoReceivers.push(completionHandler);
		if (this.isGetUserInfoFetching == true) {
			return;
		}
		this.isGetUserInfoFetching = true;
		const cloudDoc = doc(Firestore, this.collectionName, id);
		const docSnap = await getDoc(cloudDoc);

		const promise = new Promise((resolve, reject) => {
			if (docSnap.exists()) {
				const data = userInfoConverter.fromFirestore(
					docSnap,
					"estimate"
				);
				console.log("Document data:", data);
				this.currentUserInfo = data;
				this.getUserInfoReceivers.forEach((callbackfn) => {
					console.log(
						"UserInfoRepository getUserInfo promise current getUserInfo callbackfn =",
						callbackfn
					);
					callbackfn(data);
				});
				this.isGetUserInfoFetching = false;
				resolve(data);
			} else {
				// docSnap.data() will be undefined in this case
				console.log("No such document!");
				reject("No Such Document");
				this.getUserInfoReceivers.forEach((callbackfn) =>
					callbackfn(null)
				);
				this.isGetUserInfoFetching = false;
			}
		});
	}
}

export class UserInfoModel implements UserInfo {
	name: string;
	phoneNumber: string;
	dob: string;
	tob: string;
	pob: string;
	timestamp: Timestamp;

	constructor(name, phoneNumber, dob, tob, pob, timestamp) {
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.dob = dob;
		this.tob = tob;
		this.pob = pob;
		this.timestamp = timestamp ? timestamp : serverTimestamp();
	}
}

export const userInfoConverter = {
	toFirestore: (userInfo: UserInfo) => {
		return {
			name: userInfo.name ? userInfo.name : null,
			phoneNumber: userInfo.phoneNumber ? userInfo.phoneNumber : null,
			dob: userInfo.dob ? userInfo.dob : null,
			tob: userInfo.tob ? userInfo.tob : null,
			pod: userInfo.pob ? userInfo.pob : null,
			timestamp: serverTimestamp(),
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new UserInfoModel(
			data.name,
			data.phoneNumber,
			data.dob,
			data.tob,
			data.pob,
			data.timestamp
		);
	},
};
