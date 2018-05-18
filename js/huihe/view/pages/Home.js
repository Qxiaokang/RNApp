import React, {Component} from 'react';
import {StyleSheet,View,Text,InteractionManager,Platform} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {StackNavigator,TabNavigator} from 'react-navigation';


import TabBarItem from "../common/TabBarItem";

import HomePage from './HomePage';
import ConsultPage from './ConsultPage';
import LifePage from './LifePage';
import UserPage from './UserPage';
import Location from './Location';
import Login from "../../../Login";

export default class Main extends Component {

    componentWillUnmount() {
        // 如函数名所示，组件未被渲染加载时定义一个定时器timer，初始化或者重置timer
        this.timer && clearTimeout(this.timer);
    }

    componentDidMount() {
        // 如函数名所示，组件以及被渲染或者加载后进行的回调

        let self = this;

        this.timer = setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
            })
        },2000)     
    }

    render() {
        return (
            <AppNavigator/>
        );
    }
}

//主页tab栏

const HomeNavigator = TabNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions:({navigation}) => ({
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../../../../mres/Home/icon/home.png')}
                        selectedImage={require('../../../../mres/Home/icon/home-select.png')}
                    />
                ),
            })
        },
        ConsultPage: {
            screen: ConsultPage,
            navigationOptions:({navigation}) => ({
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../../../../mres/Home/icon/wuye.png')}
                        selectedImage={require('../../../../mres/Home/icon/wuye-select.png')}
                    />
                ),
            })
        },
        LifePage: {
            screen: LifePage,
            navigationOptions:({navigation}) => ({
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../../../../mres/Home/icon/life.png')}
                        selectedImage={require('../../../../mres/Home/icon/life-select.png')}
                    />
                ),
            })
        },
        UserPage: {
            screen: UserPage,
            navigationOptions:({navigation}) => ({
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../../../../mres/Home/icon/mine.png')}
                        selectedImage={require('../../../../mres/Home/icon/mine-select.png')}
                    />
                ),
            })
        },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazyLoad: true,
        showIcon:true,
        tabBarOptions: {
            activeTintColor: '#c92a3a', //  激活版块的颜色
            inactiveTintColor: '#979797', // 非激活版块的颜色
            style: {backgroundColor: '#ffffff'},// 背景颜色
            labelStyle: {fontSize: 12,bottom: 2},          // 文字大小
            indicatorStyle:{height:0},
            showIcon:true,
            pressOpacity:1,
            iconStyle:{
                position:'relative',
                top:2
            },
        },
        showLable: false,
    },
);


// 路由

const AppNavigator = StackNavigator(
    {
        Login:{screen:Login},
        Main: {screen: HomeNavigator},
        Location:{screen: Location},
    },
    {
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



const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'#fff',
    },
    tabBarIcon: {
        width: 26, height: 26,
        resizeMode: 'contain',
    },
    tabBarSelectedIcon: {
        tintColor:'#c92a3a',
        marginBottom:'-40'
    }
})



