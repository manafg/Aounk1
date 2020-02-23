import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet,Text, Button, Dimensions } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import { colors } from '../../common/theme';
// import {  colors } from '../../common/theme';

var { width } = Dimensions.get('window');

export default class StepOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: this.props.hideDate,
            showTime: false,
        };
    }
    showTime = () =>{
        this.setState({showTime:true})
    }

    hideTime = () =>{
        this.setState({showTime:false})
    }

    componentWillReceiveProps(props){
        if(JSON.stringify(this.props) != JSON.stringify(props) ) {
            this.setState({
                isDateTimePickerVisible : props.hideDate,
                showTime: props.showTime
            })
        }
    }
  
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    render() {
        return (
            <View style={{marginLeft:30}}>
                <TouchableOpacity onPress={this.showDateTimePicker} style={styles.searchView}>
                    <View style={styles.textIconStyle}>
                        <Icon
                            style={{ padding: 10 , backgroundColor:"#707070"}}
                            name='calendar'
                            type='material-community'
                            color={"#0D1C60"}
                            size={23}
                            containerStyle={{ flex: 1 }}
                        />
                        <Text numberOfLines={1} style={styles.textStyle}>{this.props.Date}</Text>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.showTime} style={[styles.searchView,{marginTop:20}]}>
                    <View style={styles.textIconStyle}>
                        <Icon
                            style={{ padding: 10 , backgroundColor:"#707070"}}
                            name='timer'
                            type='material-community'
                            color={"#0D1C60"}
                            size={23}
                            containerStyle={{ flex: 1 }}
                        />
                        <Text numberOfLines={1} style={styles.textStyle}>{this.props.Time}</Text>
                        
                    </View>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.props.handleDatePicked}
                    onCancel={()=>{  this.hideDateTimePicker}}
                    mode='date'
                />
                 <DateTimePicker
                    isVisible={this.state.showTime}
                    onConfirm={this.props.handleTime}
                    onCancel={this.hideTime}
                    mode='time'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchView: {
        borderColor: "#AEB0B3",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        width: '90%',
        height: 50,
        zIndex: 999
    },
    textIconStyle: {
        backgroundColor:"#D5D5D5",
        opacity:0.8,
        paddingLeft:10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textStyle: {
        height:'100%',
        textAlign:'center',
        paddingTop:14,
        backgroundColor:"#FFF",
        flex: 9,
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        marginLeft:10,
        fontWeight: '400',
        color: "#707070"
    },
    emailInputContainerStyle: {
        paddingBottom: 15
    },
    emailInputContainer: { 
     
    },
    inputTextStyle: {
        // borderWidth:1,
        // borderRadius:1,
        // color:"#000000",
        // fontSize:13
    }
})