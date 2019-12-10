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
    this.checkValidToken();
  }

  // Fetch the token from storage then navigate to our appropriate place
  checkValidToken = () => {
    this.props.navigation.navigate('Login')
    return
    AsyncStorage.getAllKeys().then((key) => {
      key.forEach(k => {
        if (k == "Token") {
          AsyncStorage.getItem(k).then((token) => {
            if(!token){
              this.props.navigation.navigate('Login')
            }
            axios.get(`http://api.ibshr.com/api/account/is-valid`, {
              headers: {
                Accept: 'application/json;charset=UTF-8',
                Authorization: `Bearer ${token}`
              }
            }).then((res)=>{
              if(res.data.isValidToken) {
                Client.defaults.headers['Authorization'] = `Bearer ${token}`;
                AsyncStorage.setItem('Token', token);
                this.props.navigation.navigate('SelectType')
              }else {
                axios.get(`http://api.ibshr.com/api/account/refresh-token`,{
                  headers: {
                    Accept: 'application/json;charset=UTF-8',
                    Authorization: `Bearer ${token}`
                  }
                }).then((res)=>{
                  AsyncStorage.setItem('Token', res.data.token);
                  Client.defaults.headers['Authorization'] = `Bearer ${token}`;
                  this.props.navigation.navigate('SelectType')
                })
              }
            }).catch((res)=>{
            })
          })
        }
        AsyncStorage.getItem(k);
      })


      // axios.post(`account/is-valid`,{
      //   headers: {
      //     Accept: 'application/json;charset=UTF-8',
      //     Authorization: `Bearer ${token}`
      // }
      // })
    }).done();
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