import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Platform,
  AsyncStorage
} from 'react-native';
import Client from '../API/Client';

import { Permissions } from 'expo-permissions'

import axios from 'axios';

export class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tokenExist:false,
      mobileExist:false
    }
    this.checkValidToken();
  }

  // Fetch the token from storage then navigate to our appropriate place
  checkValidToken = () => {
    AsyncStorage.getAllKeys().then((key) => {
      if(!key.length){this.props.navigation.navigate('PhoneLand'); }
      key.forEach(k => {
        if (k == "Token") {
          this.setState({tokenExist:true})
          AsyncStorage.getItem(k).then((token) => {
            if(!token){
              this.props.navigation.navigate('PhoneLand');
            } else {
              Client.defaults.headers['Authorization'] = `Bearer ${token}`;
              AsyncStorage.setItem('Token', token);
              this.props.navigation.navigate('SelectType')
            }
           
          })
        } else if(k=='MobileNumber'){
          if(this.state.tokenExist) { return} else { this.setState({mobileExist:true})}
          AsyncStorage.getItem(k).then((mobileNumber) => {
            Client.post('account/phone/verify/create', {
              "phone":"+962"+mobileNumber,
              "userType": "PASSENGER"
              })
              .then( (res) =>{
                  //
                  if(res.data !== "Success resent verify code!") {
                    this.props.navigation.navigate('Reg',{
                      phoneId: res.data.phoneId
                    });
                  } else {
                    this.props.navigation.navigate('PinCodeScreen',{
                      itemId: 1,
                      phoneId: mobileNumber
                      }).catch((err)=>{
                        console.log(err)
                      })
                  }
              })
          })
         
        } else {
          this.props.navigation.navigate('phoneLand')
         }
        
        AsyncStorage.getItem(k);
      })


      // axios.post(`account/is-valid`,{
      //   headers: {
      //     Accept: 'application/json;charset=UTF-8',
      //     Authorization: `Bearer ${token}`
      // }
      // })
    }).done((res)=>{
      // if(!this.state.tokenExist && !this.state.mobileExist) {
      //   this.props.navigation.navigate('PhoneLand');
      // } else if(this.state.tokenExist) {  this.props.navigation.navigate('SelectType'); } else if(this.state.mobileExist) {
      //   this.props.navigation.navigate('PinCodeScreen'); 
      //  }
    });
  };


  registerForPushNotificationsAsync = async (user) => {
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.IndicatorStyle}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

//Screen Styling
const styles = StyleSheet.create({
  IndicatorStyle: {
    flex: 1,
    justifyContent: "center"
  }
})