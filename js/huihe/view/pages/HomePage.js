import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, WebView, BackHandler, ToastAndroid} from 'react-native';
import HeaderNoBack from '../head/HeaderNoBack';
import Util from '../utils/Util';
import Header from "../head/Header";
import Toast from 'react-native-whc-toast';
export default class HomePage extends Component {
	constructor(props){
		super(props);
	}
    static navigationOptions = {
        headerTitle: '首页',
        tabBarLabel: '首页',
    }

    render() {
        var _this=this;
        return (
            <View style={styles.webContent}>
                <Header {..._this.props} title={'首页'} showBack={true} backFunc={_this._back.bind(_this)}/>
                <WebView source={{uri: 'http://www.baidu.com'}}/>
				<Toast ref={'toast'}/>
            </View>
        );
    }
    _back(){
        console.log('返回----------------------------------');
	}
}
const styles=StyleSheet.create({
	webContent:{
		width:Util.size.width,
		height:Util.size.height,
		backgroundColor:'#000000'
	}
});