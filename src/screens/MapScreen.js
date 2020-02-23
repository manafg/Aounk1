import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Text,
    StatusBar,
    AsyncStorage,
    Alert,
    Button
} from 'react-native';
import {
    Declined,
    AcceptModal,
    CompletedTrip,
    StartedTrip,
    TripInfo,
    WaitingTruck,
    RateModal
} from "../components/TripComp";
import { MapComponent } from '../components';
import { DrawerActions } from 'react-navigation'
import { Icon, PricingCard, Input } from 'react-native-elements';
import { colors } from '../common/theme';
import Client from '../API/Client';
import io from 'socket.io-client';
import AnimatedLoader from "react-native-animated-loader";
import Modal from "react-native-modal";
var { height, width } = Dimensions.get('window');
import { AnimatedRegion } from 'react-native-maps';
const SOCKET_URL = 'http://apis.aounak.com/';
let conected = false
import getDirections from 'react-native-google-maps-directions'


export default class MapScreen extends React.Component {



    constructor(props) {
        super(props);
        this.socket = io(SOCKET_URL, {
            path: '/socket.io',
            pingTimeout: 6000000,
            pingInterval: 30000
        });
        this.state = {
            count: 0,
            noTruck: false,
            requestId: null,
            tripStatus: "",
            fareScreen: false,
            loaderVisible: false,
            location: null,
            errorMessage: null,
            recivedNewReq: null,
            modalVisible: false,
            fromActivity: false,
            messageShow: false,
            message: null,
            Declined: false,
            region: {
                latitude: 31.963158,
                longitude: 35.930359,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
            truckReqPayLoad: {
                price: null,
                time: null,
                current: null,
                from: null,
                destination: null
            },
            whereText: "Load Localtion",
            dropText: "Off-Load Localtion",
            showTruck: true,
            backgroundColor: colors.WHITE,
            carType: "",
            coordinate: new AnimatedRegion({
                latitude: 32.551445,
                longitude: 35.851479,
            }),
        }
        this.passData = {
            droplatitude: 0,
            droplongitude: 0,
            droptext: "",
            whereText: "",
            wherelatitude: 0,
            wherelongitude: 0,
            carType: '',
        }
        this.selectCarType = this.selectCarType.bind(this);
        this.requestTruck = this.requestTruck.bind(this);
        this.cancelTrip = this.cancelTrip.bind(this);
        this._rate = this._rate.bind(this)
        this._writeMessage = this._writeMessage.bind(this);
        this._showMessage = this._showMessage.bind(this);
        this._clearData = this._clearData.bind(this);
    }


    async componentWillMount() {
        let searchObj = await this.props.navigation.getParam('searchObj') ? this.props.navigation.getParam('searchObj') : null;
        if (searchObj) {
            if (searchObj.searchFrom == 'where') {
                if (searchObj.searchDetails) {
                    this.setState({
                        region: {
                            latitude: searchObj.searchDetails.geometry.location.lat,
                            longitude: searchObj.searchDetails.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        whereText: searchObj.whereText,
                        dropText: searchObj.dropText
                    })
                    this.passData = this.props.navigation.getParam('old');
                    this.setState({
                        carType: this.passData.carType
                    }, () => { })
                }
            }
            else {
                if (searchObj.searchDetails) {
                    this.setState({
                        region: {
                            latitude: searchObj.searchDetails.geometry.location.lat,
                            longitude: searchObj.searchDetails.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        whereText: searchObj.whereText,
                        dropText: searchObj.dropText
                    })
                    this.passData = this.props.navigation.getParam('old');
                    this.setState({
                        carType: this.passData.carType
                    }, () => { })
                }
            }
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        this.checkStatus()
        this.onConnectSocket();
        this.listen();
    }


    onConnectSocket = () => {
        let id = AsyncStorage.getItem('userID').then((value) => {
            if (value !== null) {
                this.setState({ userID: value, }, () => {
                    if (this.socket) {
                        this.socket.emit('join', this.state.userID)
                        conected = true;
                    }
                })
            }
        });
    }
    componentWillUnmount() {
        this.socket.disconnect()
    }
    listen() {
        let self = this;
        this.socket.on('show_notification', (val) => {
            if (val.data.request_status == 'COMPLETED') {
                console.log('COMPLETED', val)
            }
            this.setState({
                loaderVisible: false,
                recivedNewReq: val,
                tripStatus: val.data.request_status,
                count: this.state.count + 1,
                modalVisible: val.data.request_status == "DECLINED" ? false : true,
                Declined: val.data.request_status == "DECLINED" ? true : false,

            })
        });
    }

    getTruckFare() {
        this.setState({ loaderVisible: true })
        Client.get(`requests/truck/fare?current=${this.passData.wherelatitude},${this.passData.wherelongitude}&size=${this.state.carType}&destination=${this.passData.droplatitude},${this.passData.droplongitude}`).then((res) => {
            this.setState({
                tripStatus: "REQUSET",
                truckReqPayLoad: res.data,
                loaderVisible: false,
                tripInfo: true,
            }, () => {
                let self = this;
                setTimeout(function () {
                    self.setModalVisible(true)
                }, 1000);
            })

        }).catch((res) => {
            console.log(res)
            this.setState({ loaderVisible: false })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.state) === JSON.stringify(nextState.someVar)) return false;
        return true;
    }
    checkStatus() {
        Client.get(`account/activity-status`).then((res) => {
            this.setState({
                fromActivity: true,
                loaderVisible: false,
                requestId: res.data.requestId,
                recivedNewReq: res,
                tripStatus: res.data.request_status,
                modalVisible: true,
            })
        }).catch((res) => {

        })

    }

    requestTruck() {
        let obj = {
            "size": this.state.truckReqPayLoad.size,
            "current": this.state.truckReqPayLoad.current,
            "destination": this.state.truckReqPayLoad.destination,
            "userId": this.state.truckReqPayLoad.userId,
            "price": JSON.stringify(this.state.truckReqPayLoad.price),
            "time": this.state.truckReqPayLoad.time
        }
        this.setState({ loaderVisible: true, modalVisible: false })
        Client.post(`requests/truck/`, obj).then((res) => {
            this.setState({
                noTruck: res.data == "Unavaliable trucks" ? true : false,
                requestId: res.data.requestId,
                tripStatus: "PINDING",
                modalVisible: true,
                loaderVisible: false
            });

            let self = this;
            setTimeout(function () {
                self.setState({
                    tripStatus: "PINDING",
                    modalVisible: true,
                })
            }, 1000)
        }).catch((err) => {
            console.log(err);
            this.setState({ loaderVisible: false })
            this.setModalVisible(false)
            Alert.alert(
                'Some thing went wrong',
                'Please try again in five minutes',
                [

                    { text: 'Confirem', onPress: () => this.cancelTrip() },
                ],
                { cancelable: false },
            );

        })
    }

    _clearData() {
        this.passData = {
            droplatitude: 0,
            droplongitude: 0,
            droptext: "",
            whereText: "",
            wherelatitude: 0,
            wherelongitude: 0,
            carType: '',
        }
        this.setState({
            modalVisible: false, whereText: "Load Localtion", dropText: "Off-Load Localtion", truckReqPayLoad: {
                price: null,
                time: null,
                current: null,
                from: null,
                destination: null

            }, tripStatus: null, fareScreen: null
        })
    }

    _writeMessage(val) {
        this.setState({ message: val })
    }
    _hideMessage() {
        this.setState({ messageShow: false })
    }

    _showMessage() {
        this.setState({ messageShow: true })
    }
    cancelTrip() {
        //     if(!state || !activity) {
        //     this._clearData()
        //     return
        // }
        this._clearData()
        Client.patch(`requests/truck/${this.state.requestId}/decline`).then(() => {
            this._clearData()
        }).catch(err => { })
    }

    onPressCall(phoneNumber) {
        Linking.canOpenURL(phoneNumber).then(supported => {
            if (!supported) {
                console.log('Can\'t handle Phone Number: ' + phoneNumber);
            } else {
                return Linking.openURL(phoneNumber);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    selectCarType(value) {
        this.setState({
            carType: value,
        }, () => {
            this.passData.carType = value;
            this.getTruckFare()
        })
    }

    preserveData(searchObj, old) {
        if (searchObj) {
            if (searchObj.searchFrom == 'where') {
                if (searchObj.searchDetails) {
                    this.setState({
                        region: {
                            latitude: searchObj.searchDetails.geometry.location.lat,
                            longitude: searchObj.searchDetails.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        whereText: searchObj.whereText,
                        dropText: searchObj.dropText
                    })
                    this.passData = old;
                    this.setState({
                        carType: this.passData.carType
                    }, () => { })
                }
            }
            else {
                if (searchObj.searchDetails) {
                    this.setState({
                        region: {
                            latitude: searchObj.searchDetails.geometry.location.lat,
                            longitude: searchObj.searchDetails.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        whereText: searchObj.whereText,
                        dropText: searchObj.dropText
                    })
                    this.passData = old;
                    this.setState({
                        carType: this.passData.carType
                    }, () => { })
                }
            }
        }
    }

    _rate() {
        this.setState({ modalVisible: false, fareScreen: true })
    }

    statusTrip() {
        let expression = this.state.tripStatus;
        if (expression == "PINDING" && this.state.fromActivity) {
            this.cancelTrip()
            return
        }
        switch (expression) {
            case "REQUSET":
                return <TripInfo
                    price={this.state.truckReqPayLoad.price}
                    time={this.state.truckReqPayLoad.time}
                    cancelTrip={this.cancelTrip}
                    requestTruck={this.requestTruck} />
                break;
            case "PINDING":
                return <WaitingTruck noTruck={this.state.noTruck} cancelTrip={this.cancelTrip} />
                break;
            case "ACTIVE":
                return <AcceptModal _showMessage={this._showMessage} data={this.state.recivedNewReq} />
                break;
            case "STARTED":
                return <StartedTrip />
                break;
            case "COMPLETED":
                return <RateModal _rate={this._rate} />;
                break
            default:
                return <View></View>
                break
        }
    }

    render() {
        let init = this.state.recivedNewReq ? this.state.recivedNewReq.data : null;
        let receipt = init ? this.state.recivedNewReq.data.receipt : null;
        return (
            <View style={styles.mainViewStyle}>
                <TouchableOpacity onPress={() => { this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }} style={{ zIndex: 999, position: 'absolute', top: 40, left: 20 }}>
                    <Image style={{ width: 30, height: 30 }} source={require('../../assets/images/menu.png')} />
                </TouchableOpacity>
                <AnimatedLoader
                    visible={this.state.loaderVisible}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../../assets/loader.json")}
                    animationStyle={{ width: 100, height: 100 }}
                    speed={1}
                />
                <TouchableOpacity style={styles.searchView} disabled={this.state.tripStatus ? true : false} onPress={() => { this.props.navigation.navigate('Search', { from: "where", whereText: this.state.whereText, dropText: this.state.dropText, old: this.passData, pres: this.preserveData.bind(this) }); }}>
                    <View style={styles.textIconStyle}>
                        <Icon
                            style={{ padding: 10 }}
                            name='car-side'
                            type='material-community'
                            color={"#70B32F"}
                            size={23}
                            containerStyle={{ flex: 1 }}
                        />
                        <Text numberOfLines={1} style={styles.textStyle}>{this.state.whereText}</Text>
                        <Icon
                            name='circle'
                            type='font-awesome'
                            color={"#70B32F"}
                            size={23}
                            containerStyle={{ flex: 1 }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity disabled={this.state.tripStatus ? true : false} style={[styles.searchView, { top: 170 }]} onPress={() => { this.props.navigation.navigate('Search', { from: "drop", whereText: this.state.whereText, dropText: this.state.dropText, old: this.passData, pres: this.preserveData.bind(this) }); }}
                >
                    <View style={styles.textIconStyle}>
                        <Icon
                            style={{ padding: 10 }}
                            name='car-side'
                            type='material-community'
                            color={"#00164F"}
                            size={23}
                            containerStyle={{ flex: 1 }}
                        />
                        <Text numberOfLines={1} style={styles.textStyle}>{this.state.dropText}</Text>
                        <Icon
                            name='circle'
                            type='font-awesome'
                            color={"#00164F"}
                            size={23}
                            containerStyle={{ flex: 1 }}
                        />
                    </View>
                </TouchableOpacity>
                {this.state.Declined &&
                    <Declined _clearData={this._clearData} Declined={this.state.Declined} data={this.state.recivedNewReq} />
                }
                <Modal
                    testID={'modal'}
                    isVisible={this.state.messageShow}
                    backdropColor="#B4B3DB"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}>
                    <View style={styles.messageContent}>
                        <Text style={styles.messageContentTitle}>Send a message !</Text>
                        <View style={{ borderWidth: 1, borderRadius: 5, width: '100%' }}>
                            <Input
                                onChange={this._writeMessage}
                                placeholder='Write your message here'
                            />
                        </View>
                        <TouchableOpacity style={styles.buttonGrid}>

                            <Text style={styles.ratingText}>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this._hideMessage()}} style={[styles.buttonGrid,{marginTop:0,marginBottom:0}]}>

                            <Text style={styles.ratingText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    testID={'modal'}
                    isVisible={this.state.fareScreen}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight">
                    <PricingCard
                        color="#70B32F"
                        title="Total"
                        price={receipt ? receipt.total : null}
                        info={['Manaaf Hgh', `Time: ${receipt ? receipt.trip_fare_time : null}`, 'City: Amman']}
                        onButtonPress={this.cancelTrip}
                        button={{ title: 'Finish', }}
                    />
                </Modal>
                <Modal
                    hasBackdrop={false}
                    coverScreen={false}
                    isVisible={this.state.modalVisible}
                    onSwipeComplete={() => this.setState({ modalVisible: false })}
                    swipeDirection="down"
                    scrollTo={this.handleScrollTo}
                    scrollOffset={this.state.scrollOffset}
                    scrollOffsetMax={400 - 300} // content height - ScrollView height
                    style={styles.bottomModal}>
                    {
                        this.statusTrip()
                    }
                </Modal>
                <View style={styles.mapcontainer}>
                    <MapComponent markerRef={marker => { this.marker = marker; }} truckReqPayLoad={this.state.truckReqPayLoad} mapStyle={styles.map} mapRegion={this.state.region}/*  onRegionChange={(region)=>{this.setState({region: region})}} */ markerCord={this.passData} />
                </View>
                {(this.state.whereText !== "Load Localtion" && this.state.dropText !== "Off-Load Localtion") && !this.state.tripStatus ?
                    <View style={styles.compViewStyle}>
                        <View style={styles.adjustViewStyle}>
                            <TouchableOpacity style={styles.textViewStyle} onPress={() => { this.selectCarType('L') }}>
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.text1}>Larg Size</Text>
                                    <Text style={styles.text2}>JOD18.00</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.textViewStyle} onPress={() => { this.selectCarType('M') }}>
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.text1}>Medium Size</Text>
                                    <Text style={styles.text2}>JOD13.00</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.textViewStyle} onPress={() => { this.selectCarType('S') }}>
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.text1}>Small Size</Text>
                                    <Text style={styles.text2}>JOD8.00</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : null}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    adjustViewStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    messageContent: {

        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    messageContentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    ratingText: {
        color: "white",
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center'
    },
    searchView: {
        borderColor: "#AEB0B3",
        borderWidth: 1,
        borderRadius: 5,
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        width: '90%',
        height: 50,
        top: 90,
        left: "5%",
        right: "5%",
        zIndex: 999
    },
    mapcontainer: {
        flex: 6,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    mainViewStyle: {
        flex: 1,
        backgroundColor: colors.WHITE,
        marginTop: StatusBar.currentHeight
    },
    textIconStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textStyle: {
        flex: 9,
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: '400',
        color: colors.GREY.secondary
    },
    compViewStyle: {
        backgroundColor: "#00164F",
        flex: 1,
        alignItems: 'center'
    },
    textViewStyle: {
        width: '100%',
        borderStyle: 'solid',
        borderRightWidth: 0.5,
        borderLeftColor: 'white',
        flex: 1,
        alignItems: 'center'
    },
    text1: {
        paddingTop: 25,
        paddingBottom: 15,
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        padding: 10,
        fontWeight: '900',
        color: 'white'
    },
    buttonGrid: {
        borderRadius: 10,
        width: '50%',
        padding: 10,
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#0D1C60',
    },
    text2: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: '900',
        color: colors.GREY.secondary
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});