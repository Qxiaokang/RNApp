import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Button} from 'react-native';
import ItemView from '../common/ItemView';
import PopupDialog, { SlideAnimation,DialogTitle,DialogButton } from 'react-native-popup-dialog';
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
/**
 dialogTitle – 弹出框标题
 width - 弹出框的宽度，可以写300或者0.5。0.5就是设备宽度的50%
 height - 弹出框的宽度，可以写300或者0.5。0.5就是设备高度的50%
 dialogAnimation - 动画类型，FadeAnimation、ScaleAnimation、SlideAnimation
 haveOverlay - 是否显示Overlay
 dismissOnTouchOutside - 点击外部是否关闭弹出框
 show - 显示弹出框
 * */
let img1= require('../../../../mres/Home/icon/punch_card_icon.png');
let imgMail= require('../../../../mres/Home/icon/mail.png');
let imgMessage= require('../../../../mres/Home/icon/messages.png');
let imgScan= require('../../../../mres/Home/icon/add_friend_scan.png');
let imgService= require('../../../../mres/Home/icon/function_icon_service_center.png');
let imgSet= require('../../../../mres/Home/icon/setting.png');
import Util from '../utils/Util';
import Location from '../pages/Location';
import Header from "../head/Header";
import StyleUtil from "../../../utils/StyleUtil";
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
                <TouchableOpacity onPress={()=>navigate('MMap')}>
                    <ItemView text='考勤打卡' icon={img1} />
                </TouchableOpacity>
				<View style={styles.centerView}/>

                <View style={styles.centerView}/>
                <TouchableOpacity onPress={()=>navigate('MCamera')}>
                    <ItemView text='拍照' icon={img1} />
                </TouchableOpacity>
                <View style={styles.centerView}/>
				
				<ItemView text='我的客服' icon={imgService}/>
				<TouchableOpacity
					onPress={()=>{this.popupDialog.show();}}
				>
				<ItemView text='消息' icon={imgMessage}/>
				</TouchableOpacity>
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
                <PopupDialog
                    dialogTitle={<DialogTitle title="选择地址" titleStyle={StyleUtil.backgroundColorRed} titleTextStyle={StyleUtil.textColorWhite}/>}
                    dialogStyle={styles.dialogBottom}
                    ref={(popupDialog)=>this.popupDialog=popupDialog}
                    dialogAnimation={slideAnimation}
                    haveOverlay={true}
                >
                    <View>
                        <View style={styles.dialogContent}/>
                        <DialogButton text={'关闭'}  buttonStyle={[StyleUtil.backgroundColorRed,styles.btn]} textStyle={StyleUtil.textColorWhite} onPress={()=>this.popupDialog.dismiss()}/>
                    </View>
                </PopupDialog>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	content:{
		backgroundColor:'#e4e4e4',
		height:Util.size.height-150
	},
	dialogBottom:{
		marginTop:Util.size.height/2+50,
		width:'100%',
		height:'50%'
	},
	dialogContent:{
		height:'80%'
	},
	dialogBtn:{
		flexDirection:'row',
		width:'100%',
		alignItems:'flex-end'
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