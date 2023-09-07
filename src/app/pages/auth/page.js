"use client"
import useGetUserInfo from "@/app/hooks/useGetUserInfo";
import { auth, provider } from "../../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { redirect } from 'next/navigation'
 


export default function Auth() {
    const router = useRouter();
const {isAuth} = useGetUserInfo()
    async function signInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, provider);

            const authInfo = {
                userId: result.user.uid,
                userName: result.user.displayName,
                profilePhoto: result.user.photoURL,
                isAuth: true
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            router.push("/pages/expense_tracker");
        } catch (err) {
            console.error(err);
        }
    }

    if(isAuth){
        redirect("/pages/expense_tracker")
    }

    return (
        <>
            <button onClick={signInWithGoogle}>Sign in With Google</button>
        </>
    );
}
