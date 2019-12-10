import React, { Component } from 'react';
import { View, TextInput,StyleSheet } from 'react-native';

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
                <TextInput 
                    style={styles.textArea}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5
      },
      textArea: {
        height: 150,
        justifyContent: "flex-start"
      }
})