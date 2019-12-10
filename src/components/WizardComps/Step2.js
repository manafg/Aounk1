import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


export default class StepTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: null
        }
    }



    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})