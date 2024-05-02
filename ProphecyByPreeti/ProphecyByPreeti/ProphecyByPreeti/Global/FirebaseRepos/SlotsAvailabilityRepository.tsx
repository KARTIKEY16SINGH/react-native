import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Firestore } from "../../Configs/FirebaseConfig";
import { FirestoreCollections } from "../FireStoreManager";

export class SlotAvailabilityRepository {
	static shared = new SlotAvailabilityRepository();
	constructor() {}
	collectionName: string = FirestoreCollections.slotsAvailability;

	async getSlots(timestamp: String) {
		console.log(
			"SlotAvailabilityRepository getSlots for timestamp =",
			timestamp
		);
		const cloudDoc = doc(Firestore, this.collectionName, timestamp);
		const docSnap = await getDoc(cloudDoc);

		if (docSnap.exists()) {
			const data = slotAvailabilityConvertor.fromFirestore(
				docSnap,
				"estimate"
			);
			return data;
		}
		return null;
	}

	async updateSlots(timestamp, slots) {
		console.log(
			"SlotAvailabilityRepository updateSlots timestamp =",
			timestamp,
			" slots =",
			slots
		);
		const cloudDoc = doc(Firestore, this.collectionName, timestamp);
		console.log(
			"SlotAvailabilityRepository updateSlots cloudDoc =",
			cloudDoc
		);
		await updateDoc(cloudDoc, {
			slots: slots,
		});
	}

	async createSlots(timestamp, slots) {
		console.log(
			"SlotAvailabilityRepository createSlots timestamp =",
			timestamp,
			" slots =",
			slots
		);
		const cloudDoc = doc(Firestore, this.collectionName, timestamp);
		console.log(
			"SlotAvailabilityRepository createSlots cloudDoc =",
			cloudDoc
		);
		await setDoc(cloudDoc, {
			slots: slots,
		})
			.then((response) => {
				console.log(
					"SlotAvailabilityRepository createSlots setDoc then response =",
					response
				);
			})
			.catch((error) => {
				console.log(
					"SlotAvailabilityRepository createSlots setDoc catch error =",
					error
				);
			});
	}
}

export const slotAvailabilityConvertor = {
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		console.log("slotAvailabilityConverter fromFirestore data =", data);
		return data;
	},
};
