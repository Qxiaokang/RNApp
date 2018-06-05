import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, BackHandler} from 'react-native';
import ItemView from '../common/ItemView';
let img1= require('../../../../mres/Home/icon/punch_card_icon.png');
let imgMail= require('../../../../mres/Home/icon/mail.png');
let imgMessage= require('../../../../mres/Home/icon/messages.png');
let imgScan= require('../../../../mres/Home/icon/add_friend_scan.png');
let imgService= require('../../../../mres/Home/icon/function_icon_service_center.png');
let imgSet= require('../../../../mres/Home/icon/setting.png');
import Util from '../utils/Util';
import Location from '../pages/Location';
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
			<Header title='我的' showBack={false}/>
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

                <View style={styles.centerView}/>
                <TouchableOpacity onPress={()=>navigate('MCamera')}>
                    <ItemView text='拍照' icon={img1} />
                </TouchableOpacity>
                <View style={styles.centerView}/>
				
				<ItemView text='我的客服' icon={imgService}/>
					
				<ItemView text='消息' icon={imgMessage}/>
					
				<ItemView text='邮件' icon={imgMail}/>
					
				<ItemView text='扫一扫' icon={imgScan}/>
				
				<View style={styles.centerView}/>
			
				<ItemView text='设置' icon={imgSet}/>

				<TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('Login')
				}}>
				<Text style={styles.exitText}>退出登录</Text>
				</TouchableOpacity>
			</ScrollView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	content:{
		backgroundColor:'#e4e4e4',
		height:Util.size.height-100
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
	exitText:{
		width:'100%',
		height:50,
		marginTop:15,
		backgroundColor:'#FFFFFF',
		color:'#C92A3A',
		fontSize:20,
		textAlign:'center',
		alignSelf:'center',
		paddingTop:15
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