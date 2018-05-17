import React, { Component } from 'react';
import {
    BackHandler,
    StyleSheet,
    Text, ToastAndroid,
    View
} from 'react-native';
import NetUtil from "./utils/NetUtil";

var Geolocation = require('Geolocation');

//监听定位的id
var watchID = null
//post请求
let params = {'key1':'value1','key2':'value2'};
NetUtil.postJSON('http://www.baidu.com/',params,function (set) {
    //下面的就是请求来的数据
    console.log(set)
})

//默认应用的容器组件
export default class MLocation extends Component {

    //渲染
    render() {
        return (
           <View style={styles.container}>
                <Text style={styles.item} onPress={this.beginWatch.bind(this)}>开始监听</Text>
                <Text style={styles.item} onPress={this.stopWatch.bind(this)}>停止监听</Text>
            </View>
        );
    }

    //开始监听位置变化
    beginWatch() {
        watchID = Geolocation.watchPosition(
            location => {
                var result = "速度：" + location.coords.speed +
                    "\n经度：" + location.coords.longitude +
                    "\n纬度：" + location.coords.latitude +
                    "\n准确度：" + location.coords.accuracy +
                    "\n行进方向：" + location.coords.heading +
                    "\n海拔：" + location.coords.altitude +
                    "\n海拔准确度：" + location.coords.altitudeAccuracy +
                    "\n时间戳：" + location.timestamp;
                alert(result);
            },
            error => {
                alert("获取位置失败："+ error)
            }
        );
        //get请求,以百度为例,没有参数,没有header
        NetUtil.get('https://www.baidu.com/','',function (set) {
            //下面是请求下来的数据
            console.log(set)
        })
    }

    //停止监听位置变化
    stopWatch() {
        Geolocation.clearWatch(watchID);
    }
    onBackAndroid = () => {
        return true;
    };
}

//样式定义
const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop:25
    },
    item:{
        margin:15,
        height:30,
        borderWidth:1,
        padding:6,
        borderColor:'#ddd',
        textAlign:'center'
    },
});
