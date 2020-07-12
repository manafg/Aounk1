import React from 'react';
import {Registration } from '../components';
import {StyleSheet,View,StatusBar,AsyncStorage} from 'react-native';
import Client from '../API/Client';
import ErrMessage from '../API/ErrMeassage';



export default class RegistrationPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading: false,
          showErr:false,
          errMeassage:null
        }
        this.handleClose = this.handleClose.bind(this);
    }
    
    

    async clickRegister(fname, lname, mobile, email, password) {
      const { navigation } = this.props;
      let data = navigation.getParam('phoneId', null);
        this.setState({loading: true})
        var regData = {
          email:email,
          password: password, 
          phoneId:data
        }
        let profile = {
          "firstName": fname,
          "lastName": lname,
        }
        Client.post('account/user/create', regData).then((res)=>{
            profile.userId = res.data.user._id
            Client.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
            AsyncStorage.setItem('Token', res.data.token);
            Client.post(`account/user/profile`,profile).then((res)=>{
            this.props.navigation.navigate('Login')
          }).catch((res)=>{
            this.setState({showErr:true , errMeassage: res.response.data.error.message})

          })
        }).catch((res)=>{
          this.setState({showErr:true , errMeassage: res.response.data.error.message})
        })
    }
    handleClose = () =>{
      this.setState({ showErr: false , errMeassage:''})
    }
  
    
  render() {
    return (
        <View style={styles.containerView}>
            {this.state.showErr &&
              <ErrMessage handleClose={this.handleClose} message={this.state.errMeassage}  showErr = {this.state.showErr}/>
              
            }
          
            <Registration complexity={'any'} onPressRegister={(fname, lname, mobile, email, password)=>this.clickRegister(fname, lname, mobile, email, password)}  onPress={()=>{this.clickRegister()}} onPressBack={()=>{this.props.navigation.goBack()}} loading={this.state.loading}></Registration>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    containerView:{ flex:1,marginTop: StatusBar.currentHeight },
    textContainer:{textAlign:"center"},
});