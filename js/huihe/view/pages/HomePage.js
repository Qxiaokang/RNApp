import React, {Component} from 'react';
import {View, StyleSheet, WebView} from 'react-native';
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
        return (
            <View style={styles.webContent}>
                <Header {...this.props} title={'首页'} showBack={true} backFunc={false}/>
                <WebView source={{uri: 'http://www.baidu.com'}}/>
				<Toast ref={'toast'}/>
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