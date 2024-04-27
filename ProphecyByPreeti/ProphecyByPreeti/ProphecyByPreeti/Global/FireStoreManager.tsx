import {
	addDoc,
	collection,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { Firestore } from "../Configs/FirebaseConfig";

// Getters
export const getCollection = (collectionName: string) => {
	return collection(Firestore, collectionName);
};

export const getCollectionWithId = (collectionName: string, id: string) => {
	return collection(Firestore, collectionName, id);
};

export const getDocumentForCollectionWithId = (
	collectionName: string,
	id: string
) => {
	return doc(getCollection(collectionName), id);
};

export const getAllDataForCollection = async (collectionName: string) => {
	return await getDocs(getCollection(collectionName));
};

// Creaters
export const addDataToCollection = async (collectionName: string, data) => {
	try {
		const docRef = await addDoc(getCollection(collectionName), data);
		console.log("Document written with ID: ", docRef.id);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
};

export const addDataToCollectionWithId = async (
	collectionName: string,
	id: string,
	data
) => {
	try {
		const docRef = await addDoc(
			getCollectionWithId(collectionName, id),
			data
		);
		console.log("Document written with ID: ", docRef.id);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
};

// Updaters
// export const updateDataForCollectionWithId = (collectionName: string, id: string, updatedData) => {
//     try {
//         await updateDoc(getCollectionWithId(collectionName, id), updatedData)
//     }
// }

// Deleters
export const FirestoreCollections = {
	userInfo: "UserInfo",
	testCollection: "Test",
	slotsAvailability: "SlotAvailability",
};
