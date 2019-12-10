import React from 'react';
import { RideList } from '../components';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableOpacity,

} from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import { colors } from '../common/theme';
import Client from '../API/Client';
import { Dimensions } from "react-native";

const screenHeight = Math.round(Dimensions.get('window').height);

export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.imgBackground}>

        <Header
          backgroundColor={"#00164F"}
          leftComponent={{ icon: 'md-menu', type: 'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback, onPress: () => { this.props.navigation.toggleDrawer(); } }}
          centerComponent={<Text style={styles.headerTitleStyle}>Settings</Text>}
          outerContainerStyles={styles.headerStyle}
          innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
        />
        <View containerStyle={{ marginBottom: 20 }}>
          <Text style={{paddingLeft:20, paddingTop:20, paddingBottom:20, fontSize:16}}>Payment Methodes</Text>

          <ListItem
            title={"Cash"}
            leftIcon={{ name: 'cash', type: 'material-community', color:"#70B32F", size:40 }}
            bottomDivider
            chevron
          />
          <ListItem
            title={"Add Payment Methode"}
            titleStyle={{ color: '#70B32F',  }}
            bottomDivider
            chevron
          />
        </View>
        <View containerStyle={{ marginBottom: 20 }}>
          <Text style={{paddingLeft:20, paddingTop:20, paddingBottom:20, fontSize:16}}>Promotions</Text>
          <ListItem
            title={"Add Promo Code"}
            titleStyle={{ color: '#70B32F',  }}
            bottomDivider
            chevron
          />
        </View>
        <View containerStyle={{ marginBottom: 20 }}>
          <Text style={{paddingLeft:20, paddingTop:20, paddingBottom:20, fontSize:16}}>Vouchers</Text>
          <ListItem
            title={"Vouchers"}
            leftIcon={{ name: 'vote',type:'material-community',  color:"#70B32F", size:30 }}
            bottomDivider
            chevron
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wraper: {
    marginLeft: 30,
    marginRight: 20,
    width: "80%",
    marginTop: screenHeight - 250,
  },
  input: {
    width: '100%',
    padding: 40,
    paddingBottom: 100,
    marginBottom: 100,
    borderWidth: 1

  },
  headerTitleStyle: {
    color: colors.WHITE,
    fontFamily: 'Roboto-Bold',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#00164F',
    padding: 20,
  },
  imgBackground: {
    backgroundColor:"#F4F4F4",
    width: '100%',
    height: '100%',
    flex: 1
  },

});
