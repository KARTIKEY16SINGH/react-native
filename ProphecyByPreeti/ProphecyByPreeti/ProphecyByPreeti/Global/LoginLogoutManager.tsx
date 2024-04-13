import { signInWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
import { FirebaseAuth } from "../Configs/FirebaseConfig";
import auth from '@react-native-firebase/auth';

const loginUser = () => {}

const logoutUser = () => {}

// const loginWithEmail = async (email, password) => {
//     // setLoading(true);
//     try {
//         const response = await signInWithEmailAndPassword(
//             FirebaseAuth,
//             email,
//             password
//         );
//         console.log(response);
//     } catch (error) {
//         console.log(error);
//     } finally {
//         // setLoading(false);
//     }
// };

// const loginWithPhone = async (phone) => {
//     try {
//         const response = await auth().signInWithPhoneNumber(phone)
//         console.log(response)
//     } catch (error) {
//         console.log(error)
//     } finally {

//     }
// }