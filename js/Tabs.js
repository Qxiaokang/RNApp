import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
// 注册tabs
import Trending from "./Trending";
import {TabNavigator} from "react-navigation";
import Favorite from "./Favorite";
import Mine from "./Mine";
import Hot from "./Hot";

const Tabs = TabNavigator({
    最热: {
        screen: Hot, navigationOptions: {
            /*tabBar: {
                label: '最热',
                icon: ({tintColor}) => (<Image source={require('../mres/img/home_live_normal.png')}
                                               style={[{tintColor: tintColor}, styles.icon]}/>),
            }*/
            tabBarLable:'最热',
            tabBarIcon:({tintColor}) => (<Image source={require('../mres/img/home_live_normal.png')}
                                                style={[{tintColor: tintColor}, styles.icon]}/>)
        },
    },
    趋势: {
        screen: Trending, navigationOptions: {
            tabBarLable:'趋势',
            tabBarIcon:({tintColor}) => (<Image source={require('../mres/img/home_message_normal.png')}
                                                style={[{tintColor: tintColor}, styles.icon]}/>)
        },
    },
    收藏: {
        screen: Favorite, navigationOptions: {
            tabBarLable: '收藏',
            tabBarIcon: ({tintColor}) => (<Image source={require('../mres/img/home_user_normal.png')}
                                                 style={[{tintColor: tintColor}, styles.icon]}/>),
        },
    },
    我的: {
        screen: Mine, navigationOptions: {
            tabBarLable: '我的',
            tabBarIcon: ({tintColor}) => (<Image source={require('../mres/img/home_my_normal.png')}
                                                 style={[{tintColor: tintColor}, styles.icon]}/>),
        },
    },
}, {
    animationEnabled: false,// 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false,// 是否可以左右滑动切换
    backBehavior: 'none',// 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#ff0000',// 文字和图片选中颜色
        inactiveTintColor: '#fff', // 文字和图片未选中颜色
        showIcon: true,// android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle:
            {
                height: 0 // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            },
        style: {
            backgroundColor: '#666',// TabBar 背景色 // height: 44
        },
        labelStyle: {
            fontSize: 15,// 文字大小
        }
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        color: '#000000',
        fontSize: 10
    },
    selectedTabText: {
        color: '#D81E06'
    },
    icon: {
        width: 26,
        height: 26
    }
});
export default Tabs;