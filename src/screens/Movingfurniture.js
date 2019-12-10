import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Button,
    TouchableOpacity,
    Text
} from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import StepOne from '../components/WizardComps/Step1'
import StepTwo from '../components/WizardComps/Step2'
import StepThree from '../components/WizardComps/Step3'

    


export default class Movingfurniture extends React.Component {
    constructor(props) {
        super (props);
    }
    
    render(){
        return(
            <View style={styles.container}>
            <ProgressSteps>
                <ProgressStep label="Date & Time">
                   <StepOne/>
                </ProgressStep>
                <ProgressStep label="Location">
                    <StepTwo/>
                </ProgressStep>
                <ProgressStep label="Descrption">
                   <StepThree/>
                </ProgressStep>
                <ProgressStep label="Confirem">
                   <StepThree/>
                </ProgressStep>
            </ProgressSteps>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        margin :40, 
        flex:1
    }
})