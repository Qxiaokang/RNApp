import React from 'react';
import {StackNavigator} from "react-navigation";
import Login from "../pages/Login";
import HomeNavigator from "./HomeNavigator";
import EventsExample from "../pages/UserSignIn";
// 路由
const App = StackNavigator(
    {
        Login:{screen: Login},
        Main: {screen: HomeNavigator},
        MMap:{ screen: EventsExample}
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