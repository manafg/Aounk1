import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Button,
    TouchableOpacity,
    Text,
    FlatList,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import Client from '../API/Client'
import { DrawerActions } from 'react-navigation'
import { Header, PricingCard } from 'react-native-elements';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

export default class OffersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: []
        }
    }

    componentDidMount() {
        Client.get(`requests/move-furniture`).then((res) => {
             
            this.setState({
                offers: res.data
            })
        }).catch((res)=>{ })
    }

    newData = ({ item }) => {
        return (
            <View style={styles.innerContainer}>
                <PricingCard
                    color="#72BE44"
                    title="You have "
                    onButtonPress={() => {
                         
                        this.props.navigation.navigate('offersDetail',{
                            requestId:item._id
                        })
                    }}
                    price="3 offers"
                    info={['1 LB', 'Cleaning', 'Wraping Fetautr']}
                    button={{ title: 'View More'}}
                />
            </View>
        )
    }

    render() {
        return (
                 
            <View style={styles.container}>
               <Header
                    backgroundColor={"#00164F"}
                    leftComponent={{ icon: 'md-menu', type: 'ionicon', color: "#FFF", size: 40, component: TouchableWithoutFeedback, onPress: () => { this.props.navigation.dispatch(DrawerActions.toggleDrawer()) } }}
                    centerComponent={<Text style={styles.headerTitleStyle}>Offers</Text>}
                    outerContainerStyles={styles.headerStyle}
                    innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
                />
                {this.state.offers.length ?
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.offers}
                        renderItem={this.newData}
                    />
                    :
                    <Text> There is no offers yet </Text>
                }

            </View>
           
        )
    }
}

const styles = StyleSheet.create({
    headerTitleStyle:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
    container: {
        flex: 1,
    },
    innerContainer:{
        marginTop:40
    }
})