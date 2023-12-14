import { router, useNavigation, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  createAccount,
  getAccount,
  permanentlyDeleteAccount,
} from "@rly-network/mobile-sdk";
import { Alert } from "react-native";
import {
  User as FirebaseAuthUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ethers } from "ethers";

type Session = string | undefined;

interface DataItem {
  id: string;
  image: string;
  name: string;
  current_price: number;
  symbol: string;
}

type AuthContextValue = {
  session: Session;
  createAnEOA: (
    name: string,
    password: string,
    lensBool: boolean,
    privateKey: string
  ) => Promise<void>;
  permanentlyDeleteAccount: () => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  // Add other values you want to provide through the context here
};

const AuthContext = React.createContext<AuthContextValue>({
  session: undefined,
  createAnEOA: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("createAnEOA function not implemented");
  },
  permanentlyDeleteAccount: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("permanentlyDeleteAccount function not implemented");
  },
  signin: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("Signin function not implemented");
  },
});

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute(session: Session) {
  const segments = useSegments();

  useEffect(() => {
    // const inAuthGroup = segments[0] === "(auth)";
    // if (!session && !inAuthGroup) {
    //   router.replace("/");
    // } else if (session && inAuthGroup) {
    //   router.replace("/(tabs)");
    // }
  }, [session, segments]);
}

type AuthProviderProps = {
  // createUserWithEmailAndPassword: (auth: any, email: string, password: string) => Promise<any>;
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session>();
  console.log("user", session);
  // useProtectedRoute(session);

  const createAnEOA = async (
    name: string,
    password: string,
    lensBool: boolean,
    privateKey: string
  ) => {
    const account = await getAccount();

    if (account) {
      return Alert.alert("Account already exist please login");
    }
    const newAccount = await createAccount();

    // mint the user
    // add the user to the marketplace contract
    const user = {
      walletAddress: newAccount,
      password,
      tokenId: 1,
    };

    console.log(user);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (newAccount) {
      router.push("/(tabs)");
    }
  };

  const signin = async (email: string, password: string) => {
    const account = await getAccount();

    // mint the user
    // add the user to the marketplace contract
    const usesr = {
      walletAddress: account,
      password,
      tokenId: 1,
    };
    await AsyncStorage.setItem("user", JSON.stringify(usesr));

    const user: string = await AsyncStorage.getItem("user");
    const parseUser = JSON.parse(user);

    if (user !== null) {
      if (parseUser.password !== password) {
        return Alert.alert("Password isnt correct");
      }

      router.push("/(tabs)");
    } else {
      Alert.alert("No user found, Please login");
    }
  };

  useEffect(() => {
    const retrieveAccount = async () => {
      const account = await getAccount();
      setSession(account);
      if (session) {
        router.push("/(tabs)");
      }
    };
    retrieveAccount();
  }, [session]);

  const contextValue: AuthContextValue = {
    session,
    createAnEOA,
    permanentlyDeleteAccount,
    signin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// 0x9ab0e4dd0ad0abc732c0d8eb6fe70ae5aa77a79fcb586789d2aaec94d91c3c46;
// e26226
