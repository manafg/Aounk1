import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,

} from 'react-native';
import { Dimensions } from "react-native";
import { Icon, Header } from 'react-native-elements';
import { colors } from '../common/theme';
import EmptyComp from '../components/EmptyComp'
import Client from '../API/Client';
import ErrMessage from '../API/ErrMeassage';
import { PaymentCard } from '../components';
import { NavigationEvents } from 'react-navigation';


const screenHeight = Math.round(Dimensions.get('window').height);

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: []
    }

    this.createNewCard = this.createNewCard.bind(this);
    this.activate = this.activate.bind(this);
    this.handleClose = this.handleClose.bind(this)
  }
  
  componentDidMount() {
    this.getCards();
  }

  getCards() {
    Client.get(`account/payments`).then((res) => {
      debugger
      if (typeof res.data == 'string') {

      } else {
        this.setState({ cardList: res.data });
      }
    }).catch((res) => {
      this.setState({ showErr: true, errMeassage: res.response.data.error.message })
    })
  }

  activate(id) {
    Client.patch(`account/payments/${id}/activated`).then((res) => {
      debugger
      this.getCards();
    }).catch((res) => {
      this.setState({ showErr: true, errMeassage: res.response.data.error.message })
    })
  }

  createNewCard() {
    this.props.navigation.navigate('NewCard')
  }

  handleClose = () => {
    this.setState({ showErr: false, errMeassage: '' })
  }

  renderItem = ({ item }) => (
    <PaymentCard
      title={item.lastCharacters}
      subtitle={item.type}
      id={item._id}
      active={item.activated}
      activate={this.activate}
    />
  )

  render() {
    return (
      <View style={{  backgroundColor:"#F4F4F4",
      width: '100%',
      height: '100%',
      flex: 1}}>
       <Header
          backgroundColor={"#00164F"}
          leftComponent={{ icon: 'ios-arrow-back', type: 'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback, onPress: () => { this.props.navigation.goBack(); } }}
          centerComponent={<Text style={styles.headerTitleStyle}>Card List</Text>}
          outerContainerStyles={styles.headerStyle}
          innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
        />
        <NavigationEvents onDidFocus={() => this.getCards()} />

        {this.state.showErr &&
          <ErrMessage message={this.state.errMeassage} type={this.state.type} handleClose={this.handleClose} showErr={this.state.showErr} />
        }

        {this.state.cardList.length ?
          <View>
            <Button
              buttonStyle={{}}
              onPress={()=>this.props.navigation.navigate('NewCard')}
              icon={
                <Icon
                  name="arrow-right"
                  size={15}
                  color="white"
                />
              }
              title="Add New Card"
            />
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.cardList}
              renderItem={this.renderItem}
            />
          </View>
          :
          <EmptyComp message="You don't have any Cards" image="true" navigate={()=>this.props.navigation.navigate('NewCard')} />

        }

      </View>
    )
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