import React, { Component } from 'react';
import { 
    StyleSheet,
    View,             
    Image,
    ImageBackground,
    Button,
    Text
  } from 'react-native';
import { LoginComponent, Background, ForgotPassModal} from '../components';
import Client from '../API/Client';
import {AsyncStorage} from 'react-native';




export default class LoginScreen extends Component {
    constructor(props){
      super(props);
      this.state = {
          email:'',
          password:'',
          emailValid:true,
          passwordValid:true,
          showForgotModal:false,
          emailerror:null
      }
    }

    closeModal(){ 
        this.setState({ showForgotModal: false })
    }

    //go to register page
    onPressRegister() {
        this.props.navigation.navigate('Reg');
    }

    //forgot password press
    forgotPassPress() {
        this.setState({showForgotModal:true})
    }
    
    onPressForgotPass(email) {
            this.setState({showForgotModal:false},()=>{
              setTimeout(() => {
                  alert('A Password Reset Link sent to your email please check and reset your New Password')        
              }, 600);
          });
        
    }

    async onPressLogin(email, password){
      let logData = {
        // "email":"Manafhgh22@gmail.com",
        // "password":"manafG1992@"
        "email":"passenger@mailinator.com",
        "password":"hash-this"
        
      }
      Client.post('account/users/login', logData).then((res)=>{
        let role = res.data.user.roles[0] == "PASSENGER"
        if(!role){
          Alert.alert(
            '',
            'Error username and password',
            [
             
              {text: 'Confirem', onPress: () => this.cancelTrip()},
            ],
            {cancelable: false},
          );
        }
        AsyncStorage.setItem('userID',res.data.user.userId);
        AsyncStorage.setItem('Profile',res.data.user.profile.name)
        AsyncStorage.setItem('Token', res.data.token);
        Client.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
        this.props.navigation.navigate('SelectType')
      }).catch((res)=>{
      })
    }

  render() {
    return (
      <ImageBackground style={[styles.imgBackground, { paddingTop: 240 }]}
      resizeMode='cover'
      source={require('../../assets/images/login.png')}>
            <View style={styles.logInCompStyl}/>
            <View style={styles.containerView}>
              <Text>PASSENGER</Text>
              <LoginComponent
                complexity={'any'}
                onPressRegister={()=>{this.onPressRegister()}} 
                onPressLogin={(email, password)=>this.onPressLogin(email, password)} 
                onPressForgotPassword={()=>{this.forgotPassPress()}}
              />
            </View>

            <ForgotPassModal
                modalvisable={this.state.showForgotModal}
                requestmodalclose={()=>{this.closeModal()}}

                inputEmail={this.state.email}
                emailerrorMsg={this.state.emailerror}
                onChangeTextInput={(value)=>{this.setState({emailerror:null,email:value})}}  
                onPressForgotPass={(email)=>this.onPressForgotPass(email)} 
            />

        </ImageBackground>
    );
  }
}

//Screen Styling
const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
},
    containerView: {flex: 1, justifyContent:'center', alignItems:'center'},
    logo:{
        flex:1,
        position:'absolute',
        top:80,
        width:'100%',
        justifyContent:"flex-end",
        alignItems:'center'      
    },
    logInCompStyl:{
        height: 100
    }
});