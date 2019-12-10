import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet,Text, Button, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
// import {  colors } from '../../common/theme';

var { width } = Dimensions.get('window');

export default class StepOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            Date: null,
            Time: null,
            showTime: false,
        };
    }
    showTime = () =>{
        this.setState({showTime:true})
    }

    hideTime = () =>{
        this.setState({showTime:false})
    }
    handleTime = (time)=>{
        console.log(time)
        this.setState({Time:time}, ()=>{
            this.hideTime();
        })
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        let stDate = JSON.stringify(date)
        this.setState({Date:stDate},()=>{
            this.hideDateTimePicker();
        })
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                    <Input
                        editable={false}
                        placeholder={'Date'}
                        value={this.state.Date}
                        inputStyle={styles.inputTextStyle}
                        inputContainerStyle={styles.emailInputContainerStyle}
                        containerStyle={styles.emailInputContainer}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.showTime}>
                    <Input
                        editable={false}
                        placeholder={'Time'}
                        value={this.state.Time}
                        inputStyle={styles.inputTextStyle}
                        inputContainerStyle={styles.emailInputContainerStyle}
                        containerStyle={styles.emailInputContainer}
                    />
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    mode='date'
                />
                 <DateTimePicker
                    isVisible={this.state.showTime}
                    onConfirm={this.handleTime}
                    onCancel={this.hideTime}
                    mode='time'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    emailInputContainerStyle: {
        borderBottomColor:"#000000", 
        borderBottomWidth: 1, 
        paddingBottom: 15
    },
    emailInputContainer: { 
        borderTopRightRadius:10, 
        borderTopLeftRadius: 10, 
        paddingLeft: 10,
        backgroundColor: "#fff",
        paddingRight: 10, 
        paddingTop:10, 
        width: width-80
    },
    inputTextStyle: {
        color:"#000000",
        fontSize:13
    }
})