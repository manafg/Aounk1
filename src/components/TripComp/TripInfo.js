import React from 'react';
import { 
    StyleSheet, 
    Image,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';
  import {  Icon } from 'react-native-elements';
  import { colors } from '../../common/theme'

  const TripInfo = (props) => {
      return (
        <View style={styles.scrollableModal}>
        <View style={styles.scrollableModalContent1}>
            <View style={[styles.textWraper,{marginBottom:5}]}>
                <Text style={styles.scrollableModalText1}>

                    Price :
            </Text>
                <Text style={styles.scrollableModalText1}>
                    {props.price.toFixed(2)} JOD
                </Text>
            </View>
            <View style={styles.textWraper}>
                <Text style={styles.scrollableModalText1}>
                    Time :
            </Text>
                <Text style={styles.scrollableModalText1}>
                    {props.time}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { props.requestTruck() }}
            >
                <Text style={{ color: 'white' }}> Confirm </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: "#70B32F", marginTop: 10 }]}
                onPress={() => {props.cancelTrip()}}
            >
                <Text style={{ color: 'white' }}> Cancel </Text>
            </TouchableOpacity>

        </View>

    </View>
      )
  }

  export default TripInfo;

  const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        width: '80%',
        padding: 10,
        height: 40,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#0D1C60',
    },
    scrollableModal: {
        height: 250,
    },
    scrollableModalContent1: {

        paddingBottom: 50,
        height: 250,
        backgroundColor: 'rgba(200, 200, 200,  0.7)',
    },
    textWraper: {
        flex: 1,
        flexDirection: 'row',
        
        justifyContent: 'space-between'
    },
    scrollableModalText1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        padding: 10,
        marginLeft: 20,
        fontSize: 20,
        color: '#4D4D4D',
    },
  })