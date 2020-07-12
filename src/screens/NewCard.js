import {
    StyleSheet,
    View,
    FlatList,
    Text,
    StatusBar,
    TouchableWithoutFeedback,
    ImageBackground,
    TouchableOpacity,

} from 'react-native';
import { Dimensions } from "react-native";
import { Icon, Header } from 'react-native-elements';
import { colors } from '../common/theme';
import React from 'react';
import Client from '../API/Client';
import { CreditCardInput, LiteCreditCardInput } from "react-native-input-credit-card";
import ErrMessage from '../API/ErrMeassage';

const screenHeight = Math.round(Dimensions.get('window').height);

export default class NewCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            valid: true
        }
        this._onChange = this._onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.createNew = this.createNew.bind(this)
    }

    createNew() {
        let number = this.state.number.replace(/ /g,'');
        let cvc=parseInt(this.state.cvc);
        Client.post('account/payments/add', {
            "type": this.state.type,
            "cardNumber": number,
            "expiryDate": this.state.expiry,
            "cvv": cvc,
            "name": this.state.type
        }).then((res) => {
            this.setState({ showErr: true, errMeassage: 'Card Added Successfully', type: 'success' })
            this.props.navigation.navigate('CardList')

        }).catch((res) => {
            this.setState({ showErr: true, errMeassage: res.response.data.error.message, type: '' })
        })
    }

    handleClose = () => {
        this.setState({ showErr: false, errMeassage: '' })
    }

    _onChange = (data) => {
        this.setState({
            cvc: data.values.cvc,
            expiry: data.values.expiry,
            number: data.values.number,
            type: data.values.type,
            valid: data.status.cvc == "valid" && data.status.expiry == "valid" && data.status.number == "valid"
        })
    }

    render() {
        return (
            <View>
                <Header
                    backgroundColor={"#00164F"}
                    leftComponent={{ icon: 'ios-arrow-back', type: 'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback, onPress: () => { this.props.navigation.goBack(); } }}
                    centerComponent={<Text style={styles.headerTitleStyle}>New Card</Text>}
                    outerContainerStyles={styles.headerStyle}
                    innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
                />
                {this.state.showErr &&
                    <ErrMessage message={this.state.errMeassage} type={this.state.type} handleClose={this.handleClose} showErr={this.state.showErr} />
                }
                <View style={{ marginTop: 100 }}>
                    <CreditCardInput onChange={this._onChange} />
                <View style={{width:'80%', marginLeft:'10%'}}>
                {this.state.valid && 
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { this.createNew() }}
                    >
                        <Text style={{ color: 'white' }}> Submit</Text>
                    </TouchableOpacity>
                }
                </View>
                </View>

                {/* <CreditCardInput
                    autoFocus
                    requiresName
                    requiresCVC
                    // labelStyle={}
                    // inputStyle={}
                    validColor={"black"}
                    invalidColor={"red"}
                    placeholderColor={"darkgray"}
                    onChange={this._onChange}
                /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        
        marginTop:40,
        borderRadius: 10,
        width: '80%',
        padding: 10,
        height: 40,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#0D1C60',
    },
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
        backgroundColor: "#F4F4F4",
        width: '100%',
        height: '100%',
        flex: 1
    },

});