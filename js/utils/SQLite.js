import React,{Component} from 'react';
import{
    ToastAndroid
} from 'react-native';
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
var database_name = "huihe.db";//数据库文件
var database_version = "1.0";//版本号
var database_displayname = "HuiHeSQLite";
var database_size = -1;//-1应该是表示无限制
var T_USER='t_user';
import Toast from 'react-native-whc-toast';
var db;
export default class  SQLite extends Component{
    componentWillUnmount(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
    }
    openDB(){
        db =SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            ()=>{
                this._successCB('open');
            },
            (err)=>{
                this._errorCB('open',err);
            });
        return db;
    }
    createTable(){
        if (!db) {
            this.open();
        }
        //创建用户表
        db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS '+T_USER+'(' +
                'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +
                'user_id VARCHAR,' +
                'user_pwd VARCHAR,' +
                'name varchar,'+
                'age VARCHAR,' +
                'sex VARCHAR,' +
                'phone VARCHAR,' +
                'email VARCHAR,' +
                'qq VARCHAR)'
                , [], ()=> {
                    this._successCB('executeSql');
                }, (err)=> {
                    this._errorCB('executeSql', err);
                });
        }, (err)=> {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, ()=> {
            this._successCB('transaction');
        })
    }
    deleteData(){
        if (!db) {
            this.open();
        }
        db.transaction((tx)=>{
            tx.executeSql('delete from t_user',[],()=>{

            });
        });
    }
    dropTable(){
        db.transaction((tx)=>{
            tx.executeSql('drop table t_user',[],()=>{

            });
        },(err)=>{
            this._errorCB('transaction', err);
        },()=>{
            this._successCB('transaction');
        });
    }
    insertUserData(userData){
        let len = userData.length;
        if (!db) {
            this.open();
        }
        this.createTable();
        this.deleteData();
        db.transaction((tx)=>{
            for(let i=0; i<len; i++){
                var user = userData[i];
                let user_id=user.id;
                let user_pwd=user.pwd;
                let name= user.name;
                let age = user.age;
                let sex = user.sex;
                let phone = user.phone;
                let email = user.email;
                let qq = user.qq;
                let sql = "INSERT INTO "+T_USER+"(user_id,user_pwd,name,age,sex,phone,email,qq)"+
                    "values(?,?,?,?,?,?,?,?)";
                tx.executeSql(sql,[user_id,user_pwd,name,age,sex,phone,email,qq],()=>{

                    },(err)=>{
                        console.log(err);
                    }
                );
            }
        },(error)=>{
            this._errorCB('transaction', error);
            this.refs.toast.show("数据插入失败",Toast.Duration.short,Toast.Position.bottom);
        },()=>{
            this._successCB('transaction insert data');
            this.refs.toast.show("成功插入 "+len+" 条用户数据",Toast.Duration.short,Toast.Position.bottom);
        });
    }
    close(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
        db = null;
    }
    _successCB(name){
        console.log("SQLiteStorage "+name+" success");
    }
    _errorCB(name, err){
        console.log("SQLiteStorage "+name);
        console.log(err);
    }
    render(){
        return (<Toast ref={'toast'}/>);
    }
};