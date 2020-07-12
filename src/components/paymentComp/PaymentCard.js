import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';

import { ListItem, Icon } from 'react-native-elements'
import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableWithoutFeedback,
    ImageBackground,
    TouchableOpacity,

} from 'react-native';

const PaymentCard = (props) => {
    return (
        <View >
        <ListItem
            onPress={()=>props.activate(props.id)}
            containerStyle={{marginTop: 20, borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: '#cbd2d9'}}
            roundAvatar
            title={`**** **** **** ${props.title}`}
            titleStyle={{fontSize:23, color:"#00164F"}}
            subtitleStyle={{fontSize:20, color:"#70B32F"}}
            subtitle={props.subtitle}
            avatar={{uri:''}}
            rightIcon={<Icon
                    name={props.active ? "check" : 'info'}
                    type="fontawesome"
                    size={25}
                    color= {props.active ? "#70B32F" : "grey" }//"#70B32F"
                />}
            />
            {/* <ListItem
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: [1, 0],
                    end: [0.2, 0],
                }}
                ViewComponent={LinearGradient} // Only if no expo
                onPress={()=>props.activate(props.id)}
                leftAvatar={{ rounded: true, source: { uri: props.avatar_url } }}
                title={`**** **** **** ${props.number}`}
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'white' }}
                subtitle={props.type}
               // chevron={{ color: 'white' }}
                rightIcon={<Icon
                    name="arrow-right"
                    size={15}
                    color="white"
                />}
            /> */}
        </View>
    )
}

export default PaymentCard;