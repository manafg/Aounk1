import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { MapComponent } from '..';
import { Input, Icon, CheckBox } from 'react-native-elements';
import { View, TouchableOpacity, StyleSheet, FlatList, Text, TextInput, Button, Dimensions, Image } from 'react-native';
import { colors } from '../../common/theme';
import Counter from "react-native-counters";
const devWidth = Dimensions.get("window").width;

export default class StepFive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemDesc: null,
            arrayOfItems: []
        }
    }

    onInputchange(value) {
        this.setState({ itemDesc: value });
    }
    addItem() {
        if (this.state.itemDesc) {
            let tembArr = this.state.arrayOfItems;
            let obj = { desc: this.state.itemDesc }
            tembArr.push(obj);
            this.setState({
                arrayOfItems: tembArr
            },()=>{
             this.props.reRender()
            })
        }
    }
    newData = ({ item }) => {
        return (
            <View style={styles.container}>
                <View style={styles.divCompView}>
                    <View style={styles.containsView}>
                        <View style={styles.statusStyle}>
                            <View style={styles.statusView}>
                                <View style={styles.textFormat}>
                                    <Text style={styles.textStyle}></Text>
                                </View>
                                <View style={styles.clockIconStyle}>
                                    <Icon
                                        iconStyle={styles.iconPositionStyle}
                                        name='clock'
                                        type='octicon'
                                        size={15}
                                    />
                                    <Text style={styles.textStyle}>{item.desc}</Text>
                                    <Counter start={1} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.textAreaContainer}>
                <Input
                    style={[styles.textArea, { height: 50 }]}
                    placeholder="New Item"
                    onChangeText={(val) => this.onInputchange(val)}
                    value={this.state.itemDesc}
                />
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#70B32F", marginTop: 10 }]}
                    onPress={() => { this.addItem() }}
                >
                    <Text style={{ color: 'white' }}> Add  </Text>
                </TouchableOpacity>
                <View style={{ flex: 1,  height:1000}}>
                    {this.state.arrayOfItems.length ? <FlatList style={{height:150}}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.arrayOfItems}
                        renderItem={this.newData}
                    /> : null}

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textArea: {
        borderColor: 'grey',
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
        height: 150,
        justifyContent: "flex-start"
    },
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
    button: {
        borderRadius: 10,
        width: '80%',
        padding: 10,
        height: 40,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#0D1C60',
    },
    textAreaContainer: {
        height: '100%',
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
    },
    myHeader: {
        marginTop: 0,
    },
    container: {
        flex: 1
    },
    divCompView: {
        borderWidth: 1,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: colors.GREY.primary,
        borderColor: colors.GREY.primary,
        flexDirection: 'row',
        flex: 1
    },
    imageHolder: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius: 50 / 2,
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.WHITE,
        backgroundColor: colors.WHITE,
        padding: 3
    },
    containsView: {
        justifyContent: 'center',
    },
    statusStyle: {
        flexDirection: 'row'
    },
    statusView: {
        flexDirection: 'column',
        marginLeft: 5
    },
    textStyle: {
        fontSize: 20,
        padding: 10,
        fontFamily: 'Roboto-Regular',
    },
    textColor: {
        color: colors.GREY.iconPrimary,
        alignSelf: 'center',
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        paddingLeft: 5
    },
    textFormat: {
        flex: 1,
        width: devWidth - 100
    },
    cabLogoStyle: {
        width: 25,
        height: 28,
        flex: 1
    },
    clockIconStyle: {
        flexDirection: 'row'
    },
    iconPositionStyle: {
        alignSelf: 'flex-start'
    }
})