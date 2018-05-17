import React, {Component} from 'react';
import {
    Image, ScrollView, StyleSheet, View, Text, Dimensions, TouchableOpacity, ImageBackground,
    BackHandler, ToastAndroid
} from 'react-native';

let image1 = require('../mres/img/splash1.jpg');
let image2 = require('../mres/img/timg.jpg');
let image3 = require('../mres/img/splash3.jpg');
import SQLite from '../js/db/SQLite';
var sqlite=new SQLite();
var db;
const {width, height} = Dimensions.get('window');
export default class GuideView extends Component{
    compennetDidUnmount(){
        SQLite.close();
    }
    componentWillMount(){
        //开启数据库
        if(!db){
            console.log("准备打开SQLite");
            db = sqlite.openDB();
        }
        //建表
        console.log("创建user表");
        sqlite.createTable();
        //删除数据
        sqlite.deleteData();
        //模拟一条数据
        var userData = [];
        var user = {};
        user.id="sz123";
        user.pwd="123456";
        user.name = "张三";
        user.age = "28";
        user.sex = "男";
        user.phone = "18900001111";
        user.email = "2343242@qq.com";
        user.qq = "111222";
        userData.push(user);
        //插入数据
        sqlite.insertUserData(userData);
        //查询
        db.transaction((tx)=>{
            tx.executeSql("select * from user", [],(tx,results)=>{
                var len = results.rows.length;
                for(let i=0; i<len; i++){
                    var u = results.rows.item(i);
                    //一般在数据查出来之后，  可能要 setState操作，重新渲染页面
                    alert("姓名："+u.name+"，年龄："+u.age+"，电话："+u.phone);
                }
            });
        },(error)=>{//打印异常信息
            console.log(error);
        });
    }
    constructor(props) {
        super(props);
    };
    render() {
        return (
        <ScrollView
            contentContainerStyle={styles.contentContainer}
            bounces={false}
            pagingEnabled={true}

            horizontal={true}>
            <Image source={image1} style={styles.backgroundImage}/>
            <Image source={image2} style={styles.backgroundImage}/>
            <ImageBackground source={image3} style={[styles.backgroundImage,styles.btnOut]}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.props.navigation.navigate('Tabs');
                    }}
                ><Text style={styles.btnText}>启动应用</Text>
                </TouchableOpacity>
            </ImageBackground>
        </ScrollView>);
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
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        return true;
    };
};
var styles = StyleSheet.create({
    contentContainer: {
        width: width * 3,
        height: height,
    },
    backgroundImage: {
        width: width,
        height: height,
    },
    btnOut: {
        alignItems: 'center',
    },
    btn: {
        width: 150,
        height: 50,
        backgroundColor: '#148525',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:height-150,
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
    },
});
