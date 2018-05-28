import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import HeaderNoBack from '../head/HeaderNoBack';
import Header from "../head/Header";

export default class ConsultPage extends Component {

	static navigationOptions = {
		headerTitle:'物业',
		tabBarLabel: '物业',
	}

	render(){
		return(
			<View>
				<Header text='物业' showBack={true} backFunc={false}/>
				<Text>物业</Text>
			</View>
		);
	}
}