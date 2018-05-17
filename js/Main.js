import GuideView from '../js/GuideView';
import { StackNavigator } from 'react-navigation';
import SplashView from './SplashView';
import MLocation from '../js/MLocation';
import Tabs from "./Tabs";
const AppNavigation = StackNavigator(
    {
        SplashView:{screen: SplashView},
        GuideView: {screen: GuideView},
        Tabs:{screen:Tabs},
        MLocation:{screen:MLocation}
    },{
        initialRouteName: 'SplashView',
        navigationOptions:{
            header:null,
        }
    }
);
export default AppNavigation;