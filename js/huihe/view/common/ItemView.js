import React, {Component} from 'react';
import {View, Image, StyleSheet,Text} from 'react-native';
import Util from '../utils/Util';
let img1= require('../../../../mres/Home/icon/punch_card_icon.png');
let img=require('../../../../mres/Home/icon/right_arrow.png');
export default class ItemView extends Component {
    static defaultProps = {
        icon:NaN,
    };
    render() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.row}>
                    <Image source={this.props.icon} style={styles.imgStyle1}/>
                    <Text style={styles.text}>{this.props.text}</Text>
                    <Image source={img} style={styles.imgStyle2}/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
        contentContainer: {
            backgroundColor: '#FFFFFF',
            height:50,
            width: Util.size.width
        },
        row: {
            flexDirection: 'row',
            height:49
        },
        text:{
            color:'#C92A3A',
            fontSize: 20,
            marginTop: 15,
            marginLeft: 10,
            width:100
        },
        imgStyle1:{
            width:30,
            height:30,
            marginLeft:10,
            marginTop:10
        },
        imgStyle2:{
            width:20,
            height:20,
            marginTop:15,
            marginLeft:Util.size.width-150-35
        }
    }
);