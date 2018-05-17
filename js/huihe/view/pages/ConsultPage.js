import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import HeaderNoBack from '../head/HeaderNoBack';

export default class ConsultPage extends Component {

	static navigationOptions = {
		headerTitle:'物业',
		tabBarLabel: '物业',
	}

	render(){
		return(
			<View>
				<HeaderNoBack text='物业' />
				<Text>物业</Text>
			</View>
		);
	}
}