import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { MapComponent } from '../../components';
import { Input, Icon , CheckBox} from 'react-native-elements';
import { View, TouchableOpacity, StyleSheet,Text, Button, Dimensions } from 'react-native';
import { colors } from '../../common/theme';

var { width } = Dimensions.get('window');

export default class StepTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: null,
            whereText: "Load Localtion",
            dropText: "Off-Load Localtion",
        }

        this.passData = {
            droplatitude: 0,
            droplongitude: 0,
            droptext: "",
            whereText: "",
            wherelatitude: 0,
            wherelongitude: 0,
            carType: '',
        }
    }

    async componentWillMount() {
        let searchObj = await this.props.navigation.getParam('searchObj') ? this.props.navigation.getParam('searchObj') : null;
        if (searchObj) {
            if (searchObj.searchFrom == 'where') {
                if (searchObj.searchDetails) {
                    this.setState({
                        region: {
                            latitude: searchObj.searchDetails.geometry.location.lat,
                            longitude: searchObj.searchDetails.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        whereText: searchObj.whereText,
                        dropText: searchObj.dropText
                    })
                    this.passData = this.props.navigation.getParam('old');
                    this.setState({
                        carType: this.passData.carType
                    }, () => { })
                }
            }
            else {
                if (searchObj.searchDetails) {
                    this.setState({
                        region: {
                            latitude: searchObj.searchDetails.geometry.location.lat,
                            longitude: searchObj.searchDetails.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        whereText: searchObj.whereText,
                        dropText: searchObj.dropText
                    })
                    this.passData = this.props.navigation.getParam('old');
                    this.setState({
                        carType: this.passData.carType
                    }, () => { })
                }
            }
        }
    }



    render() {

        return (

            <View style={styles.container}>
                <TouchableOpacity style={styles.searchView}  onPress={() => { this.props.navigation.navigate('Search', { from: "where", pageName:'moveFurn', whereText: this.state.whereText, dropText: this.state.dropText, old: this.passData }); }}>
                    <View style={styles.textIconStyle}>
                        <Icon
                            style={{ padding: 50 }}
                            name='location-pin'
                            type='entypo'
                            color={"#70B32F"}
                            size={23}
                            containerStyle={{ flex: 1 }}
                        />
                        <Text numberOfLines={1} style={styles.textStyle}>{this.state.whereText}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  style={[styles.searchView, { top: 20 }]} onPress={() => { this.props.navigation.navigate('Search', { from: "drop", pageName:'moveFurn', whereText: this.state.whereText, dropText: this.state.dropText, old: this.passData }); }}
                >
                    <View style={styles.textIconStyle}>
                        <Icon
                            style={{ padding: 10 }}
                            name='location-pin'
                            type='entypo'
                            color={"#00164F"}
                            size={23}
                            containerStyle={{ flex: 1 }}
                        />
                        <Text numberOfLines={1} style={styles.textStyle}>{this.state.dropText}</Text>
                    </View>
                </TouchableOpacity>
                <MapComponent markerRef={marker => { this.marker = marker; }} truckReqPayLoad={this.state.truckReqPayLoad} mapStyle={styles.map} mapRegion={this.state.region}/*  onRegionChange={(region)=>{this.setState({region: region})}} */ markerCord={this.passData} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mapcontainer: {
        flex: 6,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textIconStyle: {
        paddingLeft:10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textStyle: {
        marginLeft:10,
        flex: 9,
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: '400',
        color: colors.GREY.secondary
    },
    searchView: {
        borderColor: "#AEB0B3",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        width: '90%',
        height: 50,
        zIndex: 999
    },
    container: {
        flex: 1,
        height:'100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        borderRadius:10,
        height:350,
        marginTop:150,
        marginLeft:20,
        marginRight:20,
        ...StyleSheet.absoluteFillObject,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})