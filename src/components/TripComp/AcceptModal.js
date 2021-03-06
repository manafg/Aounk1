import React from 'react';
import { 
    StyleSheet, 
    Image,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';
  import {  Icon } from 'react-native-elements';
  import { colors } from '../../common/theme';

  


export default class AcceptModal extends React.Component {
 
  render() {
    let data =this.props.data.data;
    let name = data.profile ? data.profile.name : "Manaf Hgh";
    return (
        <View style={styles.scrollableModal}>

        <View style={styles.scrollableModalContent1}>
            <View style={styles.contentWraper}>
                <View style={styles.userImageView}>
                    <Image
                        source={require('../../../assets/images/profilePic.png')}
                        style={styles.imageStyle}
                    />

                </View>
                <View style={styles.headerTextStyle}>
                    <Text style={styles.ProfileNameStyle}>{name}</Text>
                </View>
                <View style={styles.rating}>
                    <Icon
                        style={{ padding: 10 }}
                        name='star'
                        type='material-community'
                        color={"#FBAE17"}
                        size={23}
                        containerStyle={{ flex: 1 }}
                    />
                    <Text style={styles.ratingText}>4.8</Text>
                </View>
                <View style={styles.subTextSec}>
                    <Text style={styles.subText}>Your Driver Will arrive in {data.time ? data.time : "10 min"}</Text>
                </View>
                <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${phone}`)}} style={styles.buttonGrid}>
                    <Icon
                        style={{ padding: 5 }}
                        name='ios-call'
                        type='ionicon'
                        color={"#72BE44"}
                        size={30}
                        containerStyle={{ flex: 1 }}
                    />
                    <Text style={styles.ratingText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props._showMessage()}} style={[styles.buttonGrid,{left:140}]}>
                    <Icon
                        style={{ padding: 5 }}
                        name='ios-chatboxes'
                        type='ionicon'
                        color={"#72BE44"}
                        size={30}
                        containerStyle={{ flex: 1 }}
                    />
                    <Text style={styles.ratingText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonGrid,{left:250}]}>
                    <Icon
                        style={{ padding: 5 }}
                        name='md-close'
                        type='ionicon'
                        color={"#72BE44"}
                        size={30}
                        containerStyle={{ flex: 1 }}
                    />
                    <Text style={styles.ratingText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
                style={styles.button}
            >
                <Text style={{ color: 'white', marginTop: 10, fontSize: 16, fontWeight: 'bold' }}> Accept Trip</Text>
            </TouchableOpacity> */}

        </View>

    </View>
    );
  }
}

//style for this component
const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        width: '80%',
        padding: 10,
        height: 60,
        marginTop: 150,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#0D1C60',
    },
    rating: {
        position: 'absolute',
        top: 60,
        left: 140,
        width: 70,
        flex: 1,
        flexDirection: 'row'
    },
    headerTextStyle: {
        position: 'absolute',
        top: 30,
        left: 140,
        width: 180,
    },
    imageStyle: {
        width: 80,
        height: 80
    },
    scrollableModal: {
        height: 250,
    },
    scrollableModalContent1: {
        paddingBottom: 50,
        height: 250,
        backgroundColor: 'rgba(200, 200, 200,  0.7)',
    },
    contentWraper: {
        position: 'absolute',
    },
    userImageView: {
        width: 84,
        height: 84,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        left: 40,
        top: 20,
        borderColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    ProfileNameStyle: {
        fontWeight: 'bold',
        color: "#0D1C60",
        fontSize: 18,
        textAlign: "center"
    },
    subTextSec: {
        position: 'absolute',
        top: 90,
        width: 150,
        left: 150,
        width: 160,
        flex: 1,
    },
    buttonGrid:{
        position: 'absolute',
        top: 150,
        left: 30,
        width: 100,
        flex: 1,
        flexDirection:'row'
    },
    subText: {
        width: 140,
        color: "#666666"
    },
    ratingText: {
        color: "#808080",
        fontSize: 24
    },
});
