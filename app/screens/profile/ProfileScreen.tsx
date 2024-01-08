import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import Colors from '../../utils/Colors'

const ProfileScreen = () => {
  const { user } = useUser()
  const { isLoaded, signOut } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return user && (
    <View style={styles.container}>
      <Image source={{ uri: user?.imageUrl }} style={styles.img} />
      <Text style={styles.text} >{user?.fullName}</Text>
      <Text style={styles.text} >{user?.primaryEmailAddress?.emailAddress}</Text>
      <TouchableOpacity style={styles.signout} onPress={() => {
        signOut();
      }}>
        <Text style={styles.text_signout}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  text: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: Colors.BLACK,
    padding: 10,
    textAlign: 'center'
  },
  signout: {
    backgroundColor: Colors.PRIMARY,
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  text_signout: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: Colors.WHITE,
    padding: 20,
    textAlign: 'center'
  }
})
