import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { View, useColorScheme } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";

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
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: "#191414",
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
        </Stack>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
