import React from 'react';
import Location from "../pages/Location";
import {StackNavigator} from "react-navigation";
import Login from "../pages/Login";
import HomeNavigator from "./HomeNavigator";
// 路由
const App = StackNavigator(
    {
        Login:{screen: Login},
        Main: {screen: HomeNavigator},
        Location:{screen: Location}
    },
    {
        initialRouteName: 'Login',
        headerMode: 'screen',  //Only works when headerMode is screen
        navigationOptions:{
            headerTintColor:'#333333',
            headerTitleStyle:{
                textAlign:'center',
                marginLeft:'auto',
                marginRight:'auto'
            },
            header:null,
        },
        mode:'card',
    }
);
export default App;