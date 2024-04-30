import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FirestoreCollections } from "../FireStoreManager";
import { Firestore } from "../../Configs/FirebaseConfig";

export class RequestCallbackRepository {
	static shared = new RequestCallbackRepository();
	collectionName = FirestoreCollections.requestCallback;
	constructor() {}

	async fetchRequestFor(id: string) {
		const cloudDoc = doc(Firestore, this.collectionName, id);
		const docSnap = await getDoc(cloudDoc);

		if (docSnap.exists()) {
			return requestCallbackConverter.fromFirestore(docSnap, "estimate");
		}
		return null;
	}

    async deleteRequest(id: string) {
        const cloudDoc = doc(Firestore, this.collectionName, id)
        await deleteDoc(cloudDoc)
    }

    async updateRequest(id: string, data) {
        const cloudDoc = doc(Firestore, this.collectionName, id)
        await updateDoc(cloudDoc, data)
    }

    async createRequest(id: string, data) {
        const cloudDoc = doc(Firestore, this.collectionName, id)
        await setDoc(cloudDoc, data)
    }
}

const requestCallbackConverter = {
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		console.log(
			"RequestCallbackRepository requestCallbackConverter fromFirestore data =",
			data
		);
		return data;
	},
};
