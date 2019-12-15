import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { 
    ProfileScreen, 
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
    VoucherScreen,
    SettingScreen,
    // About,
    AboutPage
} from '../screens';
import SideMenu from '../components/SideMenu';

//app stack for user end
    export const AppStack = {
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
        Movingfurniture:{
            screen: Movingfurniture,
            navigationOptions: {
                header : null
            }
        },
        Map: {
            screen: MapScreen,
            navigationOptions:{
                header: null
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
        initialRouteName: 'Movingfurniture',
    });

    //drawer routes, you can add routes here for drawer or sidemenu
    const DrawerRoutes = {
        'Map': {
            name: 'Map',
            screen: createStackNavigator(AppStack, {
                initialRouteName: 'Map', 
                navigationOptions:{
                    header: null
                } 
            })
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
    };

    //main navigator for user end
    export const RootNavigator = createDrawerNavigator(
        DrawerRoutes,
        {
        drawerWidth: 180,
        initialRouteName:'Map',
        contentComponent: SideMenu,
      });



