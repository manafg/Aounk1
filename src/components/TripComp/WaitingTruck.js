import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import * as Progress from 'react-native-progress';

const screenWidth = Math.round(Dimensions.get('window').width);

const WaitingTrip = (props) => {
    return (
        <View style={styles.scrollableModal}>

            <View style={styles.scrollableModalContent1}>
                {!props.noTruck &&
                    <Progress.Bar progress={0.3} width={screenWidth} indeterminate={true} color="#70B32F" />
                }
                {!props.noTruck ?
                    <Text style={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', marginTop: 40, fontSize: 16 }}>Searching for the nearest truck</Text>
                    :
                    <Text style={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', marginTop: 40, fontSize: 16 }}>There is no trucks available</Text>
                }
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#70B32F", marginTop: 10 }]}
                    onPress={() => { props.cancelTrip() }}
                >
                    {!props.noTruck ?
                        <Text style={{ color: 'white' }}> Cancel Request</Text>
                        :
                        <Text style={{ color: 'white' }}>Retry again later</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default WaitingTrip;

const styles = StyleSheet.create({
    scrollableModal: {
        height: 250,
    },
    scrollableModalContent1: {

        paddingBottom: 50,
        height: 250,
        backgroundColor: 'rgba(200, 200, 200,  0.7)',
    },
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
    // textWraper: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between'
    // },
    // scrollableModalText1: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     width: 200,
    //     padding: 20,
    //     marginLeft: 20,
    //     fontSize: 20,
    //     color: '#4D4D4D',
    // },
})