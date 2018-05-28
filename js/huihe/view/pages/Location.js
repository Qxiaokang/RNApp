import React, {Component} from 'react';
import {View,Text,StyleSheet,ScrollView,Image,TextInput,TouchableOpacity} from 'react-native';
import Util from "../utils/Util";
import Header from "../head/Header";

export default class Location extends Component{
    constructor(props){
        super(props);
        this.state={text:'选填'}
    }
    render(){
        return(
            <View style={styles.content}>
                <Header title='考勤打卡' showBack={true} backFunc={true} _this={this}/>
                <View style={styles.bottomView}>
                    <View style={styles.myLocation}>
                        <Text> 我的位置</Text>
                        <Text>        </Text>
                        <Text>(</Text>
                        <Text style={styles.textChoose}>选择位置</Text>
                        <Text>)</Text>
                    </View>
                    <View style={styles.myLocation}>
                        <Text style={styles.textRemark}> 备注</Text><TextInput style={styles.input} onChangeText={(text=>this.setState({text}))}
                                                                             value={this.state.text}></TextInput>
                    </View>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.text}>打卡</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles=StyleSheet.create(
    {
        content:{
            width:Util.size.width,
            height:Util.size.height,
            backgroundColor:'#FFF',
            flex:1,
            alignItems:'center'
        },
        map:{
            flexDirection:'column',
            width:Util.size.width,
            flex:1
        },
        bottomView:{
            width:Util.size.width,
            height:170,
            backgroundColor:'#FFFFFF',
            alignItems:'center',
            justifyContent:'center'
        },
        myLocation:{
            height:50,
            width:Util.size.width,
            flexDirection:'row',
            alignItems:'center'
        },
        textChoose:{
            color:'#0078D7'
        },
        locationText:{

        },
        textRemark:{
            color:'#000000',
            flex:1,
            alignItems:'center'
        },
        btn:{
            width:Util.size.width-30,
            height:50,
            backgroundColor:'#0078D7',
            borderRadius:5,
            justifyContent:'center',
            alignItems:'center'
        },
        input:{
            fontSize:15,
            color:'#AAAAAA',
            borderColor:'#AAAAAA',
            flex:3,
            alignItems:'center'
        },
        text:{
            fontSize:15,
            color:'#FFF',
        }
    }
);
