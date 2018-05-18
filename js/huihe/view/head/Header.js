import React, { Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';;
export default class Header extends Component{
    getDefaultProps(){
        return {
            title:"标题",
            showBack:true,//是否显示左侧的返回
            sideWidth:null,
        }
    }
    backBtnFunc(){
        this.props.backFunc ? this.props.backFunc.call(null) : this.props.navigator.pop();
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
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:"#c92a3a",
        height :50,
        flexDirection:"row",
        alignItems:"center"
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