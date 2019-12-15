import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { MapComponent } from '../../components';
import { Input, Icon , CheckBox} from 'react-native-elements';
import { View, TouchableOpacity, StyleSheet,Text, TextInput, Button, Dimensions } from 'react-native';
import { colors } from '../../common/theme';

export default class StepThree extends Component {
    constructor(props) {
        super(props);
        this.state={
            text: null
        }
    }

    render() {
        return (
            <View style={styles.textAreaContainer}>
                <CheckBox
                    title='Unpack furniture'
                    checked={this.state.checked}
                />
                  <CheckBox
                    title='Wraping clothes'
                    checked={this.state.checked}
                />
                  <CheckBox
                    title='Cleaning house'
                    checked={this.state.checked}
                />
                <Text style={styles.header}>Descrption</Text>
                <TextInput 
                    style={styles.textArea}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Add more descrption here"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        marginTop:20,
        fontWeight:'bold',
    },
    textAreaContainer: {
        marginLeft:20,
        marginRight:20,
        // borderColor: 'grey',
        // borderWidth: 1,
        // padding: 5
      },
      textArea: {
        borderColor: 'grey',
        borderWidth: 1,
        marginTop:20,
        borderRadius:10,
        padding: 10,
        height: 150,
        justifyContent: "flex-start"
      }
})