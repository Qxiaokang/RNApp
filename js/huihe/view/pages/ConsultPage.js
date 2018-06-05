import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Header from "../head/Header";

export default class ConsultPage extends Component {

	static navigationOptions = {
		headerTitle:'物业',
		tabBarLabel: '物业',
	}

	render(){
		return(
			<View>
				<Header title='物业' showBack={false}/>
				<Text>物业</Text>
			</View>
		);
	}
}