import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons'

const Header = () => {
  const { user } = useUser()
  return (
    <View style={styles.header}>
      <Image source={{ uri: user?.imageUrl }} style={styles.img_user} />
      <Image source={require('../../../assets/images/logo.png')} style={styles.img_user} />
      <FontAwesome name="filter" size={24} color="black" />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  img_user: {
    height: 40,
    width: 40,
    borderRadius: 25
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 25,
    objectFit: 'contain'
  }
})
