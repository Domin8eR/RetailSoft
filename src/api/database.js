import { firestore } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";

export const fetchDataFromFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestore, "appoinement"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        return data;
    } catch (error) {
        console.error("Error fetching documents: ", error);
        throw error;
    }
};
