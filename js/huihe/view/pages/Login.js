import React from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import Util from "../../../utils/Util";
import StyleUtil from '../../../utils/StyleUtil';
import SQLite from "../../../utils/SQLite";
import GetSetStorage from "../../../utils/GetSetStorage";
import NetWorkTool from "../../../utils/NetWorkTool";
import Toast from 'react-native-whc-toast'; // 引入类库
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loading from 'react-native-loading-w'
import NetUtil from "../../../utils/NetUtil";
var sqlite = new SQLite();
var db;
var net = false;
var _this;
//let url='http://192.168.1.110:3200/mobileLogin/login';
let url='http://192.168.1.126:8082/loginHandles';
// 也可以通过调用Toast.hide(toast); 手动隐藏toast实例
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.userName = '';
        this.userPwd = '';
        this.text = '加载中...';
        _this=this;
    }
    handleMethod(isConnected) {
        console.log('test', (isConnected ? 'online' : 'offline'));
    }
    /**检查网络是否断开*/
    checkNet() {
        NetWorkTool.checkNetworkState((isConnected) => {
            if (!isConnected) {
                _this.refs.toast.show(NetWorkTool.NOT_NETWORK, Toast.Duration.short, Toast.Position.bottom);
                net = false;
            } else {
                net = true;
            }
        });
    }
    componentWillUnmount() {
        console.log("页面销毁")
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
        //关闭数据库
        sqlite.close();
    }
    componentDidMount(){
        this.checkNet();
    }
    componentWillMount() {
        console.log("登录---componentWillMount")
        NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
        //开启数据库
        console.log("准备打开SQLite");
        db = sqlite.openDB();
        //如果是第一次进入创建表
        GetSetStorage.getStorageAsync('isFirst').then((result) => {
            if (result == null || result == '') {
                console.log("首次进入App")
                //建表
                console.log("创建t_user表");
                sqlite.createTable();
                //删除数据
                //sqlite.deleteData();
                //模拟一条数据
                var userData = [];
                var user = {};
                user.id = "13344445555";
                user.pwd = "123456";
                user.name = "张三";
                user.age = "28";
                user.sex = "男";
                user.phone = "18900001111";
                user.email = "2343242@qq.com";
                user.qq = "111222";
                userData.push(user);
                //插入数据
                //ßsqlite.insertUserData(userData);
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
                GetSetStorage.setStorageAsync('isFirst', 'not');
            } else {
                console.log("非首次进入")
            }
        });

    }

    render() {
        return (
            <View>
                <KeyboardAwareScrollView>
                    <View style={styles.content}>
                        <Image source={require('../../../../mres/img/icon1.png')}/>
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
                            <TouchableOpacity onPress={() => Alert.alert('提示', "此功能尚未开通")} style={styles.forgetPwd}>
                                <Text style={styles.forgetText}>忘记密码</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity style={StyleUtil.btnLogin}
                                          onPress={() => {
                                              if (this.userName == '') {
                                                  //15136311938
                                                  _this.refs.toast.showBottom('手机号码不能为空');
                                              } else if (this.userPwd == '') {
                                                  _this.refs.toast.showBottom('密码不能为空');
                                              } else {
                                                  _this.checkNet();
                                                  if (net) {
                                                      _this.getLoading().show('登录中...');
                                                      let params = {
                                                          'username': this.userName,
                                                          'password': this.userPwd
                                                      };
                                                      console.log(JSON.stringify(params));
                                                      NetUtil.postJSON(url, params, function (result) {
                                                          if (result == null) {
                                                              _this.refs.toast.show('登录错误，请重试', Toast.Duration.long, Toast.Position.bottom);
                                                              _this.getLoading().dismiss();
                                                          }
                                                          console.log(JSON.stringify(result));
                                                          console.log('登录返回信息：' + result + '----' + result.result + '----' + result.message);
                                                          let flag = result.result;
                                                          let errorMsg = result.message;
                                                          if (!flag) {
                                                              _this.refs.toast.show(errorMsg.isEmpty ? '登录失败，请重试' : errorMsg, Toast.Duration.long, Toast.Position.bottom);
                                                          } else {
                                                              _this.refs.toast.show('登录成功', Toast.Duration.long, Toast.Position.bottom);
                                                              db.transaction((tx) => {
                                                                  tx.executeSql("select * from t_user where user_id=? ", [_this.userName], (tx, results) => {
                                                                      var len=results.rows.length;
                                                                      console.log('len-------'+len);
                                                                      if(len>0){
                                                                          tx.executeSql("update t_user set user_id=?,user_pwd=?",[_this.userName,_this.userPwd],()=>{
                                                                          },(error)=>{
                                                                              _this.refs.toast.show('更新用户信息失败！', Toast.Duration.long, Toast.Position.bottom);
                                                                              console.log('DB_Error:'+error);
                                                                          });
                                                                      }else {
                                                                          tx.executeSql("insert into t_user (user_id,user_pwd,name,age,sex,phone,email,qq) values(?,?,?,?,?,?,?,?)",[_this.userName,_this.userPwd,'','','','','',''],()=>{},
                                                                              (error)=>{
                                                                                  _this.refs.toast.show('插入用户信息失败！', Toast.Duration.long, Toast.Position.bottom);
                                                                                  console.log('DB_Error:'+error);
                                                                              });
                                                                      }
                                                                  }, (error) => {
                                                                      _this.refs.toast.show('用户查询失败！', Toast.Duration.long, Toast.Position.bottom);
                                                                      console.log('DB_Error:'+error);
                                                                  });
                                                              });
                                                              _this.getLoading().dismiss();
                                                              _this.props.navigation.navigate('Main');
                                                          }
                                                          _this.getLoading().dismiss();
                                                      });
                                                  } else {
                                                      db.transaction((tx) => {
                                                          tx.executeSql("select * from t_user where user_id=? and user_pwd=?", [this.userName, this.userPwd], (tx, results) => {
                                                              var len = results.rows.length;
                                                              if (len > 0) {
                                                                  Alert.alert('提示', '网络不通，是否进行离线登录?',
                                                                      [
                                                                          {
                                                                              text: '确 定',
                                                                              onPress: _this.offLineLogin
                                                                          },
                                                                          {
                                                                              text: '取 消',
                                                                              style: 'cancel'
                                                                          }
                                                                      ],
                                                                      {
                                                                          cancelable: true,
                                                                          onDismiss: () => {
                                                                          }
                                                                      });
                                                              } else {
                                                                  _this.refs.toast.show('网络不通，请稍后再试...', Toast.Duration.short, Toast.Position.bottom);
                                                              }
                                                          }, (error) => {//打印异常信息
                                                              _this.refs.toast.show('登录出错', Toast.Duration.short, Toast.Position.bottom);
                                                              console.log(error);
                                                          });
                                                      });
                                                  }
                                              }
                                          }}>
                            <Text style={StyleUtil.btnText}>登 录</Text>
                        </TouchableOpacity>
                    </View>
                    <Toast ref={'toast'}/>
                    <Loading ref={'loading'} text={_this.text} />
                </KeyboardAwareScrollView>
            </View>
        );
    }
    /**离线登陆成功*/
    offLineLogin() {
        _this.refs.toast.show('离线登录成功', Toast.Duration.short, Toast.Position.bottom);
        _this.props.navigation.navigate('Main');
    }
    /**获取loading圈*/
    getLoading() {
        return this.refs['loading'];
    }
}
const styles = StyleSheet.create(
    {
        content: {
            backgroundColor: '#FFF',
            width: Util.size.width,
            height: Util.size.height,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pwdView: {
            width: '80%',
            marginTop: 15,
            position: 'relative'
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
        forgetText: {
            color: '#c92a3a',
            height: 40,
            lineHeight: 35
        },
        input1: {
            marginTop: 15,
            borderColor: '#AAAAAA',
            borderWidth: 1,
            borderRadius: 15,
            width: '80%',
            height: 40,
            textAlignVertical: 'center',
            borderStyle: 'solid',
            paddingLeft:5
        },
        input2: {
            borderColor: '#AAAAAA',
            width: '100%',
            borderWidth: 1,
            borderRadius: 15,
            width: '100%',
            height: 40,
            textAlignVertical: 'center',
            borderStyle: 'solid',
            paddingLeft:5
        }
    }
);