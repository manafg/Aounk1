import React from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import { colors } from '../common/theme';
import EmptyComp from '../components/EmptyComp'
const devWidth=Dimensions.get("window").width;

export default class Notifications extends React.Component {

    constructor(props){
        super(props);
        this.state={
            data: [
               
            ],
        } 
      }
      onPressButton(){ 
         alert("hello");
      }

     newData = ({item}) =>{
        return(
        <View style={styles.container}>
           <View style={styles.divCompView}>
              <View style={styles.containsView}>
                  <View style={styles.statusStyle}> 
                      <View style={styles.imageHolder}>
                      <Image
                            style={styles.cabLogoStyle}
                            source={require('../../assets/images/logo.png')}
                          />
                      </View>
                      <View style={styles.statusView}>
                            <View style={styles.textFormat}>
                                <Text style={styles.textStyle}>{item.Status}</Text>
                            </View> 
                            <View style={styles.clockIconStyle}>
                            <Icon
                                    iconStyle={styles.iconPositionStyle}
                                    name='clock'
                                    type='octicon'
                                    size={15}
                                />
                                <Text style={styles.textColor}>{item.time}</Text>
                            </View>  
                      </View>
                  </View>
               </View>
           </View>
        </View>
         )
     }
    render(){    
    return(
        <View style={{flex:1}}>
        {this.state.data.length ? 
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={this.state.data}
                renderItem={this.newData}
            />
            :
            <EmptyComp message ="You don't have any notifications"/> }
        </View>
    ); 
}
};
const styles = StyleSheet.create({
    myHeader:{
        marginTop:0,   
    },
    container:{
        flex:1
    },
    divCompView:{
        borderWidth:1,
        height:60,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        backgroundColor:colors.GREY.primary,
        borderColor:colors.GREY.primary,
        flexDirection:'row',
        flex:1
    },
    imageHolder:{
        height:50,
        width:50,
        borderWidth:1,
        borderRadius:50/2,
        marginLeft:5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:colors.WHITE,
        backgroundColor:colors.WHITE,
        padding : 3
    },
    containsView:{
        justifyContent:'center',
    },
    statusStyle:{
        flexDirection:'row'
    },
    statusView:{
        flexDirection:'column',
        marginLeft:5
    },
    textStyle:{
        fontSize:14,  
        fontFamily:'Roboto-Regular',
    },
    textColor:{
        color:colors.GREY.iconPrimary,
        alignSelf: 'center',
        fontSize: 12,
        fontFamily:'Roboto-Regular',
        paddingLeft: 5
    },
    textFormat:{
        flex:1, 
        width:devWidth-100
    },
    cabLogoStyle:{
        width: 25, 
        height: 28, 
        flex:1
    },
    clockIconStyle:{
        flexDirection:'row'
    },
    iconPositionStyle:{
        alignSelf:'flex-start'
    }
});