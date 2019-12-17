import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Button,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import { DrawerActions } from 'react-navigation'
import { Header } from 'react-native-elements';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import StepOne from '../components/WizardComps/Step1'
import StepTwo from '../components/WizardComps/Step2'
import StepThree from '../components/WizardComps/Step3'
import StepFour from '../components/WizardComps/Step4'

    


export default class Movingfurniture extends React.Component {
    constructor(props) {
        super (props);
    }
    
    render(){
        return(
        <View style={{flex:1}}> 
            <Header 
            backgroundColor={"grey"}
            leftComponent={{icon:'md-menu', type:'ionicon', color:"#FFF", size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.dispatch(DrawerActions.toggleDrawer())} }}
            centerComponent={<Text style={styles.headerTitleStyle}>My Rides</Text>}
            outerContainerStyles={styles.headerStyle}
            innerContainerStyles={{marginLeft:10, marginRight: 10}}
        />
            <ProgressSteps>
                <ProgressStep label="Date & Time">
                   <StepOne/>
                </ProgressStep>
                <ProgressStep label="Location">
                    <StepTwo navigation={this.props.navigation} />
                </ProgressStep>
                <ProgressStep label="Descrption">
                   <StepThree/>
                </ProgressStep>
                <ProgressStep label="Gallery">
                   <StepFour/>
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