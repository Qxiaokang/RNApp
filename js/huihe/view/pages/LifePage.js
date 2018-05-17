import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import HeaderNoBack from '../head/HeaderNoBack';

export default class LifePage extends Component {

	static navigationOptions = {
		headerTitle:'生活',
		tabBarLabel: '生活'
	}


	render(){
		return(
			<View>
				<HeaderNoBack text='生活' />
				<Text>生活</Text>
			</View>
		);
	}
}