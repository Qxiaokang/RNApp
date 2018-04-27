import React, {Component} from 'react';
import { StyleSheet, View, Text, BackHandler, ToastAndroid,Image} from 'react-native';
import {TabNavigator} from "react-navigation";
export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedTab:'popular', //默认选中的选项卡
        };
    }
    constructor(){
        super();
    }
    render(){
        return (<View style={styles.container}>
             <TabNavigator>
                 <TabNavigator.Item
                     selected={this.state.selectedTab==='popular'}
                     title="最热"
                     selectedTitleStyle={{color:'#63B8FF'}}
                     renderIcon={()=><Image style={styles.icon} source={require('../mres/img/home_live_selected.png')} />}
                     renderSelectedIcon={() =>
                         <Image style={[styles.icon,{tintColor:'#63B8FF'}]} source={require('../mres/img/home_live_normal.png')}/>}
                     onPress={()=>this.setState({selectedTab:'popular'})}
                 >
                     选项卡对应的页面
                     <PopularPage/>
                 </TabNavigator.Item>

                 <TabNavigator.Item
                     selected={this.state.selectedTab==='trending'}
                     title="趋势"
                     selectedTitleStyle={{color:'#63B8FF'}}
                     renderIcon={()=><Image style={styles.icon} source={require('../mres/img/home_message_selected.png')} />}
                     renderSelectedIcon={() =>
                         <Image style={[styles.icon,{tintColor:'#63B8FF'}]} source={require('../mres/img/home_message_normal.png')}/>}
                     onPress={()=>this.setState({selectedTab:'trending'})}
                 >
                     <View style={{backgroundColor:'#0F0',flex:1}}></View>
                 </TabNavigator.Item>

                 <TabNavigator.Item
                     selected={this.state.selectedTab==='favorite'}
                     title="收藏"
                     selectedTitleStyle={{color:'#63B8FF'}}
                     renderIcon={()=><Image style={styles.icon} source={require('../mres/img/home_user_selected.png')} />}
                     renderSelectedIcon={() =>
                         <Image style={[styles.icon,{tintColor:'#63B8FF'}]} source={require('../mres/img/home_user_selected.png')}/>}
                     onPress={()=>this.setState({selectedTab:'favorite'})}
                 >
                     <CustomViewPage {...this.props} />
                 </TabNavigator.Item>

                 <TabNavigator.Item
                     selected={this.state.selectedTab==='my'}
                     title="我的"
                     selectedTitleStyle={{color:'#63B8FF'}}
                     renderIcon={()=><Image style={styles.icon} source={require('../mres/img/home_user_selected.png')} />}
                     renderSelectedIcon={() =>
                         <Image style={[styles.icon,{tintColor:'#63B8FF'}]} source={require('../mres/img/home_user_normal.png')}/>}
                     onPress={()=>this.setState({selectedTab:'my'})}
                 >
                     <MyPage {...this.props} />
                 </TabNavigator.Item>
             </TabNavigator>
        </View>);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        return true;
    };
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    icon:{
        width:26,
        height:26
    }
});