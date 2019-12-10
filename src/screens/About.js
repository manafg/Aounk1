import React from 'react';
import { Header } from 'react-native-elements';
import { colors } from '../common/theme';
import { 
    StyleSheet,
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    Image
  } from 'react-native';
  var {width} = Dimensions.get('window');
  
export default class AboutPage extends React.Component {
    constructor(props){
        super(props);
    }
    render() {  
        return (
        
            <View style={styles.mainView}>
                <Header 
                    backgroundColor={colors.GREY.default}
                    leftComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                    centerComponent={<Text style={styles.headerTitleStyle}>About Us</Text>}
                    outerContainerStyles={styles.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                />
                <View>
                <ScrollView>
                  
                </ScrollView>
               </View>
           </View>
           
        );
      }
    
}
const styles = StyleSheet.create({
    mainView:{ 
        flex:1, 
        backgroundColor: colors.WHITE, 
        marginTop: StatusBar.currentHeight,
    } ,
    headerStyle: { 
        backgroundColor: colors.GREY.default, 
        borderBottomWidth: 0 
    },
    headerTitleStyle: { 
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    aboutTitleStyle:{
        color: colors.BLACK,
        fontFamily:'Roboto-Bold',
        fontSize: 20,
        marginLeft:8,
        marginTop:8
    },
    aboutcontentmainStyle:{
        marginTop:12,
        marginBottom:60
    },
    aboutcontentStyle:{
        color: colors.GREY.secondary,
        fontFamily:'Roboto-Regular',
        fontSize: 15,
        textAlign: "justify",
        alignSelf:'center',
        width:width-20,
        letterSpacing:1,
        marginTop:6,
    },
    contact:{
        marginTop:6,
        marginLeft:8,
        flexDirection:'row',
        width:"100%"
    },
    contacttype1:{
        textAlign:'left',
        color: colors.GREY.secondary,
        fontFamily:'Roboto-Bold',
        fontSize: 15,
    },
    contacttype2:{
        textAlign:'left',
        marginTop:4,
        color: colors.GREY.secondary,
        fontFamily:'Roboto-Bold',
        fontSize: 15,
    }
})