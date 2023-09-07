import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import useGetUserInfo from "./useGetUserInfo";
import { useEffect, useState } from "react";

export default function useGetTransactions() {
    const [transaction, setTransacton] = useState([]);
    const [transactionTotal, setTransactionTotal] = useState({
        balance: 0,
        income: 0,
        expenses: 0,
    })

    const transactionsCollectionRef = collection(db, "transactions");
    const { userId } = useGetUserInfo();

    async function getTransactions() {

        try {
            const transactionsCollectionQuery = query(
                transactionsCollectionRef,
                where("userId", "==", userId),
                orderBy("createdAt")
            );

            onSnapshot(transactionsCollectionQuery, (snapshot) => {
                const docs = [];
                let totalIncome = 0;
                let totalExepnse = 0;

                snapshot.forEach((doc) => {
                    console.log("snapsoptDoc: ", doc);
                    const data = doc.data();
                    const collectionId = doc.id;

                    docs.push({ ...data, collectionId });
                    if(data.transactionType === "expense"){
                        totalExepnse += Number(data.transactionAmount)
                    }else{
                        totalIncome+= Number(data.transactionAmount)
                    }
                });
                let balance = Number(totalIncome - totalExepnse)
                setTransacton(docs);
                setTransactionTotal({
                    balance,
                    income:totalIncome,
                    expenses:totalExepnse

                })
               
            });

        }

        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTransactions();
    }, []);
    return { transaction,transactionTotal };
}
