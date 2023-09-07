export default function useGetUserInfo() {
    // Get auth data from localStorage, or provide default values if it doesn't exist
    const authData = JSON.parse(localStorage.getItem("auth")) || {
        userId: null,
        userName: null,
        profilePhoto: null,
        isAuth: false,
    };

    return authData;
}
