import React, {Component} from 'react';
import {InteractionManager} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import AppNavigator from "../utils/AppNavigator";

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


