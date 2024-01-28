import { router, useNavigation, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  createAccount,
  getAccount,
  getAccountPhrase,
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
// import { auth } from "../firebase";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ethers } from "ethers";
import { Audio } from "expo-av";
import { auth, db } from "../firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

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
  createAnEOA: (email: string, password: string) => Promise<boolean>;
  permanentlyDeleteAccount: () => Promise<void>;
  signin: (
    email: string,
    password: string
  ) => Promise<DocumentData | undefined>;
  playSound(external_url: string, item: any): Promise<void>;
  playerOpen: boolean;
  currentlyPlayed: {
    image: string;
    title: string;
    url: string;
    artist: string;
  };
  stopSound(external_url: string): Promise<void>;
  pauseSound(): Promise<void>;
  isPlaying: boolean;
  userData: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
  // Add other values you want to provide through the context here
};

const AuthContext = React.createContext<AuthContextValue>({
  session: undefined,
  createAnEOA: async (email: string, password: string) => {
    // Default implementation, you may want to handle this differently
    console.warn("createAnEOA function not implemented");
    return false; // return a boolean value
  },
  permanentlyDeleteAccount: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("permanentlyDeleteAccount function not implemented");
  },
  signin: async (
    email: string,
    password: string
  ): Promise<DocumentData | undefined> => {
    // Default implementation, you may want to handle this differently
    console.warn("Signin function not implemented");
    return undefined; // return undefined as per the expected return type
  },
  playSound: async (external_url: string, item: any): Promise<void> => {
    // Implementation goes here
  },
  playerOpen: false,
  currentlyPlayed: {
    image: "",
    title: "",
    url: "",
    artist: "",
  },
  stopSound: async (external_url: string): Promise<void> => {
    // Implementation goes here
  },
  pauseSound(): Promise<void> {
    return Promise.resolve();
  },
  isPlaying: false,
  userData: undefined,
});

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute(session: Session) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!session && !inAuthGroup) {
      router.replace("/");
    } else if (session && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [session, segments]);
}

type AuthProviderProps = {
  // createUserWithEmailAndPassword: (auth: any, email: string, password: string) => Promise<any>;
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session>();
  const [playerOpen, setPlayerOpened] = useState(false);
  const [currentlyPlayed, setCurrentLyPlayed] = useState({
    image: "",
    title: "",
    url: "",
    artist: "",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [userData, setUser] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();
  console.log("user", userData);
  // useProtectedRoute(userData);

  const createAnEOA = async (email: string, password: string) => {
    let userCredential, newAccount;

    try {
      // Create a new user with email and password
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.error("Error creating user: ", error);
      return false;
    }

    const user = userCredential.user;

    if (user) {
      try {
        newAccount = await createAccount();
      } catch (error) {
        console.error("Error creating account: ", error);
        return false;
      }

      if (newAccount) {
        try {
          // Store the user's email and wallet address in Firestore
          const docSnap = await setDoc(doc(db, "users", user.uid), {
            email: email,
            walletAddress: newAccount,
          });
          return true;
        } catch (error) {
          console.error("Error storing user data in Firestore: ", error);
          return false;
        }
      }
    }

    console.log("User registered successfully");
    return true;
  };

  // Add a state for the current sound object
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);

  async function playSound(external_url: string, item: any) {
    // Stop the currently playing sound if there is one
    if (soundObject) {
      await soundObject.stopAsync();
    }

    setPlayerOpened(true);
    setCurrentLyPlayed({
      image: item.image,
      title: item.name,
      url: item.external_url,
      artist: item.artist,
    });
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true, // Add this line
    });
    try {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        {
          uri: external_url,
        },
        { shouldPlay: true }
      );

      setSoundObject(playbackObject); // Save the sound object
      await playbackObject.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.log("Error loading audio", error);
    }
  }

  async function pauseSound() {
    if (soundObject) {
      await soundObject.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function stopSound() {
    if (soundObject) {
      await soundObject.stopAsync();
      setIsPlaying(false);
      setSoundObject(null); // Clear the sound object
    }
  }

  const signin = async (email: string, password: string) => {
    try {
      // Try to sign in the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        // User is signed in, now fetch the user data from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // User data exists in Firestore, return it
          setUser(docSnap);
          return docSnap.data();
        } else {
          // No user data in Firestore, redirect to signup page
          Alert.alert("You dont have a wallet created 😒, will create one now");
          await createAccount();
        }
      } else {
        // No user is signed in, redirect to signup page
        router.push("/signup");
      }
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  useEffect(() => {
    if (userData) {
      router.push("/(tabs)");
    }
  }, [userData]);

  const contextValue: AuthContextValue = {
    session,
    createAnEOA,
    permanentlyDeleteAccount,
    playSound,
    currentlyPlayed,
    playerOpen,
    stopSound,
    isPlaying,
    pauseSound,
    signin,
    userData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// 0x9ab0e4dd0ad0abc732c0d8eb6fe70ae5aa77a79fcb586789d2aaec94d91c3c46;
// e26226
