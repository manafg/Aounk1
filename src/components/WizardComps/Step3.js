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
                    checked={this.props.unpackFurniture}
                    onPress={() => this.props.unpackFurnitureF()}
                />
                  <CheckBox
                    title='Wraping clothes'
                    checked={this.props.wrappingClothes}
                    onPress={() => {this.props.wrappingClothesF()}}
                />
                  <CheckBox
                    title='Cleaning house'
                    checked={this.props.cleaning}
                    onPress={() => this.props.cleaningF()}
                />
                <Text style={styles.header}>House Space</Text>
                <TextInput 
                    style={[styles.textArea,{height:50}]}
                    placeholder="Hosue Space"
                    onChangeText={(text) => this.props.houseSpaceF(text)}
                    value={this.props.houseSpace} />
                <Text style={styles.header}>Offer Validaty</Text>
                <TextInput 
                    style={[styles.textArea,{height:50}]}
                    placeholder="Offer Validaty"
                    onChangeText={(text) => this.props.offerValidtyF(text)}
                    value={this.props.houseSpace} />
                <Text style={styles.header}>Descrption</Text>
                <TextInput 
                    style={styles.textArea}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Add more descrption here"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.props.text} />
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