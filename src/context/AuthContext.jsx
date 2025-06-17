import { createContext, useEffect, useState, useMemo } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };


  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };


  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (profile) => {
    if (!auth.currentUser) return Promise.reject(new Error("No user logged in"));
    return updateProfile(auth.currentUser, profile);
  };


  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };


  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, currentUser => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });


  //   return () => unsubscribe();
  // }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      //post request for jwt  using user email
      //api end-point: /jwt(poat method)
      if (currentUser) {
        const token = await currentUser.getIdToken();
        //    localStorage.setItem("token", token);
      } else {
        // localStorage.removeItem("token");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    }

  }, []);


  const authInfo = useMemo(() => ({
    user,
    loading,
    createUser,
    signIn,
    googleLogin,
    updateUserProfile,
    logOut,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

