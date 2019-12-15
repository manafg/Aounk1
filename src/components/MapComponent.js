import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
        
    render() {
    const { mapRegion, markerCord, mapStyle,nearby, onRegionChange, markerRef } = this.props;
    let current = this.props.truckReqPayLoad ? this.props.truckReqPayLoad.current : null;
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                followUserLocation
                loadingEnabled
                showsMyLocationButton={true}
                style={[mapStyle,{ marginBottom: this.state.marginBottom }]}
                region={mapRegion}
                onRegionChange={onRegionChange}
                onMapReady={() => this.setState({ marginBottom: 1 })}
            >
                {markerCord.wherelatitude ? 
                <Marker.Animated
                    ref={markerRef}
                    coordinate={{latitude: markerCord.wherelatitude, longitude: markerCord.wherelongitude}}
                    image={require('../../assets/images/rsz_2red_pin.png')}
                    style={{width:400}}
                />
                :null
                }
                {markerCord.droplatitude ? 
                <Marker.Animated
                    ref={markerRef}
                    coordinate={{latitude: markerCord.droplatitude, longitude: markerCord.droplongitude}}
                    image={require('../../assets/images/cuurentLoc.png')}
                    style={{width:400}}
                />
                : null
                }
                {current &&
                  <MapViewDirections
                            origin={{latitude: this.props.truckReqPayLoad.current.lat, longitude: this.props.truckReqPayLoad.current.lng}}
                            destination={{latitude: this.props.truckReqPayLoad.destination.lat, longitude: this.props.truckReqPayLoad.destination.lng}}
                            apikey={'AIzaSyDZ7HSZZafEkBmuwD2CdHrLJNn3kEm39Fo'}
                />
                }
            </MapView>
        );
    }
}
