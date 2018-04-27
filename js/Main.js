import GuideView from '../js/GuideView';
import HomePage from '../js/HomePage';
import { StackNavigator } from 'react-navigation';
import SplashView from "./SplashView";
import Util from '../js/Util';
const AppNavigation = StackNavigator(
    {
        SplashView:{screen: SplashView},
        GuideView: {screen: GuideView},
        HomePage: {screen: HomePage}
    },{
        initialRouteName: 'SplashView',
        navigationOptions:{
            header:null,
        }
    }
);
export default AppNavigation;