import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyle from '../../utils/MapViewStyle.json'
import { UserLocationContext } from '../../context/UserLocationContext'
import { MarkerIndexContext } from '../../context/MarkerIndexContext'

const AppMapView = ({ placeList }: any) => {

  const { location, setLocation } = useContext(UserLocationContext)
  const { selectedIndex, setSelectedIndex } = useContext(MarkerIndexContext)

  return location?.latitude && (
    <View>
      <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        customMapStyle={MapViewStyle}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.012,
          longitudeDelta: 0.0181
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}>
          <Image source={require('../../../assets/images/marker/repair-shop(5).png')}
            style={styles.img_marker} />
        </Marker>
        {placeList && placeList.map((place:any, index:number) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.geometry.coordinates[1],
              longitude: place.geometry.coordinates[0]
            }}
            onPress={()=>setSelectedIndex(index)}
            >
            <Image source={require('../../../assets/images/marker/repair-shop.png')}
              style={styles.img_marker} />
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

export default AppMapView

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 15
  },
  img_marker: {
    width: 50,
    height: 50
  }
});