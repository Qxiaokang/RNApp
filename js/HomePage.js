import React, {Component} from 'react';
import { StyleSheet, View, Text, BackHandler, ToastAndroid,Image} from 'react-native';
import {TabNavigator} from "react-navigation";
import Hot from "./Hot";
import Mine from "./Mine";
import Trending from "./Trending";
import Favorite from "./Favorite";
export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedTab:'Hot', //默认选中的选项卡
        };
    }
    render(){
        return (<View style={styles.container}>
             <TabNavigator>
                 <TabNavigator.Item
                     selected={this.state.selectedTab==='Hot'}
                     title="最热"
                     selectedTitleStyle={{color:'#63B8FF'}}
                     renderIcon={()=><Image style={styles.icon} source={require('../mres/img/home_live_selected.png')} />}
                     renderSelectedIcon={() =>
                         <Image style={[styles.icon,{tintColor:'#63B8FF'}]} source={require('../mres/img/home_live_normal.png')}/>}
                     onPress={()=>this.setState({selectedTab:'Hot'})}
                 >
                     选项卡对应的页面
                     <Hot/>
                 </TabNavigator.Item>

                 <TabNavigator.Item
                     selected={this.state.selectedTab==='Trending'}
                     title="趋势"
                     selectedTitleStyle={{color:'#63B8FF'}}
                     renderIcon={()=><Image style={styles.icon} source={require('../mres/img/home_message_selected.png')} />}
                     renderSelectedIcon={() =>
                         <Image style={[styles.icon,{tintColor:'#63B8FF'}]} source={require('../mres/img/home_message_normal.png')}/>}
                     onPress={()=>this.setState({selectedTab:'Trending'})}
                 >
                     <View style={{backgroundColor:'#0F0',flex:1}}></View>
                     <Trending/>
                 </TabNavigator.Item>

                 <TabNavigator.Item
                     selected={this.state.selectedTab==='Favorite'}
                     title="收藏"
                     selectedTitleStyle={{color:'#63B8FF'}}
                     renderIcon={()=><Image style={styles.icon} source={require('../mres/img/home_user_selected.png')} />}
                     renderSelectedIcon={() =>
                         <Image style={[styles.icon,{tintColor:'#63B8FF'}]} source={require('../mres/img/home_user_selected.png')}/>}
                     onPress={()=>this.setState({selectedTab:'Favorite'})}
                 >
                     <Favorite {...this.props} />
                 </TabNavigator.Item>

                 <TabNavigator.Item
                     selected={this.state.selectedTab==='Mine'}
                     title="我的"
                     selectedTitleStyle={{color:'#63B8FF'}}
                     renderIcon={()=><Image style={styles.icon} source={require('../mres/img/home_user_selected.png')} />}
                     renderSelectedIcon={() =>
                         <Image style={[styles.icon,{tintColor:'#63B8FF'}]} source={require('../mres/img/home_user_normal.png')}/>}
                     onPress={()=>this.setState({selectedTab:'Mine'})}
                 >
                     <Mine {...this.props} />
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
const Tabs = TabNavigator({
    Hot :{screen: Hot},
    Mine :{screen: Mine},
    Trending :{screen: Trending},
    Favorite :{screen: Favorite},
});