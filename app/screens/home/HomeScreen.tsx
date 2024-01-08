import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppMapView from './AppMapView'
import Header from './Header'
import SearchBar from './SearchBar'
import { UserLocationContext } from '../../context/UserLocationContext'
import { getNearByPlaces } from '../../services/Geoapify'
import PlaceListView from './PlaceListView'
import { MarkerIndexContext } from '../../context/MarkerIndexContext'

const HomeScreen = () => {
  const { location, setLocation } = useContext(UserLocationContext)
  const [placeList, setPlaceList] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    getNearByPlaces_()
  }, [location])

  const getNearByPlaces_ = async () => {
    const result = await getNearByPlaces({
      lng: location?.longitude,
      lat: location?.latitude
    })
    setPlaceList(result?.features)
  }

  return (
    <View>
      <MarkerIndexContext.Provider value={{ selectedIndex, setSelectedIndex }}>
        <View style={styles.header}>
          <Header />
          <SearchBar searchedLocation={(location: any) => { setLocation({
            longitude: location.lng,
            latitude: location.lat
          }) }} />
        </View>
        {placeList && <AppMapView placeList={placeList} />}
        <View style={styles.placelist}>
          {placeList && <PlaceListView placeList={placeList} />}
        </View>
      </MarkerIndexContext.Provider>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  placelist: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
    paddingHorizontal: 20,
    bottom: 0,
  }
})