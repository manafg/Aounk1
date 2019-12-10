import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../common/theme'

const StartedTrip = (props) => {
    return (
        <View style={styles.scrollableModal}>
            <View style={styles.scrollableModalContent1}>
                <Text style={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', marginTop: 40, fontSize: 16 }}>Your Trip has STARTED</Text>
            </View>
        </View>
    )
}

export default StartedTrip;

const styles = StyleSheet.create({
    scrollableModal: {
        height: 250,
    },
    scrollableModalContent1: {

        paddingBottom: 50,
        height: 250,
        backgroundColor: 'rgba(200, 200, 200,  0.7)',
    },
    // button: {
    //     borderRadius: 10,
    //     width: '80%',
    //     padding: 10,
    //     height: 40,
    //     alignItems: 'center',
    //     marginLeft: 40,
    //     marginRight: 40,
    //     backgroundColor: '#0D1C60',
    // },
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