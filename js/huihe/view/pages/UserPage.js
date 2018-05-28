import React, {Component} from 'react';
import {View,Text,StyleSheet,ScrollView,Image,TouchableOpacity} from 'react-native';
import HeaderNoBack from '../head/HeaderNoBack';
import ItemView from '../common/ItemView';
let img1= require('../../../../mres/Home/icon/punch_card_icon.png');
let imgMail= require('../../../../mres/Home/icon/mail.png');
let imgMessage= require('../../../../mres/Home/icon/messages.png');
let imgScan= require('../../../../mres/Home/icon/add_friend_scan.png');
let imgService= require('../../../../mres/Home/icon/function_icon_service_center.png');
let imgSet= require('../../../../mres/Home/icon/setting.png');
import Util from '../utils/Util';
import Location from '../pages/Location';
import {StackNavigator} from 'react-navigation';
import Header from "../head/Header";
export default class UserPage extends Component {

	static navigationOptions = {
		headerTitle:'我的',
		tabBarLabel: '我的'
	};
	render(){
		const {navigate}=this.props.navigation;
		return(
			<View>
			<Header text='我的' showBack={true} backFunc={false} />
			<ScrollView style={styles.content}>
				
				<View style={styles.centerView}/>
				<View style={styles.topView}>
					<Image source={imgService} style={styles.headIcon}/>
					<Text style={styles.nameText}>用户名</Text>
				</View>
				<View style={styles.centerView}/>
				<TouchableOpacity onPress={()=>navigate('Location')}>
					<ItemView text='考勤打卡' icon={img1} />
				</TouchableOpacity>
				<View style={styles.centerView}/>
				
				<ItemView text='我的客服' icon={imgService}/>
					
				<ItemView text='消息' icon={imgMessage}/>
					
				<ItemView text='邮件' icon={imgMail}/>
					
				<ItemView text='扫一扫' icon={imgScan}/>
				
				<View style={styles.centerView}/>
			
				<ItemView text='设置' icon={imgSet}/>
				
			</ScrollView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	content:{
		backgroundColor:'#e4e4e4'
	},
	topView:{
		height:100,
		backgroundColor:'#FFFFFF',
		flexDirection: 'row',
		alignItems:'center',
	},
	centerView:{
		height:20
	},
	nameText:{
		fontSize:25,
		color:'#C92A3A',
		marginLeft:15
	},
	headIcon:{
		width:50,
		height:50,
		marginLeft:15
	},
	lineCenter: {
            backgroundColor: '#C92A3A',
            height: 1,
            width: Util.size.width,
            marginLeft : 50
    },
    lineSide: {
            backgroundColor: '#C92A3A',
            height: 1,
            width: Util.size.width,
    },
}
);