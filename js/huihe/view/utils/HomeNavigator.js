import ConsultPage from "../pages/ConsultPage";
import UserPage from "../pages/UserPage";
import LifePage from "../pages/LifePage";
import HomePage from "../pages/HomePage";
import {TabNavigator} from "react-navigation";
import React from "react";
import TabBarItem from "../common/TabBarItem";

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
        swipeEnabled: true,//是否允许左右滑动
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
export default HomeNavigator;