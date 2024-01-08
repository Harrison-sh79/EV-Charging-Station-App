import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  useFonts, Outfit_100Thin, Outfit_200ExtraLight,
  Outfit_300Light, Outfit_400Regular, Outfit_500Medium,
  Outfit_600SemiBold, Outfit_700Bold, Outfit_800ExtraBold,
  Outfit_900Black
} from '@expo-google-fonts/outfit';
import LoginScreen from './app/screens/login/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import TabNavigation from './app/navigation/TabNavigation';
import { NavigationContainer } from '@react-navigation/native'
import * as Location from 'expo-location'
import React, { useState, useEffect } from 'react'
import { UserLocationContext } from './app/context/UserLocationContext';
import { RootSiblingParent } from 'react-native-root-siblings'
import { FavoriteListContext } from './app/context/FavoriteListContext';

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export default function App() {

  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [favoriteList, setFavoriteList] = useState<any>([]);
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  let [fontsLoaded, fontError] = useFonts({
    'outfit-thin': Outfit_100Thin,
    'outfit-extralight': Outfit_200ExtraLight,
    'outfit-light': Outfit_300Light,
    'outfit': Outfit_400Regular,
    'outfit-medium': Outfit_500Medium,
    'outfit-semibold': Outfit_600SemiBold,
    'outfit-bold': Outfit_700Bold,
    'outfit-extrabold': Outfit_800ExtraBold,
    'outfit-black': Outfit_900Black
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }




  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={'pk_test_YW11c2VkLWhpcHBvLTk4LmNsZXJrLmFjY291bnRzLmRldiQ'}
    >
      <RootSiblingParent>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <FavoriteListContext.Provider value={{favoriteList, setFavoriteList}} >
            <View style={styles.container}>
              <SignedIn>
                <NavigationContainer>
                  <TabNavigation />
                </NavigationContainer>
              </SignedIn>
              <SignedOut>
                <LoginScreen />
              </SignedOut>
              <StatusBar style="auto" />
            </View>
          </FavoriteListContext.Provider>
        </UserLocationContext.Provider>
      </RootSiblingParent>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
