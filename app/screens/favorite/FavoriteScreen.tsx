import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../../utils/Colors'
import { app } from '../../services/FireBase'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import { FavoriteListContext } from '../../context/FavoriteListContext'
import { useUser } from '@clerk/clerk-expo'
import PlaceItem from '../home/PlaceItem'

const FavoriteScreen = () => {

  const { user } = useUser()
  const db = getFirestore(app)
  const { favoriteList, setFavoriteList } = useContext(FavoriteListContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    user && getFavs()
  }, [user])

  const getFavs = async () => {
    setLoading(true)
    setFavoriteList([])
    const q = query(collection(db, "ev-fav-places"), where("email", "==", user?.primaryEmailAddress?.emailAddress))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavoriteList((favoriteList: any) => [...favoriteList, doc.data()])
      setLoading(false)
    })
  }

  const isFav = (place: any) => {
    const result = favoriteList && favoriteList.find((item: any) => item.place.properties.place_id === place.properties.place_id)
    return result ? true : false
  } 

  return (
    <View>
      {!favoriteList && (<View style={styles.activity}>
        <ActivityIndicator size={'large'} color={Colors.PRIMARY} />
        <Text style={styles.loading}>Loading...</Text>
      </View>)}
      <View>
        <FlatList
          data={favoriteList}
          onRefresh={()=>getFavs()}
          refreshing={loading}
          renderItem={({ item, index }: any) => (
            <View key={index}>
              <PlaceItem place={item.place} isFav={true} MarkFav={() => getFavs()} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({
  activity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  loading: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: Colors.BLACK,
    padding: 10,
    textAlign: 'center'
  }
})