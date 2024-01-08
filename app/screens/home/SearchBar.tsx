import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { getAddressList, getLocationList } from '../../services/MapBox'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';


const SearchBar = ({ searchedLocation }: any) => {

  const [searchValue, setSearchValue] = useState('')
  const [searchAddressList, setSearchAddressList] = useState([])
  const [isShowList, setIsShowList] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const onChange = (text: any) => {
    setSearchValue(text)
  }

  useEffect(() => {
    const timer_input = setTimeout(async () => {
      if (searchValue != '' && searchValue != undefined) {
        if (selectedItem != '' && selectedItem != undefined) {
          setIsShowList(false)
        } else {
          const result = await getLocationList(searchValue)
          setIsShowList(true)
          setSearchAddressList(result)
          setSelectedItem('')
        }

      } else {
        setIsShowList(false)
        setSearchAddressList([])
        setSelectedItem('')
      }
    }, 500)
    return () => {
      clearTimeout(timer_input)
    }
  }, [searchValue])

  // function onPlaceSelect(value: any) {
  //   console.log(value);
  // }

  // function onSuggectionChange(value: any) {
  //   console.log(value);
  // }

  const onPress = (item: any) => {
    setSearchValue(item.place_name)
    setSelectedItem(item.place_name)
    setIsShowList(false) 
    searchedLocation({
      lng: item?.center[0],
      lat: item?.center[1]
    })
  }

  return (
    <View>
      {/* <GooglePlacesAutocomplete
        placeholder='Search EV Charging Station'
        enablePoweredByContainer={false}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // console.log(data, details);
          console.log('test')
        }}
        query={{
          key: 'AIzaSyB9PNNGkMsv4D44recD2k0XFcravi7Fh3Q',
          language: 'en',
        }}
      /> */}
      {/* <GeoapifyContext apiKey="1ea55f028a9e41b182d7c3741a5c2ebd">
        <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
          type={ 'city'}
          lang={'en'}
          // position={{lat:}}
          countryCodes={['us']}
          limit={6}
          // value={displayValue}
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggectionChange}
        />
      </GeoapifyContext> */}
      <View style={styles.search}>
        <Ionicons name="location-sharp" size={24} color={Colors.GRAY} />
        <TextInput placeholder='Please input location'
          onChangeText={onChange}
          value={searchValue}
          clearButtonMode='while-editing'
          style={styles.searchtext}
        ></TextInput>
      </View>
      <View style={[isShowList && styles.dropdownlist]}>
        {
          (isShowList && searchAddressList?.length > 0) && searchAddressList.map((item: any, index: number) => {
            return (
              <TouchableOpacity key={index} style={styles.dropdownitem}
                onPress={() => { onPress(item) }}
              >
                <Text style={styles.dropdowntext}>{item.place_name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  search: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchtext: {
    width: '90%',
    paddingLeft: 10,
    fontFamily: 'outfit-semibold',
    fontSize: 18
  },
  dropdownlist: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginTop: 2,
    transform: 'translate 1px 0 0',
    duration: 1,
  },
  dropdownitem: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  dropdowntext: {
    fontFamily: 'outfit-medium',
    fontSize: 15
  }
})
