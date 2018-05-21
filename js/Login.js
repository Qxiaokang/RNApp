import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet, BackHandler,Alert} from 'react-native';
import Util from "./utils/Util";
import StyleUtil from './utils/StyleUtil';
import Header from './huihe/view/head/Header';
import SQLite from "./db/SQLite";
import GetSetStorge from "./GetSetStorge";
import NetWorkTool from "./utils/NetWorkTool";
import Toast from  'react-native-whc-toast'; // 引入类库
import { NavigationActions } from 'react-navigation'
var sqlite = new SQLite();
var db;
var net=false;

// 也可以通过调用Toast.hide(toast); 手动隐藏toast实例
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.userName = '';
        this.userPwd = '';
        NetWorkTool.checkNetworkState((isConnected) => {
            if (!isConnected) {
                Toast.show(NetWorkTool.NOT_NETWORK, Toast.Duration.SHORT);
                net=false;
            }else {
                net=true;
            }
        });
        this._back=this._back.bind(this);
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
                <Header {...this.props} title="登录" showBack={true} backFunc={this._back}/>
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
                        <TouchableOpacity onPress={()=>Alert.alert('提示',"此功能尚未开通")} style={styles.forgetPwd}>
                            <Text style={styles.forgetText}>忘记密码</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity style={StyleUtil.btnLogin}
                                      onPress={() => {
                                          if (this.userName == '') {
                                              this.refs.toast.showBottom('手机号码不能为空');
                                              //Toast.show('手机号码不能为空',  Toast.Duration.SHORT);
                                          } else if (this.userPwd == '') {
                                              this.refs.toast.showBottom('密码不能为空');
                                          } else {
                                              db.transaction((tx) => {
                                                  tx.executeSql("select * from t_user where user_id=? and user_pwd=?", [this.userName, this.userPwd], (tx, results) => {
                                                      var len = results.rows.length;
                                                      if (len > 0) {
                                                          this.refs.toast.show('登录成功', Toast.Duration.short,Toast.Position.long);
                                                          /*var resetAction = NavigationActions.reset({
                                                              index: 0,
                                                              actions: [
                                                                  NavigationActions.navigate({routeName:'Main'})//要跳转到的页面名字
                                                              ]
                                                          });
                                                          this.props.navigation.dispatch(resetAction);*/
                                                          this.props.navigation.navigate('Main');
                                                      } else {
                                                          this.refs.toast.show('用户名或密码错误，请重新登录', Toast.Duration.short,Toast.Position.bottom);
                                                      }
                                                  });
                                              }, (error) => {//打印异常信息
                                                  this.refs.toast.show('登录出错', Toast.Duration.short,Toast.Position.bottom);
                                                  console.log(error);
                                              });

                                          }
                                      }}
                    >
                        <Text style={StyleUtil.btnText}>登 录</Text>
                    </TouchableOpacity>
                    <Toast ref={'toast'}/>
                </View>
            </View>
        )
            ;

    }

    _back=()=>{
        BackHandler.exitApp();
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
            width: '80%',
            marginTop:15,
            position:'relative'
        },
        logo: {
            width: Util.size.width / 3,
            height: Util.size.width / 3
        },
        forgetPwd: {
            position: 'absolute',
            right: 10,
            height: 40,
            top: '50%',
            marginTop: -20,
        },
        forgetText:{
            color: '#c92a3a',
            height:40,
            lineHeight:35
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
            borderColor: '#AAAAAA',
            width:'100%',
            borderWidth: 2,
            borderRadius: 15,
            width: '100%',
            height: 40
        }
    }
);