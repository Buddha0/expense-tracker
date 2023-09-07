"use client"
import "./style.css"
import { useState } from "react"
import useAddTransactions from "@/app/hooks/useAddTransactions"
import useGetTransactions from "@/app/hooks/useGetTransactions"
import useGetUserInfo from "@/app/hooks/useGetUserInfo"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "../../config/firebaseConfig"

export default function ExpenceTracker() {
    const router = useRouter()
    const { addTransactions } = useAddTransactions()
    const { userName } = useGetUserInfo()
    const { transaction, transactionTotal } = useGetTransactions()
    const { balance, income, expenses } = transactionTotal
    const [description, setDescription] = useState("")
    const [transactionType, setTransactionType] = useState("expense")
    const [transactionAmount, setTransactionAmount] = useState(0)
 

    function handleFormSubmit(e) {
        e.preventDefault()
        addTransactions({ description, transactionType, transactionAmount })
    }

    async function handleSignOut() {
        try {
            await signOut(auth);
            localStorage.removeItem("auth"); // Remove only the "auth" key
            router.push("/");
        } catch (err) {
            console.log(err);
        }
    }
    

    return (
        <>
            <h1>{userName} , Expense Tracker</h1>
            <div className="balance">
                <p>Your Balance</p>
                <p>{balance}</p>
            </div>
            <div className="income">
                <p>Your income</p>
                <p>{income}</p>
            </div>
            <div className="expense">
                <p>Your expense</p>
                <p>{expenses}</p>
            </div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} required></input>
                <input type="number" required onChange={(e) => setTransactionAmount(e.target.value)}></input>
                <input type="radio" id="expense" required onChange={(e) => setTransactionType(e.target.value)} checked={transactionType === "expense"} value="expense"></input>
                <label for="expense">Expense</label>
                <input type="radio" id="income" required onChange={(e) => setTransactionType(e.target.value)} checked={transactionType === "income"} value="income"></input>
                <label for="income" >Income</label>
                <button>Add Transaction</button>
            </form>

            <div className="transactions">
                <h1>Transactions</h1>
                {transaction.map((data) => {
                    return (
                        <ul className="ul">
                            <li>description: {data.description}</li>
                            <li style={{ color: data.transactionType === "expense" ? "red" : "green" }}>transactionType: {data.transactionType}</li>
                            <li>transactionAmount: {data.transactonAmount}</li>
                        </ul>
                    )
                })}
            </div>

            <button onClick={handleSignOut}>SignOut</button>
        </>

    )
}