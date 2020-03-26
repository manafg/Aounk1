import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Image,
	ImageBackground,
	Button,
	TouchableOpacity,
	Text
} from 'react-native';
import PhoneInput,{CountryPicker} from 'react-native-phone-input';
import { Background } from '../components';
import {AsyncStorage} from 'react-native';
import Client from '../API/Client'

export default class PhoneLand extends Component {
	constructor(props) {
		super(props)
		this.state = {
			phone: null,
		}
		this.countriesList=""
		this.verfiyPhone = this.verfiyPhone.bind(this)
	}
	componentDidMount() {

	}

	verfiyPhone() {
		let reg = /([0-9]{11}$)|(^[7-9][0-9]{9}$)/
		let validPh = reg.test(`+962${this.state.phone}`);
		let secondChar = this.state.phone.charAt(0) == '7';
		let thiiredChar = this.state.phone.charAt(1) == '8' || this.state.phone.charAt(1) == '7' || this.state.phone.charAt(1) == '9' ;
		let valid = validPh && secondChar &&thiiredChar;
		if(!valid) {
			alert('Please enter valid jordanian number e.g:7xxxxxxx');
			return
		}
		Client.post('account/phone/verify/create', {
			"phone":"+962"+this.state.phone,
			"userType": "PASSENGER"
		  })
		  .then( (res) =>{
			try {
				 AsyncStorage.setItem('MobileNumber', `${this.state.phone}`);
			  } catch (error) {
				// Error saving data
			  }
			if(res.data !== "Success resent verify code!") {
				this.props.navigation.navigate('Reg',{
					phoneId: res.data.phoneId
				});
			} else {
				this.props.navigation.navigate('PinCodeScreen',{
					itemId: 1,
					phoneId: this.state.phone,
				  }).catch((err)=>{
					  console.log(err)
				  })
			}
		  })
	}

	onChangeMobileNumber(val) {
		this.setState({phone:val})	
	}

	
	render() {
		return (
			<ImageBackground style={[styles.imgBackground]}
			resizeMode='cover'
			source={require('../../assets/images/background.png')}>
				<View style={styles.Header}>
					<Image style={styles.image} source={require('../../assets/images/inser_phone.png')}></Image>
					<Text style={styles.subText}>Enter your mobile number</Text>	
				</View>
				<View style={styles.logInCompStyl} />
				<View style={styles.containerView}>
					<PhoneInput onChangePhoneNumber={(val)=>{this.onChangeMobileNumber(val)}} flagStyle={styles.flagStyle} style={styles.phone} onPressFlag={()=> {return}} initialCountry="jo" allowZeroAfterCountryCode={false} value={this.state.phone} ref='phone' />
					<View style={styles.underLine}></View>
					<TouchableOpacity
						style={styles.button}
						onPress={this.verfiyPhone} 
					>
						<Text style={{ color: 'white' }}> Continue </Text>
					</TouchableOpacity>
					<Text style={styles.condtionTermsText}>By entering your phone number & the verification code, you are accepting AOUNAK Terms & Coditions</Text>
				</View>
			</ImageBackground>
		)
	}
}

const styles = StyleSheet.create({
	condtionTermsText:{
		textAlign:'center',
		color:"#707070",
		marginTop:50
	},
	image:{
		paddingLeft:60,
		paddingTop:20,
		width:50,
		height:75
	},
	flagStyle:{
		width:40,
	},
	subText:{
		color:"#00164F",
		marginTop:20,
		fontSize:20,
	},
	phone:{
		
	},
	Header:{
		marginTop:100,
		height:300,
		justifyContent: 'center',
    	alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		width:'100%'
		
	},
	imgBackground: {
		width: '100%',
		height: '100%',
		flex: 1
	},
	button: {
		borderRadius:10,
		width: '100%',
		padding: 40,
		marginTop: 40,
		alignItems: 'center',
		backgroundColor: '#00164F',
		padding: 10,
	},
	underLine: {
		width: '100%',
		paddingTop: 10,
		height: 0,
		borderBottomColor: '#70B32F',
		borderBottomWidth: 1
	},
	containerView: {  justifyContent: 'center', alignItems: 'center', marginRight:10, padding: 40 , paddingTop:0},
	logo: {
		flex: 1,
		position: 'absolute',
		top: 0,
		width: '100%',
		justifyContent: "flex-end",
		alignItems: 'center'
	},
	logInCompStyl: {
		height: 0
	}
});