import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet, BackHandler, ToastAndroid} from 'react-native';
import Util from "./utils/Util";
import StyleUtil from './utils/StyleUtil';
import Header from './huihe/view/head/Header';
import SQLite from "./db/SQLite";
import GetSetStorge from "./GetSetStorge";
import NetWorkTool from "./utils/NetWorkTool";

var sqlite = new SQLite();
var db;
var net=false;
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.userName = '';
        this.userPwd = '';
        NetWorkTool.checkNetworkState((isConnected) => {
            if (!isConnected) {
                ToastAndroid.show(NetWorkTool.NOT_NETWORK, ToastAndroid.SHORT);
                net=false;
            }else {
                net=true;
            }
        });
    }

    handleMethod(isConnected) {
        console.log('test', (isConnected ? 'online' : 'offline'));
    }

    componentWillUnmount() {
        console.log("页面销毁")
        //NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
        sqlite.close();
    }

    componentWillMount() {
        console.log("登录---componentWillMount")
        //NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
        //开启数据库
        console.log("准备打开SQLite");
        db = sqlite.openDB();
        //如果是第一次进入创建表
        GetSetStorge.getStorgeAsync('isFirst').then((result) => {
            if (result == null || result == '') {
                console.log("首次进入App")
                //建表
                console.log("创建t_user表");
                sqlite.createTable();
                //删除数据
                sqlite.deleteData();
                //模拟一条数据
                var userData = [];
                var user = {};
                user.id = "13111112222";
                user.pwd = "123456";
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
                db.transaction((tx) => {
                    tx.executeSql("select * from t_user", [], (tx, results) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            var u = results.rows.item(i);
                            console("姓名：" + u.name + "，年龄：" + u.age + "，电话：" + u.phone)
                            //一般在数据查出来之后，  可能要 setState操作，重新渲染页面
                            //alert("姓名："+u.name+"，年龄："+u.age+"，电话："+u.phone);
                        }
                    });
                }, (error) => {//打印异常信息
                    console.log(error);
                });
                GetSetStorge.setStorgeAsync('isFirst', 'not');
            } else {
                console.log("非首次进入")
            }
        });

    }

    render() {
        return (
            <View>
                <Header {...this.props} title="登录"/>
                <View style={styles.content}>
                    <Image source={require('../mres/img/icon1.png')}/>
                    <TextInput style={styles.input1} placeholder='请输入手机号码'
                               underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                               onChangeText={(text) => this.userName = text}
                    />
                    <View style={styles.pwdView}>
                        <TextInput style={styles.input2} placeholder='请输入密码'
                                   password={true}
                                   secureTextEntry={true}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => this.userPwd = text}
                        />
                        <Text style={styles.forgetPwd}>忘记密码</Text>
                    </View>
                    <TouchableOpacity style={StyleUtil.btnLogin}
                                      onPress={() => {
                                          if (this.userName == '') {
                                              ToastAndroid.show('手机号码不能为空', ToastAndroid.SHORT);
                                          } else if (this.userPwd == '') {
                                              ToastAndroid.show('密码不能为空', ToastAndroid.SHORT);
                                          } else {
                                              db.transaction((tx) => {
                                                  tx.executeSql("select * from t_user where user_id=? and user_pwd=?", [this.userName, this.userPwd], (tx, results) => {
                                                      var len = results.rows.length;
                                                      if (len > 0) {
                                                          ToastAndroid.show('登录成功', ToastAndroid.SHORT);
                                                          this.props.navigation.navigate('Main');
                                                      } else {
                                                          ToastAndroid.show('用户名或密码错误，请重新登录', ToastAndroid.SHORT);
                                                      }
                                                  });
                                              }, (error) => {//打印异常信息
                                                  ToastAndroid.show('登录出错', ToastAndroid.SHORT);
                                                  console.log(error);
                                              });

                                          }
                                      }}
                    >
                        <Text style={StyleUtil.btnText}>登 录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
            ;

    }

    backFunc() {
        BackHandler.exitApp();
        return true;
    };

}
const styles = StyleSheet.create(
    {
        content: {
            backgroundColor: '#FFF',
            width: Util.size.width,
            height: Util.size.height - 50,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pwdView: {
            position: 'relative',
            width: '80%'
        },
        logo: {
            width: Util.size.width / 3,
            height: Util.size.width / 3
        },
        forgetPwd: {
            position: 'absolute',
            right: 10,
            height: 40,
            lineHeight: 45,
            top: '50%',
            marginTop: -20,
            color: '#c92a3a'
        },
        view: {
            width: Util.size.width,
            height: Util.size.height / 2,
            alignItems: 'center',
            justifyContent: 'center'
        },
        input1: {
            marginTop: 15,
            borderColor: '#AAAAAA',
            borderWidth: 2,
            borderRadius: 15,
            width: '80%',
            height: 40
        },
        input2: {
            marginTop: 15,
            borderColor: '#AAAAAA',
            borderWidth: 2,
            borderRadius: 15,
            width: '100%',
            height: 40
        }
    }
);