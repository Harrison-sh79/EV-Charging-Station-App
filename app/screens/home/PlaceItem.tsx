import { View, Text, Image, StyleSheet, Dimensions, Pressable, Platform, Linking } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../utils/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { app } from '../../services/FireBase'
import { getFirestore } from "firebase/firestore"
import { doc, setDoc, deleteDoc } from "firebase/firestore"
import { useUser } from '@clerk/clerk-expo'
import Toast from 'react-native-root-toast'

const PlaceItem = ({ place, isFav, MarkFav }: any) => {

  const db = getFirestore(app)
  const { user }: any = useUser()

  const setFav = async (place: any) => {
    await setDoc(doc(db, "ev-fav-places", place?.properties?.place_id), {
      place: place,
      email: user.primaryEmailAddress?.emailAddress
    })
    MarkFav()
    Toast.show('Add Fav Successfully.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  const removeFav = async (place: any) => {
    await deleteDoc(doc(db, "ev-fav-places", place?.properties?.place_id));
    MarkFav()
    Toast.show('Remove Fav Successfully.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0, 
    });
  }

  const onDirectionClick = () => {
    const url = Platform.select({
      ios: `https://www.google.com/maps/dir/?api=1&destination=${place?.geometry?.coordinates[1]},${place?.geometry?.coordinates[0]}`,
      android: `https://www.google.com/maps/dir/?api=1&destination=${place?.geometry?.coordinates[1]},${place?.geometry?.coordinates[0]}`
    })
    Linking.openURL(url as string)
  }

  return (
    <View style={styles.container}>
      {isFav ? (
        <Pressable style={styles.icon} onPress={() => { removeFav(place) }}>
          <Ionicons name="heart" size={28} color={Colors.RED} />
        </Pressable>) : (
        <Pressable style={styles.icon} onPress={() => { setFav(place) }}>
          <Ionicons name="heart-outline" size={28} color={Colors.PRIMARY} />
        </Pressable>
      )}
      <LinearGradient colors={['transparent', '#ffffff', '#ffffff']} >
        <Image source={require('../../../assets/images/ev-charging.jpg')} style={styles.image} />
        <View style={styles.bottom}>
          <View>
            <Text style={styles.txt_name} >{place?.properties?.name}</Text>
            <Text style={styles.txt_address} >{place?.properties?.formatted}</Text>
          </View>
          <Pressable style={styles.icon_location} onPress={()=>onDirectionClick()} >
            <FontAwesome name="location-arrow" size={24} color={Colors.WHITE} />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  )
}

export default PlaceItem

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.78,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    margin: 8,
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 15,
    zIndex: -50,
  },
  txt_name: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: Colors.BLACK,
    padding: 10
  },
  txt_address: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: Colors.BLACK,
    padding: 10
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 10,
    zIndex: 1
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.65,
  },
  icon_location: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    marginTop: 10,
    borderRadius: 15
  }
})