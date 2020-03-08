import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { MapComponent } from '..';
import { Input, Icon, CheckBox } from 'react-native-elements';
import { View, TouchableOpacity, StyleSheet, Text, TextInput, Button, Dimensions ,Image} from 'react-native';
import { colors } from '../../common/theme';
import Client from '../../API/Client';

export default class StepFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
            images: []
        }
    }

    render() {
        return (
            <View style={styles.textAreaContainer}>
                <TouchableOpacity onPress={() => { ; this.props._pickImage() }} style={{ flex: 1, width: 100, height: 70, borderRadius: 10, marginLeft: 8, marginBottom: 20, paddingTop: 15, opacity: 0.5, backgroundColor: 'grey', justifyContent: 'flex-start' }}>
                    <Icon
                        style={{ padding: 5, zIndex: 999, marginTop: 0 }}
                        name='camera'
                        type='entypo'
                        color={"black"}
                        size={35}
                        containerStyle={{ flex: 1 }}
                    />
                </TouchableOpacity>
                <Text style={{ marginLeft: 10, marginTop: 0, fontWeight: 'bold', marginBottom: 10 }}>Upload Images</Text>
                <View style={styles.comp}>
                    <View style={styles.image}>
                        {!this.props.images[0] ?
                            <View style={{ flex: 1 }}>
                                <Icon
                                    style={{ padding: 5, marginTop: 20 }}
                                    name='image'
                                    type='entypo'
                                    color={"#707070"}
                                    size={35}
                                    containerStyle={{ flex: 1 }}
                                />
                            </View>
                            : <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.props.images[0].uri }} />
                        }
                    </View>
                    <View style={styles.image}>
                        {!this.props.images[1] ?
                            <View style={{ flex: 1 }}>
                                <Icon
                                    style={{ padding: 5, marginTop: 20 }}
                                    name='image'
                                    type='entypo'
                                    color={"#707070"}
                                    size={35}
                                    containerStyle={{ flex: 1 }}
                                />
                            </View> :
                            <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.props.images[1].uri }} />
                        }
                    </View>
                    <View style={styles.image}>
                        {!this.props.images[2] ?
                            <View style={{ flex: 1 }}>
                                <Icon
                                    style={{ padding: 5, marginTop: 20 }}
                                    name='image'
                                    type='entypo'
                                    color={"#707070"}
                                    size={35}
                                    containerStyle={{ flex: 1 }}
                                />
                            </View> :
                            <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.props.images[2].uri }} />
                        }
                    </View>
                </View>
                <View style={[styles.comp, { marginTop: 10 }]}>
                    <View style={styles.image}>
                        {!this.props.images[3] ?
                            <View style={{ flex: 1 }}>
                                <Icon
                                    style={{ padding: 5, marginTop: 20 }}
                                    name='image'
                                    type='entypo'
                                    color={"#707070"}
                                    size={35}
                                    containerStyle={{ flex: 1 }}
                                />
                            </View>
                            : <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.props.images[3].uri }} />
                        }
                    </View>
                    <View style={styles.image}>
                        {!this.props.images[4] ?
                            <View style={{ flex: 1 }}>
                                <Icon
                                    style={{ padding: 5, marginTop: 20 }}
                                    name='image'
                                    type='entypo'
                                    color={"#707070"}
                                    size={35}
                                    containerStyle={{ flex: 1 }}
                                />
                            </View> :
                            <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.props.images[4].uri }} />
                        }
                    </View>
                    <View style={styles.image}>
                        {!this.props.images[5] ?
                            <View style={{ flex: 1 }}>
                                <Icon
                                    style={{ padding: 5, marginTop: 20 }}
                                    name='image'
                                    type='entypo'
                                    color={"#707070"}
                                    size={35}
                                    containerStyle={{ flex: 1 }}
                                />
                            </View> :
                            <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: this.props.images[5].uri }} />
                        }
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 90,
        height: 60,
        paddingTop: 10,
        marginRight: 10,
        borderWidth: 2,
        borderColor: "#707070"
    },
    comp: {
        marginLeft: 10,
        flex: 3,
        flexDirection: 'row'
    },
    header: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    textAreaContainer: {
        marginLeft: 20,
        marginRight: 20,
        // borderColor: 'grey',
        // borderWidth: 1,
        // padding: 5
    },
    textArea: {
        borderColor: 'grey',
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
        height: 150,
        justifyContent: "flex-start"
    }
})