import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

const EmptyComp = (props) => {
    return (
    <View style={styles.notifyStyle}>
        <Image
            style={styles.imageStyle}
            source={require('../../assets/images/Notification.png')}
        />
        <Text style={{ fontSize: 20, marginTop: 20, fontWeight: 'bold' }}>{props.message}</Text>
    </View>
    )
}

export default EmptyComp;

const styles = StyleSheet.create({
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
