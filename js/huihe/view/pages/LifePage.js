import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Header from "../head/Header";

export default class LifePage extends Component {

	static navigationOptions = {
		headerTitle:'生活',
		tabBarLabel: '生活'
	}


	render(){
		return(
			<View>
				<Header title='生活' showBack={false} backFunc={false}/>
				<Text>生活</Text>
			</View>
		);
	}
}