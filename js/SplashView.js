import React, { Component } from 'react';
import { View, Text, StyleSheet,Animated,Dimensions } from 'react-native';
import GetSetStorge from '../js/GetSetStorge';
const splashImg = require('../mres/img/find3.jpg');//加载图片
const { width, height } = Dimensions.get('window');
// create a component
class SplashView extends Component {
    constructor(props) {
        super(props);
        this.state = {  //这是动画效果
            bounceValue: new Animated.Value(1)
        };
    }
    componentDidMount() {
        Animated.timing(
            this.state.bounceValue, { toValue: 1.3, duration: 1500 }
        ).start();
        this.timer = setTimeout(() => {
           /* GetSetStorge.getStorgeAsync('isFrist').then((result) => {
                if (result == null || result == '') {
                    //第一次启动
                    this.props.navigation.navigate('GuideView');
                    GetSetStorge.setStorgeAsync('isFrist', 'true');
                } else {
                    //第二次启动s
                    this.props.navigation.navigate('HomePage');
                }
            }).catch((error) => {
                console.log('==========================');
                console.log('系统异常' + error);
                console.log('==========================');
            });*/
            this.props.navigation.navigate('GuideView');
        }, 1500);

    }
    componentWillUpdate = () => {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <Animated.Image
                style={{
                    width: width,
                    height: height,
                    transform: [{ scale: this.state.bounceValue }]
                }}
                source={splashImg}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default SplashView;