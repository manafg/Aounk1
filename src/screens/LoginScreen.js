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
import ErrMessage from '../API/ErrMeassage';
import {AsyncStorage, Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'




let forgotPassUrl = 'https://api.ibshr.com/reset/password?fbclid=IwAR2Q6R1fJIZQLRQZZ6jIx-GgQbreaZDnBv88WLwwh-bSkd8tsS4SdVWXby8'
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
      this.handleClose = this.handleClose.bind(this);
    }

    closeModal(){ 
        this.setState({ showForgotModal: false })
    }

    //go to register page
    onPressRegister() {
        this.props.navigation.navigate('PhoneLand');
    }

    handleClose = () => {
      this.setState({ showErr: false , errMeassage:''})
    }

    //forgot password press
    forgotPassPress() {
      Linking.canOpenURL(forgotPassUrl).then(supported => {
        if (supported) {
          Linking.openURL(forgotPassUrl);
        } else {
          console.log("Don't know how to open URI: " + forgotPassUrl);
        }
      });
    }
    
    onPressForgotPass(email) {
      let emailReq = {
        "email": email
      }
      this.setState({ showForgotModal: false }, () => {
        Client.post('account/users/reset', emailReq).then(() => {
          this.setState({ showErr: true, errMeassage: 'A Password Reset Link sent to your email please check and reset your New Password', type:"success"})
        })
      });
    }

    async onPressLogin(email, password){
      let logData = {
        // "email":"Manafhgh22@gmail.com",
        // "password":"manafG1992@"
        // "email":'passenger@mailinator.com',
        // "password":'hash-this'
        "email":email,
        "password": password
      }
      Client.post('account/users/login', logData).then((res)=>{
        let role = res.data.user.roles[0] == "PASSENGER"
        if(!role){
          this.setState({showErr: true, errMeassage:"Error username and password"})
        }
        AsyncStorage.setItem('userID',res.data.user.userId);
        AsyncStorage.setItem('Profile',res.data.user.profile.name)
        AsyncStorage.setItem('Token', res.data.token);
        Client.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
        this.props.navigation.navigate('SelectType')
      }).catch((res)=>{
        this.setState({showErr:true , errMeassage: res.response.data.error.message})
      })
    }

  render() {
    return (
      <ImageBackground style={[styles.imgBackground, { paddingTop: 240 }]}
      resizeMode='cover'
      source={require('../../assets/images/login.png')}>
        {this.state.showErr &&
          <ErrMessage message={this.state.errMeassage} type={this.state.type} handleClose={this.handleClose}  showErr = {this.state.showErr}/>
        }
            <View> 

            </View>
            <View style={styles.logInCompStyl}/>
            <View style={styles.containerView}>
              <TouchableOpacity onPress={()=>{this.forgotPassPress()}}>
                <Text style={{color:"#0077cc", fontSize:16}}>Forgot Your password ?</Text>
              </TouchableOpacity>
              <LoginComponent
                complexity={'any'}
                onPressRegister={()=>{this.onPressRegister()}} 
                onPressLogin={(email, password)=>this.onPressLogin(email, password)} 
                onPressForgotPassword={()=>{this.forgotPassPress()}}
              />
               
            </View>
            <View style={{flex:1, marginTop:90}}>
            <TouchableOpacity
                onPress={()=>{this.onPressRegister()}}
                style={styles.button}
            >
                <Text style={{ color: 'white' , fontWeight:'bold', fontSize:16, height:100}}> Register </Text>
            </TouchableOpacity>
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
  button: {
    marginBottom:'50%',
    width: '78%',
    padding:  15,
    paddingBottom:30,
    height: 40,
    alignItems: 'center',
    textAlign:'center',
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: '#72BE44',
},
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