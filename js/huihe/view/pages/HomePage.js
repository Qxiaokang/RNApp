import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, WebView, BackHandler, ToastAndroid} from 'react-native';
import HeaderNoBack from '../head/HeaderNoBack';
import Util from '../utils/Util';

export default class HomePage extends Component {

	static navigationOptions = {
		headerTitle:'首页',
		tabBarLabel: '首页',
	}
	/**控件渲染后触发*/
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
	/**控件渲染前触发*/
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
	render(){
		return(
			<View style={styles.webContent}>
				<HeaderNoBack text='首页' />
				<WebView source={{uri:'http://www.baidu.com'}}/>
			</View>
		);
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
}
const styles=StyleSheet.create({
	webContent:{
		width:Util.size.width,
		height:Util.size.height,
		backgroundColor:'#000000'
	}
});