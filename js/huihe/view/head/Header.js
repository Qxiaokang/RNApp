import React, { Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    BackHandler,
    Alert
} from 'react-native';

/**
 * 自定义带返回按钮的Title
 */
export default class Header extends Component{
    constructor(props){
        super(props);
    }
    static defaultProps={
        title:"标题",
        showBack:true,//是否显示左侧的返回
        sideWidth:null,
        backFunc:true,
        name: null,
        _this:null
    }
    backBtnFunc=()=>{
            //this.props.backFunc ? this.props.backFunc.call() : this.props.navigator.pop();
        var mThis=this.props._this;
        if(this.props.name==null){
            this.props.backFunc?mThis.props.navigation.goBack():this.close();
        }else{
            console.log("name-----------"+this.props.name)
            mThis.props.navigation.navigate(this.props.name);
        }

    }

    render(){
        return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity
                        hitSlop={{top:10,left:10,right:10,bottom:10}}
                        style={[styles.width50, this.props.sideWidth]} onPress={this.props.showBack ? this.backBtnFunc : undefined}>
                        {this.props.showBack?
                            <Image style={styles.backImg} source={require('../../../../mres/img/item/ic_arrow_back_white_36pt.png')} />
                            :null}
                    </TouchableOpacity>
                    <Text style={[styles.whiteColor,styles.textCenter,styles.headerText]} >{this.props.title.length>10?(this.props.title.substr(0,10)+"..."):this.props.title}</Text>
                    <View style={[styles.width50, this.props.sideWidth]}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        )
    }
    /**提示是否退出APP*/
    close=()=>{
        //退出app
        Alert.alert('提示','确定退出程序？',
            [
                {
                    text: '确 定',
                    onPress: () => BackHandler.exitApp()
                },
                {
                    text: '取 消',
                    style: 'cancel'
                }
            ],
            {
                cancelable: true,
                onDismiss: () => {
                }
            });
    };

}

const styles = StyleSheet.create({
    header:{
        backgroundColor:"#c92a3a",
        width:'100%',
        height :50,
        flexDirection:"row",
        alignItems:"center",
    },
    width50:{
        width:50
    },
    backImg:{
        width:12,
        height:22,
        marginLeft:15
    },
    headerText:{
        fontSize:18,
        flex:1
    },
    whiteColor:{
        color:"#ffffff"
    },
    textCenter:{
        textAlign:"center"
    },
});