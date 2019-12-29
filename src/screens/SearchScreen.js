import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from '../common/theme';

export default class SearchScreen extends Component {
    componentWillMount() {
        let from = this.props.navigation.getParam('from');
        let whereText = this.props.navigation.getParam('whereText');
        let dropText = this.props.navigation.getParam('dropText');
        let pageName = this.props.navigation.getParam('pageName');
        this.setState({
            from: from,
            whereText: whereText,
            dropText: dropText
        })
    }

    goMap(data,details,from) {
        let pageName = this.props.navigation.getParam('pageName');
        if(from=="where") {
            let searchObj = {
                searchData: data, 
                searchDetails: details, 
                searchFrom: from,
                whereText: details.formatted_address,
                dropText: this.state.dropText
            }
           
            let oldData = this.props.navigation.getParam('old');
            oldData.wherelatitude = details.geometry.location.lat,
            oldData.wherelongitude = details.geometry.location.lng,
            oldData.whereText = details.formatted_address 
            if(pageName){
                this.props.navigation.replace('Movingfurniture',{ searchObj: searchObj,old:oldData}); 
            } else {
                    this.props.navigation.goBack();
                    this.props.navigation.state.params.pres(searchObj, oldData);
            }       
        }
        else if(from=='drop'){
            let searchObj = {
                searchData: data, 
                searchDetails: details, 
                searchFrom: from,
                whereText: this.state.whereText,
                dropText: details.formatted_address
            }
            
            let oldData = this.props.navigation.getParam('old');
            oldData.droplatitude = details.geometry.location.lat,
            oldData.droplongitude = details.geometry.location.lng,
            oldData.droptext = details.formatted_address
            if(pageName){
                this.props.navigation.replace('Movingfurniture',{ searchObj: searchObj,old:oldData}); 
            } else {
                this.props.navigation.state.params.pres(searchObj, oldData);
                this.props.navigation.goBack(); 
            }    
        }

    }
    render() {
  return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={true}
           
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'  // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            textInputProps={{ clearButtonMode: 'while-editing' }}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                this.goMap(data,details,this.state.from);
            }}
            
            getDefaultValue={() => ''}
            
            query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyBnWPt2F4ituHwWHrzHisaHvuFTFydUwc4',
                language: 'en', // language of the results
                components: 'country:jo'
                // types: '(cities)' // default: 'geocode'
            }}
            
            styles={{
                container: {
                    marginTop: Platform.OS=='android' ? StatusBar.currentHeight : 44,
                    backgroundColor: colors.GREY.default
                },
                textInputContainer: {
                    width: '100%',
                },
                description: {
                    fontWeight: 'bold'
                },
                description: {
                    color: colors.WHITE
                },
                predefinedPlacesDescription: {
                    color: colors.BLUE.light
                },
            }}
            renderDescription={(row) => row.description || row.formatted_address || row.name}
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                key: 'AIzaSyDZ7HSZZafEkBmuwD2CdHrLJNn3kEm39Fo',
                language: 'en',  
            }}
            GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'establishment'
            }}

            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
    );
    }
}