import { collection, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore"
import { FirestoreCollections } from "../FireStoreManager"
import { Firestore } from "../../Configs/FirebaseConfig"

export class TodoRepository {
    static shared = new TodoRepository()
    collectionName = FirestoreCollections.todo
    isCompletedField = "isCompleted"
    timestampField = "timestamp"
    constructor () {}

    async createTodo(data) {
        const cloudCollection = collection(Firestore, this.collectionName)
        const cloudDoc = doc(cloudCollection)
        await setDoc(cloudDoc, data)
    }

    async updateTodo(docId, data) {
        const cloudDoc = doc(Firestore, this.collectionName, docId)
        await updateDoc(cloudDoc, data)
    }

    async fetchAllOpenTodo() {
        const cloudCollection = collection(Firestore, this.collectionName)
        const fetchQuery = query(cloudCollection, where(this.isCompletedField, "==", false), orderBy(this.timestampField))
        const querySnapshot = await getDocs(fetchQuery)

        let result = []

        querySnapshot.forEach((cloudDoc) => {
            console.log("TodoRepository fetchAllOpenTodo querySnapshot forEach cloudDoc =", cloudDoc)

        })
    }
}