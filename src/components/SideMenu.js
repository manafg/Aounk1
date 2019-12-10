import React from 'react';
import { Text, View, Dimensions, StyleSheet, FlatList, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase'; //Database
import SideMenuHeader from './SideMenuHeader';
import { colors } from '../common/theme';

var { width,height } = Dimensions.get('window');

export default class SideMenu extends React.Component{
    constructor(props){
        super(props);
       
        this.state = {
           conected:false,
           name:"",
            heightIphoneSix : false,
            sideMenuList: [
                {key: 1, name: 'Book a Truck', navigationName: 'Map', icon: 'home', type: 'font-awesome', child: 'firstChild'},
                {key: 2, name: 'Profile Settings', navigationName: 'Profile', icon: 'ios-person-add', type: 'ionicon', child: 'secondChild'},
                {key: 3, name: 'History', navigationName: 'RideList', icon: 'car-sports', type: 'material-community', child: 'thirdChild'},
                 {key: 4, name: 'Setting', navigationName: 'SettingScreen', icon: 'settings', type: 'material-community', child: 'fourthChild'},
                {key: 6, name: 'About Us',  navigationName: 'About', icon: 'info', type: 'entypo', child: 'sixthChild'},
                {key: 7, name: 'Free Rides', navigationName:'VoucherScreen', icon: 'money', type: 'font-awesome', child: 'seventhChild'},
                {key: 8, name: 'Sign Out', icon: 'sign-out', type: 'font-awesome', child: 'seventhChild'},
                ],
            profile_image:null
        }
          
    }


    componentDidMount(){
        
        AsyncStorage.getItem("Profile").then((res)=>{
            this.setState({name:res})
        })
        this.heightReponsive();
        // var curuser = firebase.auth().currentUser.uid;
        // const userData=firebase.database().ref('users/'+curuser);
        // userData.on('value',userData=>{
        //     this.setState(userData.val())
        // })
        this.tripSatusCheck()
    }

    //check for device height(specially iPhone 6)
    heightReponsive(){
        if(height <= 667){
            this.setState({heightIphoneSix :true})
        }
    }

    //navigation to screens from side menu
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    //sign out and clear all async storage
    async signOut() {
        AsyncStorage.setItem('Token', "");
        this.props.navigation.navigate('Login')

    }

    //CHECKING TRIP END OR START
    tripSatusCheck(){
        // var curuser = firebase.auth().currentUser;
        //     this.setState({currentUser:curuser},()=>{
        //         const userData=firebase.database().ref('users/'+this.state.currentUser.uid);
        //         userData.on('value',userData=>{
        //             if(userData.val()){
        //                 data = userData.val()
        //                 if(data['my-booking']){ 
        //                     let bookingData = userData.val()['my-booking'] 
        //                     for(key in bookingData){
        //                         bookingData[key].bookingKey = key
        //                         if(bookingData[key].payment_status){      
        //                             if(bookingData[key].payment_status == "IN_PROGRESS" && bookingData[key].status == 'END' && bookingData[key].skip != true){
        //                                 this.props.navigation.navigate('ratingPage',{data:bookingData[key]});
        //                             }else if( bookingData[key].status == 'START'){
        //                                 this.props.navigation.navigate('trackRide',{data:bookingData[key]});
        //                              }
        //                         }
                                
        //                     }
        //                 }
        //             }
        //         })
        //     })
    }


    render(){
        return(
            <View style={styles.mainViewStyle}>
                <SideMenuHeader headerStyle={styles.myHeader} userPhoto={this.state.profile_image} userEmail={this.state.email} userName ={this.state.name} ></SideMenuHeader> 
                
                <View style={styles.compViewStyle}>
                <View style={[styles.vertialLine,{height: (width <= 320) ? width/1.53 : width/1.68 }]}></View>
                    <FlatList
                        data={this.state.sideMenuList}     
                        keyExtractor={(item,index) => index.toString()}   
                        style={{ marginTop: 20}}   
                        bounces = {false}
                        renderItem={({item, index}) => 
                        <TouchableOpacity
                        onPress={
                        (item.name=='Sign Out')? ()=>this.signOut() : 
                        this.navigateToScreen(item.navigationName) 
                        }
                        style={
                        [styles.menuItemView, {marginTop: (index == this.state.sideMenuList.length - 1) ? width/7 : 0}]
                        }>
                            <View style={styles.viewIcon}>
                                <Icon
                                    name={item.icon}
                                    type={item.type}
                                    color={colors.WHITE}
                                    size={16}
                                    containerStyle={styles.iconStyle}
                                />
                            </View>
                                <Text style={styles.menuName}>{item.name}</Text>
                            </TouchableOpacity>
                    } />
                </View>
                <View style={{opacity: 0.6}}>
                    {/* <Image 
                        source={require('../../assets/images/logo.png')} 
                        style={{width: '50%'}}
                    /> */}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    myHeader:{
        marginTop:0,   
    },
    vertialLine: {
        width: 1,
        backgroundColor: colors.GREY.btnPrimary,
        position: 'absolute',
        left: 22,
        top: 24
    },
    menuItemView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 18,
        flex: 1,
        paddingLeft: 10, 
        paddingRight: 10,
    },
    viewIcon: {
        width: 24,
        height: 24,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.GREY.btnPrimary,
        left: 1
    },
    menuName: {
        color: colors.WHITE, 
        fontWeight: 'bold',
        marginLeft: 8,
        width:"100%"
    },
    mainViewStyle:{
        backgroundColor: colors.BLUE.dark, 
        height: '100%'
    },
    compViewStyle:{
        position: 'relative', 
        flex: 3
    },
    iconStyle:{ 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
})