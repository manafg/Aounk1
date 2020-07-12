import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

const EmptyComp = (props) => {
    return (
    <View style={styles.notifyStyle}>
        <Image
            style={styles.imageStyle}
            source={ props.image ? require("../../assets/images/credit-card.png") :  require('../../assets/images/Notification.png') }
        />
        <Text style={{ fontSize: 20, marginTop: 20, fontWeight: 'bold' }}>{props.message}</Text>
        {props.image && 
        <TouchableOpacity
                style={styles.button}
                onPress={() => { props.navigate() }}
            >
                <Text style={{ color: 'white' }}> New Card </Text>
     </TouchableOpacity>
    }
    </View>
    )
}

export default EmptyComp;

const styles = StyleSheet.create({
    button: {
        marginTop:40,
        borderRadius: 10,
        width: '80%',
        padding: 10,
        height: 40,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#0D1C60',
    },
    container:{
        zIndex:999,
        flex:1
    },
    notifyStyle:{
        alignItems:'center',
        marginTop:150
    },
    imageStyle:{
        width: 80, 
        height: 100
    },
})
