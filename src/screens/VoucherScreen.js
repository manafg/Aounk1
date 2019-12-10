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
import { Header, Input } from 'react-native-elements';
import { colors } from '../common/theme';
import Client from '../API/Client';
import { Dimensions } from "react-native";

const screenHeight = Math.round(Dimensions.get('window').height);

export default class VoucherScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }







  render() {
    return (
      <ImageBackground style={styles.imgBackground}
        resizeMode='cover'
        source={require('../../assets/images/BG1.png')}>
        <Header
          backgroundColor={"#00164F"}
          leftComponent={{ icon: 'md-menu', type: 'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback, onPress: () => { this.props.navigation.toggleDrawer(); } }}
          centerComponent={<Text style={styles.headerTitleStyle}>Free Loads</Text>}
          outerContainerStyles={styles.headerStyle}
          innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
        />
        <View style={styles.wraper}>
          <Input
          style={styles.input}
            placeholder='aouhazem2362nak'
          />
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={{ color: 'white' }}> INVITE FRIENDS </Text>
        </TouchableOpacity>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  wraper:{
    marginLeft: 30,
    marginRight: 20,
    width:"80%",
    marginTop: screenHeight - 250,
  },
  input:{
    width: '100%',
    padding: 40,
    paddingBottom:100,
    marginBottom:100,
    borderWidth:1
    
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
    width: '100%',
    height: '100%',
    flex: 1
  },

});
