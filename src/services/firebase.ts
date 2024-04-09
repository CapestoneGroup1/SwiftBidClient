import { FirebaseOptions } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth, User } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import APIService from "./Api";

export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyD752Uha_wpmv2Sf6_wmkk4eFLIUygI-Ho",
  authDomain: "capstone-beab8.firebaseapp.com",
  projectId: "capstone-beab8",
  storageBucket: "capstone-beab8.appspot.com",
  messagingSenderId: "648342255240",
  appId: "1:648342255240:web:433c5f748a1f111b40513d",
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const handleGoogleSign = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(response);
    if (credential) {
      const user: User = response.user;
      const { email, uid, displayName, phoneNumber } = user;
      const loginResponse = await APIService.getInstance().post(
        "/auth/google",
        {
          email,
          uid,
          displayName,
          phoneNumber,
        }
      );
      if (!loginResponse || loginResponse.status !== 200) {
        return null;
      }
      return loginResponse.data?.token;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Google sign-in error:", error);
    return null;
  }
};

export default app;
