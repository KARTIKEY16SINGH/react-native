import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { FirestoreCollections } from "../FireStoreManager";
import { Firestore } from "../../Configs/FirebaseConfig";
import { DownloadCloud } from "stream-chat-expo";

export class RequestCallbackRepository {
	static shared = new RequestCallbackRepository();
	collectionName = FirestoreCollections.requestCallback;
	isBookedField = 'isBooked'
	timeStampField = 'timestamp'
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

	async fetchAllRequest() {
		const cloudCollection = collection(Firestore, this.collectionName)
		const cloudQuery = query(cloudCollection, where(this.isBookedField, "==", false), orderBy(this.timeStampField))

		const querySnapshot = await getDocs(cloudQuery)

		console.log("RequestCallbackRepository fetchAllRequest querySnapshot =",querySnapshot.docs)
		
		let result = []
		querySnapshot.forEach((cloudDoc) => {
			console.log("RequestCallbackRepository fetchAllRequest querySnapshot cloudDoc =",cloudDoc)
			console.log("RequestCallbackRepository fetchAllRequest querySnapshot cloudDoc id =",cloudDoc.id)
			console.log("RequestCallbackRepository fetchAllRequest querySnapshot cloudDoc data =",cloudDoc.data())
			result.push({
				userId: cloudDoc.id,
				data: cloudDoc.data()
			})
		})
		return result
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
