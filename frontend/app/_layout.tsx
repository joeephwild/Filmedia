import "@walletconnect/react-native-compat";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { init } from "@airstack/airstack-react";

import { LensClient, production } from "@lens-protocol/client";

export const lensClient = new LensClient({
  environment: production,
});

const AIRSTACK_API_KEY = "1b12f927657d44dce9727a129dc65907a";
init(AIRSTACK_API_KEY);

const projectId = "faacd6df1eda3779a685e127d4cac05a";

const providerMetadata = {
  name: "Filmedia",
  description:
    "Filmedia: Revolutionizing Content Creation on Web3 - Earn, Connect, and Stand Out with Subscription-based payments and Exclusive Dynamic NFT Certificates! ",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito: require("../assets/fonts/NunitoSans_10pt_Expanded-Black.ttf"),
    OpensansRegular: require("../assets/fonts/OpenSans-Regular.ttf"),
    OpensansBold: require("../assets/fonts/OpenSans-Bold.ttf"),
    OpensansLight: require("../assets/fonts/OpenSans-Light.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { isOpen, open, close, provider, isConnected, address } =
    useWalletConnectModal();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await lensClient.authentication.isAuthenticated();
      console.log(isAuthenticated);
      setIsAuth(isAuthenticated);
    };

    if (isAuth) {
      router.push("/(tabs)");
    }
    checkAuth();
  }, [isAuth]);

  // useEffect(() => {
  //   if (address) {
  //     router.push("/(tabs)");
  //   } else {
  //     router.push("/");
  //   }
  // }, [address]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <WalletConnectModal
          projectId={projectId}
          providerMetadata={providerMetadata}
        />
        <AuthProvider>
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor: "#000",
              },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen
              name="artist/[profile]"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="vid/[title]" options={{ headerShown: false }} />
            <Stack.Screen name="create" options={{ headerShown: false }} />
            <Stack.Screen
              name="createProfile"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="successMessage"
              options={{
                presentation: "modal",
                headerShown: false
              }}
            />
          </Stack>
        </AuthProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
