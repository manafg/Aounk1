import React from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { colors } from '../common/theme';
const devWidth = Dimensions.get("window").width;

export default class OffersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
              
            ],
        }
        this.newData = this.newData.bind(this)
    }
    onPressButton() {
        alert("hello");
    }

    newData = ({ item }, props) => {
        return (
            <View >
            <TouchableOpacity onPress={()=>{
                debugger
                props.props.navigation.navigate('SingleOffer',{
                            requestId:item._id
                        })
            }} style={styles.container}>
                <View style={styles.divCompView}>
                    <View style={styles.containsView}>
                        <View style={styles.statusStyle}>
                            <View style={styles.imageHolder}>
                                <Image
                                    style={styles.cabLogoStyle}
                                    source={require('../../assets/images/logo.png')}
                                />
                            </View>
                            <View style={styles.statusView}>
                                <View style={styles.textFormat}>
                                    <Text style={styles.textStyle}>You have Recived Offer with :{item.price} JOD</Text>
                                   
                                </View>
                                <View style={styles.clockIconStyle}>
                                   
                                    <Text style={styles.textColor}>View More ...</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1}}>
            <View style={{alignItems:'center', padding:20}} >
                <Text style={{fontSize:24, fontWeight:'bold', color:'#70B32F'}}> Offers Recived </Text>
            </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.offers}
                    renderItem={(item)=>this.newData(item,this.props)}
                />
            </View>
        );
    }
};
const styles = StyleSheet.create({
    myHeader: {
        marginTop: 0,
    },
    container: {
        flex: 1
    },
    divCompView: {
        borderWidth: 1,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: colors.GREY.primary,
        borderColor: colors.GREY.primary,
        flexDirection: 'row',
        flex: 1
    },
    imageHolder: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius: 50 / 2,
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.WHITE,
        backgroundColor: colors.WHITE,
        padding: 3
    },
    containsView: {
        justifyContent: 'center',
    },
    statusStyle: {
        flexDirection: 'row'
    },
    statusView: {
        flexDirection: 'column',
        marginLeft: 5
    },
    textStyle: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
    },
    textColor: {
        color: colors.GREY.iconPrimary,
        alignSelf: 'center',
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        paddingLeft: 5
    },
    textFormat: {
        flex: 1,
        width: devWidth - 100
    },
    cabLogoStyle: {
        width: 25,
        height: 28,
        flex: 1
    },
    clockIconStyle: {
        flexDirection: 'row'
    },
    iconPositionStyle: {
        alignSelf: 'flex-start'
    }
});