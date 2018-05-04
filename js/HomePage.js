import React, {Component} from 'react';
import {StyleSheet, View, Text, BackHandler, ToastAndroid, Image, AppRegistry} from 'react-native';
import Hot from "./Hot";
import Mine from "./Mine";
import Trending from "./Trending";
import Favorite from "./Favorite";
import {TabNavigator} from 'react-navigation';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        /*this.state = {
            selectedTab: 'Mine', //默认选中的选项卡
        };*/
    }

    render() {
        return (<View style={styles.container}>
            <Tabs/>
        </View>);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    };

    _renderTabarItems(selectedTab, icon, selectedIcon, Component) {
        return (<Tabs.Item selected={this.state.selectedTab === selectedTab} title={selectedTab}
                                   titleStyle={styles.tabText} selectedTitleStyle={styles.selectedTabText}
                                   renderIcon={() => <Image style={styles.icon} source={icon}/>}
                                   renderSelectedIcon={() => <Image style={styles.icon} source={selectedIcon}/>}
                                   onPress={() => this.setState({selectedTab: selectedTab})}> <Component/>
        </Tabs.Item>);
    }
}
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
// 注册tabs
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
    swipeEnabled: true,// 是否可以左右滑动切换
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
