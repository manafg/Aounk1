import React from 'react';
import Client from '../API/Client';
import { View, Text, Image , TouchableWithoutFeedback} from 'react-native';
import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';


export default class SingleOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        const { requestId } = this.props.navigation.state.params;
        Client.get(`requests/move-furniture/offers/${requestId}`).then((res) => {
            debugger
            this.setState({ data: res.data })
        })
    }

    acceptOffer() {
        const { requestId } = this.props.navigation.state.params;
        Client.post(`requests/move-furniture/offers/${requestId}/accept`, {}).then((res) => {
            this.setState({ data: res.data })
        })
    }

    render() {
        let userData = this.state.data ? this.state.data.getDriver :null;
        let offerData = this.state.data?this.state.data.offer :null;
        return (
            <View style={{ 
            alignItems: "center", flex:1}}>
             <Header
                    backgroundColor={"#E0E1E3"}
                    leftComponent={{ icon: 'md-menu', type: 'ionicon', color: "#FFF", size: 30, component: TouchableWithoutFeedback, onPress: () => { this.props.navigation.dispatch(DrawerActions.toggleDrawer()) } }}
                    centerComponent={<Text >Offers</Text>}
                    innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
                />
            <View style={{justifyContent: "center", 
            alignItems: "center", flex:1}}>
            
            {this.state.data && 
                <Card
                    imageWrapperStyle={{justifyContent:'center', alignItems:'center'}}
                    containerStyle={{width:'90%', height:'80%'}}
                    title={`${userData.profile.name}`}
                    imageStyle={{width:150,height:150 }}
                    image={require('../../assets/images/userThumb.png')}>
                    <Text style={{ marginBottom: 20 , marginTop:60,  fontSize:20 }}>
                       Price : {offerData.price} JOD
                    </Text>
                    <Text style={{ marginBottom: 20, fontSize:20 }}>
                       Phone : {userData.phone} 
                    </Text>
                    <Text style={{ marginBottom: 20 ,fontSize:20  }}>
                        Emai : {userData.email} 
                    </Text>
                    <Button
                        style={{marginTop:40,  }}
                        icon={<Icon name='check' color='#ffffff' />}
                        buttonStyle={{backgroundColor:"#70B32F", borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='Accept' />
                </Card> }
            </View>
            </View>
        )
    }
}
