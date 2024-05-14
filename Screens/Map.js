import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker, Callout } from 'react-native-maps'
import { Text, Icon, SearchBar, Button } from '@rneui/themed'

export default class Map extends React.Component {



  constructor (props) {
    super(props)
    this.state = {
      latitude: 24.723456,
      longitude: 46.70095,
      places: [],
      searchString: "",
      distance: 40,
      selectedPlace: null,
    }

  }

  componentDidMount = () => {
    this.setState({
      places: placeData
    })
  }

  getMyLocation = () => {
    Geolocation.getCurrentPosition(loc => {
      this.mapRef.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      this.setState({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      })
    })
  }

  searchSection = () => {

    const handleSearch = () => {
      let filteredPlaces = placeData.filter(g => g.name.toLowerCase().includes(this.state.searchString.toLowerCase()))
      this.setState({
        places: filteredPlaces
      })
    }

    const handleReset = () => {
      this.setState({ places: placeData })
    }


    return (
      <View style={{ height: '35%', backgroundColor: '#0000', flexDirection: 'column' }} >
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, margin: 10 }}>
          Search
        </Text>
        <SearchBar
          placeholder="Search Here..."
          ref={search => this.search = search}
          onChangeText={(text) => { this.setState({ searchString: text }) }}
          value={this.state.searchString}
          lightTheme={true}
          round={true}
          containerStyle={{ backgroundColor: '#0000' }} />
        <View style={{ padding: 10 }}>
          <Text style={{ textAlign: 'center' }}>
            Distancia: KM
          </Text>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Button onPress={() => { handleReset() }}
              containerStyle={{ width: '49%', borderRadius: 5, marginHorizontal: 2 }}
            >
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, margin: 10 }}>
                Reset
              </Text>
              <Icon name='refresh' color='white' />
            </Button>
            <Button onPress={() => { handleSearch() }}
              containerStyle={{ width: '49%', borderRadius: 5, marginHorizontal: 2 }}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, margin: 10 }}>
                Buscar
              </Text>
              <Icon name='ei-search' color='white' />
            </Button>
          </View>
        </View>
      </View >
    )
  }

  mapSection = () => {
    return (
      <View style={{ height: "65%" }}>
        <MapView style={{ ...StyleSheet.absoluteFill }}
          provider="google"
          onMapReady={() => { this.getMyLocation() }}
          ref={(ref) => { this.mapRef = ref }}
          initialRegion={{
            latitude: 6.8523,
            longitude: 79.8895,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {
            this.state.places.map((iGym) => {
              return (
                <Marker coordinate={{ latitude: iGym.latitude, longitude: iGym.longitude }}>
                  <Callout style={{ height: 150, width: 150 }} onPress={() => { selectedPlace(iGym) }}>
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                      <Text> {iGym.name} </Text>
                      <Image style={{ width: 150, height: 100, }} source={{ uri: iGym.img }} />
                      <Text style={{ fontStyle: 'italic' }}> Tap for more details...</Text>
                    </View>
                  </Callout>
                </Marker>
              )
            })
          }
        </MapView>
      </View>
    )
  }

  render () {
    return (
      <View style={{ flexDirection: 'column', paddingTop: 45, backgroundColor: '#0000' }} >
        {this.searchSection()}
        {this.mapSection()}
      </View >
    )
  }
}

let placeData = [
  {
    id: 1,
    name: "TK MMA",
    img: "https://placehold.co/150x100",
    latitude: 25.089779597788468,
    longitude: 55.15274596790836,
  },
  {
    id: 2,
    name: "UFC Gym - JBR",
    img: "https://placehold.co/150x100",
    latitude: 25.08270502809145,
    longitude: 55.13996748695172,
  }
]