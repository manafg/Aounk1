import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';

export default class SelectType extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() { }
    render() {
        return (
            <ImageBackground style={styles.imgBackground}
                resizeMode='cover'
                source={require('../../assets/images/SelectBG.png')}>
                <View style={{ width: 300, alignSelf: 'center', marginBottom: 50, height: 100, flexDirection: 'row', marginTop: 290, justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Map')}}>
                    <Image style={{ width: 130, height: 130, }} source={require('../../assets/images/selectLBG.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Map')}}>
                    <Image style={{ width: 130, height: 130, }} source={require('../../assets/images/TrucMed.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: 300, alignSelf: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Map')}}>
                    <Image style={{ width: 130, height: 130, }} source={require('../../assets/images/selectSmBg.png')} />
                   </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('MovefurnitreLandingPage')}}>
                    <Image style={{ width: 130, height: 130, }} source={require('../../assets/images/moveFurn.png')} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
})