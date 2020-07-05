import { createSwitchNavigator,createAppContainer } from 'react-navigation';
import { AuthStack, RootNavigator, DriverRootNavigator, } from './MainNavigator';
import { AuthLoadingScreen } from '../screens/AuthLoadingScreen';
//        // You could add another route here for authentication. AounkApp@123 AounkApp366@gmail.com
const AppNavigator= createSwitchNavigator({
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
        Root: RootNavigator,
        },
        {
            initialRouteName: 'Auth'
        }
    );
    const AppContainer = createAppContainer(AppNavigator);
    export default AppContainer;
  