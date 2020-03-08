import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Button,
    TouchableOpacity,
    Text,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import Constants from 'expo-constants';
import Client from '../API/Client'
import { DrawerActions } from 'react-navigation';
import { Header } from 'react-native-elements';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import StepOne from '../components/WizardComps/Step1';
import StepTwo from '../components/WizardComps/Step2';
import StepThree from '../components/WizardComps/Step3';
import StepFour from '../components/WizardComps/Step4';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

    
export default class Movingfurniture extends React.Component {
    constructor(props) {
        super (props);
        this.state= {
            requestId:null,
            Date: "Select appointment date",
            Time: "Select appointment time",
            step:0,
            images:[],
            whereText: "Amman Jordan",
            dropText: "Jandweel",
            unpackFurniture:false,
            "wrappingClothes": false,
            "cleaning": false,
            "houseSpace":150,
            "offerValidty": 3,
            hideDate:false,
            showTime:false,
            region: {
                latitude: 31.963158,
                longitude: 35.930359,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
        }

        this.passData = {
            droplatitude: 31.9787145,
            droplongitude:35.8955524,
            droptext: 'Amman Jordan',
            whereText: "Jandweel ",
            wherelatitude: 31.9787406,
            wherelongitude: 35.8957113,
            carType: '',
        }
        this.houseSpace= this.houseSpace.bind(this);
        this.unpackFurniture = this.unpackFurniture.bind(this);
        this.wrappingClothes = this.wrappingClothes.bind(this);
        this.cleaning = this.cleaning.bind(this);
        this.offerValidty = this.offerValidty.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleDatePicked = this.handleDatePicked.bind(this);
        this.searchData = this.searchData.bind(this)
        this.getPermissionAsync =  this.getPermissionAsync.bind(this);
        this._updateImage = this._updateImage.bind(this);
        this._pickImage = this._pickImage.bind(this);
    }
    onSubmit(){
      this.UploadDocs();
    }
    ////upload section

    getPermissionAsync = async () => {
         
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _updateImage(result){
         
        let images = [];
        images = this.state.images;
        images.push(result)
        this.setState({images:images})
    }

    _pickImage = async () => {
         
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            this._updateImage(result)
        }
    };

    UploadDocs(){
         
        var bodyFormData = new FormData();
        bodyFormData.append('images',this.state.images)
       
        axios({
            method: 'post',
            url: `http://api.ibshr.com/api/account/upload/move-furniture/${this.state.requestId}`,
            data: bodyFormData,
            headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`}
            })
            .then(function (response) {
                 
                this.props.navigation.navigate('SelectType')
            })
            .catch(function (response) {
                //handle error
                 
                console.log(response);
            });
    }

    ///

    wrappingClothes() {
        this.setState({
            wrappingClothes: !this.state.wrappingClothes
        })
    }

    cleaning(){
        this.setState({
            cleaning: !this.state.cleaning
        })
    }

    unpackFurniture(){
        this.setState({
            unpackFurniture: !this.state.unpackFurniture
        })
    }

    houseSpace(val){
        this.setState({
            houseSpace:val
        })
    }

    offerValidty(val){
        this.setState({
            offerValidty:val
        })
    }

    handleTime = (time)=>{
        let stTime = JSON.stringify(time)
        this.setState({Time:stTime, showTime: false})
    }

    handleDatePicked = date => {
        let stDate = JSON.stringify(date)
        this.setState({Date:stDate,hideDate:false})
    };


    /**
     * 
     * @param {object} val 
     */
    firstStep(val) {
        let time = val.Time == "Select appointment time";
        let date = val.Date == "Select appointment date"
        if ( time && date) {
            this.showAlert("Warning", "Please Fill Time and Date");
            this.setState({step:0})
            return
            
        }else if (date) {
            this.showAlert("Warning", "Please Fill Date");
            this.setState({step:0})
            return
        } else  if (time){
            this.showAlert("Warning", "Please Fill Time")
            this.setState({step:0})
            return
        } else {
         this.setState({step:1})
        }
    }

    secondStep() {
        if(!this.state.whereText) {
            showAlert("Warning", "Please Fill your Load Location");
            return
        } else if(!this.state.dropText) {
            showAlert("Warning", "Please Fill your Destnation");
            return
        } else {
            this.setState({step:2})
        }
    }

    async searchData() {
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

    showAlert(title, message){
        Alert.alert(
            `${title}`,
            `${message}`,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
    }
    
    submit = (self)=> {
         
        let obj =
        {
            "userId": "string",
            "date": "2020-02-15T13:49:05.654Z",
            "time":"12:15AM",
            "current": {lat: this.passData.droplatitude,long:this.passData.droplongitude},
            "destination": {lat: this.passData.wherelatitude,long:this.passData.wherelatitude},
            "unpackFurniture": self.state.unpackFurniture,
            "wrappingClothes": self.state.wrappingClothes,
            "cleaning": self.state.cleaning,
            "houseSpace":150,
            "offerValidty": 3
          }

          Client.post(`requests/move-furniture/create`,obj).then((res)=>{
               
              this.setState({requestId:res.data._id})
              this.getPermissionAsync()
          }).catch((res)=>{
             
          })
    }
    render(){
        let val =this.state;
        let time = val.Time == "Select appointment time";
        let date = val.Date == "Select appointment date"
        let stepOneVald = time && date;
        return(
        <View style={{flex:1}}> 
            <Header 
            backgroundColor={"grey"}
            leftComponent={{icon:'md-menu', type:'ionicon', color:"#FFF", size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.dispatch(DrawerActions.toggleDrawer())} }}
            centerComponent={<Text style={styles.headerTitleStyle}>My Rides</Text>}
            outerContainerStyles={styles.headerStyle}
            innerContainerStyles={{marginLeft:10, marginRight: 10}}
        />
            <ProgressSteps activeStep={this.state.step} onSubmit={this.onSubmit}>
                <ProgressStep nextBtnDisabled={stepOneVald} onNext={()=>this.firstStep(this.state)} label="Date & Time">
                   <StepOne handleTime={this.handleTime} Time={this.state.Time} Date={this.state.Date} hideDate={this.state.hideDate} showTime={this.state.showTime} handleDatePicked={this.handleDatePicked}/>
                </ProgressStep>
                <ProgressStep label="Location">
                    <StepTwo whereText={this.state.whereText} mapRegion={this.state.region} dropText={this.state.dropText} passData={this.passData} searchData={this.searchData} navigation={this.props.navigation} />
                </ProgressStep>
                <ProgressStep label="Descrption" onNext={()=>{this.submit(this)}}>
                   <StepThree
                        unpackFurnitureF={this.unpackFurniture}
                        wrappingClothesF={this.wrappingClothes}
                        cleaningF={this.cleaning}
                        houseSpaceF={this.houseSpace}
                        offerValidtyF={this.offerValidty}
                        unpackFurniture={this.state.unpackFurniture}
                        wrappingClothes={this.state.wrappingClothes}
                        cleaning={this.state.cleaning} offerValidty={this.state.offerValidty}
                        houseSpace={this.state.houseSpace}
                    />
                </ProgressStep>
                <ProgressStep  onSubmit={this.onSubmit} label="Gallery">
                   <StepFour
                   images={this.state.images}
                        _pickImage={ this._pickImage}
                   />
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