import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import {db} from "../config/firebaseConfig"
import useGetUserInfo from "./useGetUserInfo";
export default function useAddTransactions() {

    const transactionsRef = collection(db, "transactions");
    const {userId} = useGetUserInfo()

    async function addTransactions({description,transactionType,transactionAmount}) {
   
        await addDoc(transactionsRef, {
            userId,
            description,
            transactionType,
            transactionAmount,
            createdAt:serverTimestamp(),
        });
    }

    return { addTransactions }

}