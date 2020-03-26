import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { 
    ProfileScreen, 
    SingleOffer,
    SearchScreenMove,
    RideListPage, 
    NotificationPage, 
    MapScreen, 
    RegistrationPage,
    LoginScreen,
    SearchScreen,
    EditProfilePage ,
    PinCodeScreen,
    PhoneLand,
    SelectType,
    Movingfurniture,
    MovefurnitreLandingPage,
    offersDetail,
    VoucherScreen,
    SettingScreen,
    OffersPage,
    AboutPage
} from '../screens';
import SideMenu from '../components/SideMenu';

//app stack for user end
    export const AppStack = {
        SearchScreenMove:{
            screen:SearchScreenMove,
            navigationOptions:{
                header:null
            }
        },
        MovefurnitreLandingPage:{
            screen:MovefurnitreLandingPage,
            navigationOptions:{
                header:null
            }
        },
        SingleOffer : {
            screen:SingleOffer,
            navigationOptions:{
                header:null
            }
        },
        offersDetail:{
            screen:offersDetail,
            navigationOptions:{
                header:null
            }
        },
        OffersPage:{
            screen:OffersPage,
            navigationOptions:{
                header:null
            }
        },
        VoucherScreen:{
            screen:VoucherScreen,
            navigationOptions: {
                header : null
            }
        },
        Movingfurniture:{
            screen: Movingfurniture,
            navigationOptions: {
                header : null
            }
        },
        RideList:{
            screen: RideListPage,
            navigationOptions:{
            header:null,
            }
        },
        Notifications:{
            screen:NotificationPage,
            navigationOptions:{
                header:null,
                }
        },
        SettingScreen:{
            screen:SettingScreen,
            navigationOptions:{
                header: null
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions:{
                header: null
            }
        },
        About: {
            screen: AboutPage,
            navigationOptions:{
                header: null
            }
        },
        Map: {
            screen: MapScreen,
            navigationOptions:{
                header: null
            }
        },
        Search: {
            screen:  SearchScreen,
            navigationOptions:{
                header: null
            } 
        },
        editUser:{
            screen: EditProfilePage,
            navigationOptions:{
                header: null
            } 

        },
    }

    //authentication stack for user before login
    export const AuthStack = createStackNavigator({
        offersDetail:{
            screen:offersDetail,
            navigationOptions:{
                header:null
            }
        },
        Movingfurniture:{
            screen: Movingfurniture,
            navigationOptions: {
                header : null
            }
        },
       
        SelectType:{
            screen:SelectType,
            navigationOptions:{
                header: null
            }
        },
        PhoneLand:{
            screen: PhoneLand,
            navigationOptions:{
                header:null
            }
        },
        Reg: {
            screen: RegistrationPage,
            navigationOptions:{
            header:null,
            }
        },
        PinCodeScreen:{
            screen: PinCodeScreen,
            navigationOptions:{
                header: null
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions:{
                header:null,
            }
        }
           
    },{
        initialRouteName: 'Login',
    });

    //drawer routes, you can add routes here for drawer or sidemenu
    const DrawerRoutes = {
        
        'Movingfurniture':{
            name: 'Movingfurniture',
            screen: createStackNavigator(AppStack, {initialRouteName: 'Movingfurniture',headerMode: 'none'})
        },
        'Map': {
            name: 'Map',
            screen: createStackNavigator(AppStack, {initialRouteName: 'Map',headerMode: 'none'})
        },
        'RideList': {
            name: 'RideList',
            screen: createStackNavigator(AppStack, { initialRouteName: 'RideList',headerMode: 'none' })
        },
        'Profile': {
            name: 'Profile',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Profile', headerMode: 'none' })
        },
        'About': {
            name: 'About',
            screen: createStackNavigator(AppStack, { initialRouteName: 'About', headerMode: 'none' })
        },
        'Notifications': {
            name: 'Notifications',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Notifications', headerMode: 'none' })
        },
         'OffersPage':{
            name: 'OffersPage',
            screen: createStackNavigator(AppStack, {initialRouteName: 'OffersPage',headerMode: 'none'})
        }
    };

    //main navigator for user end
    export const RootNavigator = createDrawerNavigator(
        DrawerRoutes,
        {
        drawerWidth: 180,
        initialRouteName:'Map',
        contentComponent: SideMenu,
      });



