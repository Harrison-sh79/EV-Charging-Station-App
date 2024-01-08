import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors'
import * as WebBrowser from "expo-web-browser"
import { useOAuth } from "@clerk/clerk-expo"
import { useWarmUpBrowser } from "../../../hooks/warmUpBrowser"

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive }: any =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }
  return (
    <View>
      <Image source={require('../../../assets/images/logo.png')} style={styles.imglogo} />
      <Image source={require('../../../assets/images/ev-charging.jpg')} style={styles.imgev} />
      <View>
        <Text style={styles.heading}>Your Ultimate EV charging Station Finder App</Text>
        <Text style={styles.desc}>Find EV charging station near you, plan trip and much more in just one click</Text>
        <TouchableOpacity style={styles.btnlogin} onPress={onPress}>
          <Text style={styles.btntext}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  imglogo: {
    width: 100,
    height: 100,
    objectFit: 'contain',
    marginTop: 50,
    alignSelf: 'center'
  },
  imgev: {
    width: '100%',
    height: 240,
    objectFit: 'fill',
    alignSelf: 'center',
    borderRadius: 15

  },
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 28,
    color: Colors.BLACK,
    textAlign: 'center',
    marginTop: 40
  },
  desc: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: 20
  },
  btnlogin: {
    padding: 25,
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  btntext: {
    fontFamily: 'outfit-semibold',
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: 'center'
  }
})
