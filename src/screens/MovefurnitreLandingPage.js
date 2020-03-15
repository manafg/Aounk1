import React from 'react';
import { View,Text, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

export default class MovefurnitreLandingPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{backgroundColor:'#E0E1E3', height:'100%'}}>
                <Header
                    backgroundColor={"#00164F"}
                    leftComponent={{ icon: 'ios-arrow-back', type: 'ionicon', color: "#FFF", size: 30, component: TouchableWithoutFeedback, onPress: () => { this.props.navigation.goBack()} }}
                    centerComponent={<Text style={{
                        width: '100%',
                        marginLeft: '20%',
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>Moving-Furniture</Text>}
                    innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
                />
                <View style={styles.container}>

                    <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Movingfurniture')}} style={styles.buttonWraper}>
                        <Image style={styles.Image} source={require('../../assets/images/CreateNew.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('OffersPage')}} style={styles.buttonWraper}>
                        <Image style={styles.Image} source={require('../../assets/images/newOffers.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#E0E1E3',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    buttonWraper: {
       
    },
    Image:{
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius:9,
        borderColor: '#C7C9CB',
        width: 200,
        height: 200
    }
})