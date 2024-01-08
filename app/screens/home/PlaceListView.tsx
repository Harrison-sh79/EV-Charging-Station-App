import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import PlaceItem from './PlaceItem'
import { MarkerIndexContext } from '../../context/MarkerIndexContext'
import { useUser } from '@clerk/clerk-expo'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import { app } from '../../services/FireBase'
import { FavoriteListContext } from '../../context/FavoriteListContext'

const PlaceListView = ({ placeList }: any) => {
  const { user } = useUser()
  const db = getFirestore(app)
  const { favoriteList, setFavoriteList } = useContext(FavoriteListContext)

  const flatListRef = useRef<any>(null)
  const { selectedIndex, setSelectedIndex } = useContext(MarkerIndexContext)
  useEffect(() => {
    selectedIndex && scrollToIndex(selectedIndex)
  }, [selectedIndex])

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index: index,
      animated: true
    })
  }

  const getItemLayout = (_: any, index: number) => (
    {
      length: Dimensions.get('window').width * 0.818,
      offset: Dimensions.get('window').width * 0.818 * index,
      index
    }
  )

  useEffect(() => {
    user && getFavs()
  }, [user])

  const getFavs = async () => {
    setFavoriteList([])
    const q = query(collection(db, "ev-fav-places"), where("email", "==", user?.primaryEmailAddress?.emailAddress))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavoriteList((favoriteList:any) => [...favoriteList, doc.data()])
    })
  }

  const isFav = (place: any) => {
    const result = favoriteList && favoriteList.find((item: any) => item.place.properties.place_id === place.properties.place_id)
    return result ? true : false
  }

  return (
    <View>
      <FlatList
        data={placeList}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        renderItem={({ item, index }: any) => (
          <View key={index}>
            <PlaceItem place={item} isFav={isFav(item)} MarkFav={()=>getFavs()}/>
          </View>
        )}
        horizontal={true}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default PlaceListView

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 10,
    width: '100%',
  },
  itemtext: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
  }
})
