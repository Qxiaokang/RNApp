import React, {Component} from 'react';
import {View,Text,StyleSheet,Image,WebView} from 'react-native';
import HeaderNoBack from '../head/HeaderNoBack';
import Util from '../utils/Util';

export default class HomePage extends Component {

	static navigationOptions = {
		headerTitle:'首页',
		tabBarLabel: '首页',
	}

	render(){
		return(
			<View style={styles.webContent}>
				<HeaderNoBack text='首页' />
				<WebView source={{uri:'http://www.baidu.com'}}/>
			</View>
		);
	}
}
const styles=StyleSheet.create({
	webContent:{
		width:Util.size.width,
		height:Util.size.height,
		backgroundColor:'#000000'
	}
});