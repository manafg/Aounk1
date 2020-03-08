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
                { Status: 'Your Booking with GT908753 is confirm,please wait for ride', time: '2 mins ago' },
                { Status: 'Your Booking with GT908753 is cancelled successfully', time: '10 mins ago' },
                { Status: 'Your payment Successfully submitted', time: '2 days ago' },
                { Status: 'Hey Sudipta!Your ride is completed', time: '10 Oct,2018' },
                { Status: 'Your Booking with GT908753 is confirm,please wait for ride', time: '5 Oct,2018' },
                { Status: 'Your Booking with GT908753 is confirm,please wait for ride', time: '2 mins ago' },
                { Status: 'Your Booking with GT908753 is cancelled successfully', time: '10 mins ago' },
                { Status: 'Your payment Successfully submitted', time: '2 days ago' },
                { Status: 'Hey Sudipta!Your ride is completed', time: '10 Oct,2018' },
                { Status: 'Your Booking with GT908753 is confirm,please wait for ride', time: '5 Oct,2018' },
                { Status: 'Your Booking with GT908753 is confirm,please wait for ride', time: '2 mins ago' },
                { Status: 'Your Booking with GT908753 is cancelled successfully', time: '10 mins ago' },
                { Status: 'Your payment Successfully submitted', time: '2 days ago' },
                { Status: 'Hey Sudipta!Your ride is completed', time: '10 Oct,2018' },
                { Status: 'Your Booking with GT908753 is confirm,please wait for ride', time: '5 Oct,2018' },
            ],
        }
        this.newData = this.newData.bind(this)
    }
    onPressButton() {
        alert("hello");
    }

    newData = ({ item }, props) => {
        debugger
        return (
            <View>
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
                                    source={require('../../assets/images/cablogo.png')}
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
            <View style={{ flex: 1 }}>
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