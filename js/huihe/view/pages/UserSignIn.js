import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View ,Button ,TouchableOpacity, TextInput, Image,ListView} from 'react-native'
import { MapView } from 'react-native-amap3d'
import { Geolocation } from "react-native-amap-geolocation"
import Header from "../head/Header"
import StyleUtil from "../../../utils/StyleUtil";
import PopupDialog,{DialogButton, DialogTitle, SlideAnimation} from "react-native-popup-dialog";
import Util from "../utils/Util";
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

export default class EventsExample extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            mLatitude:22.532591417100964,
            mLongitude:113.95317572699653,
            location: {},
            jsonResult:null,
            dataSourse:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows([]),
            //dataSourse:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows([{"id":"B02F37UF05","name":"深圳市龙澄高科技环保有限公司(高新南七道)","type":"公司企业;公司;公司","tel":[],"direction":"西","distance":"414.368","location":"113.949213,22.533290","address":"高新南七道1深圳国家高技术产业创新中心A1栋3层","poiweight":"0.308752","businessarea":"科技园"},{"id":"B02F37TDI8","name":"深圳华通威国际检验有限公司(科技南十二路)","type":"公司企业;公司;公司","tel":[],"direction":"东北","distance":"492.826","location":"113.956414,22.535862","address":"高新技术产业园科技南十二路6号","poiweight":"0.304997","businessarea":"科技园"}]),
            mValue:""
        };
    }
    componentWillMount() {
        this.getPoiNameAddress()
    }
    async componentDidMount() {
        await Geolocation.init({
            ios: "1939b08d7b1dba1cb6030821f9e50dae",
            android:'975de66c06b6767fd5fc1567584ad490'
        });
        Geolocation.setOptions({
            distanceFilter: 100,
            reGeocode: true
        });
        Geolocation.addLocationListener(location =>
            this.updateLocationState(location)
        );
        //this.startLocation();
    }

    componentWillUnmount() {
        Geolocation.stop()
    }

    updateLocationState(location) {
        if (location) {
            location.timestamp = new Date().toLocaleString();
            this.setState({
                location,
                mLatitude:location.latitude,
                mLongitude:location.longitude,
            });
        }
    }

    getLastLocationTStart(){
        Geolocation.stop();
        Geolocation.start();
    };

    //开始定位
    startLocation = () => Geolocation.start();
    //结束定位
    stopLocation = () => Geolocation.stop();
    //获取最新定位
    getLastLocation = async () =>
        this.updateLocationState(await Geolocation.getLastLocation())


    _animatedToLocation(event,data){
        //动画移动到当前位置为中心的地图
        this.setState({
            mLatitude:data.latitude,
            mLongitude:data.longitude,
        })

    }

    getPoiNameAddress(){
        console.log(this.state)
        let uri = 'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=113.95317572699653,22.532591417100964&key=9deee725f93f7240c62f3aea79289424&radius=1000&extensions=all&homeorcorp=2&poitype=公司';
        fetch(uri,{
            method:'GET',
        })
            .then((response) => response.text() )
            .then((responseData)=>{
                console.log('responseData',responseData)
                let data=JSON.parse(responseData).regeocode.pois;
                console.log("-----pois:"+typeof (data)+"---"+data.length+"---"+data[0].name)
                console.log("提取数据："+data)
                this.setState({
                    jsonResult:new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2}).cloneWithRows(data),
                });
                console.log(this.state)
                //alert('responseData',responseData);new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2}).cloneWithRows(jsondata.data),
            })
            .catch((error)=>{console.error('error',error)});
        // https://restapi.amap.com/v3/geocode/regeo?output=xml&location=116.310003,39.991957&key=<用户的key>&radius=300&extensions=all
    }

    _logLocationEvent = ({ nativeEvent }) => this._animatedToLocation('onLocation', nativeEvent)

    renderRow(rowData){
        return(
            <View style={styles.lvRow}>
                <TouchableOpacity
                    onPress={()=>{
                        this.setState({
                            mValue:rowData.name
                        });
                        this.popupDialog.dismiss();
                    }}
                >
                <Text>{rowData.isEmpty?"数据为空":rowData.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const { location } = this.state;
        return (
            <View style={styles.body}>
                <Header title={'考勤打卡'} showBack={false} _this={this}/>
                <View style={{width:'100%',flex:1}}>
                    <MapView
                        ref={ref => this.mapView = ref}
                        locationEnabled
                        distanceFilter={100}
                        zoomLevel={17}
                        mapType='standard'
                        coordinate={{
                            latitude: this.state.mLatitude,
                            longitude: this.state.mLongitude,
                        }}
                        //onLocation={this._logLocationEvent}
                        style={styles.body}
                    />
                </View>
                <View style={styles.contentWrap}>
                    <TouchableOpacity onPress={this.getLastLocationTStart} style={styles.imgWrap}>
                        <Image style={{width: 30, height: 30}} source={require('../../../../mres/img/location.jpg')}/>
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <View style={styles.viewCol}>
                            <Text style={{fontSize:14}}>
                                我的位置：{this.state.mValue.isEmpty?location.poiName:this.state.mValue}
                                (<Text style={styles.getLastAddress} onPress={()=>this.popupDialog.show()}>选择位置</Text>)
                            </Text>
                        </View>
                        <View style={styles.viewCol}>
                            <Text style={{fontSize:14}}>
                                详细位置：{location.address}
                            </Text>
                        </View>

                        <View style={[styles.flexWrap,styles.viewCol]}>
                            <Text style={{lineHeight:50,width:40}}>备注：</Text>
                            <TextInput
                                style={{flex:1}}
                                placeholder='选填'
                            />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
                                <Image style={{width: 30, height: 30,position:'relative',top:'50%',marginTop:-15,right:10}} source={require('../../../../mres/img/camera.jpg')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.viewCol}>
                            <TouchableOpacity style={{backgroundColor:'#3478f6',height:35,borderRadius:8,justifyContent:'center'}} onPress={this.getPoiNameAddress.bind(this)}>
                                <Text style={{fontSize:16,textAlign:'center',color:'#fff',}}>打卡</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <PopupDialog
                    dialogTitle={<DialogTitle title="选择地址" titleStyle={StyleUtil.backgroundColorRed} titleTextStyle={StyleUtil.textColorWhite}/>}
                    dialogStyle={styles.dialogBottom}
                    ref={(popupDialog)=>this.popupDialog=popupDialog}
                    dialogAnimation={slideAnimation}
                    haveOverlay={true}
                >
                    <View>
                        <ListView
                            dataSource={this.state.jsonResult==null?this.state.dataSourse:this.state.jsonResult}
                            renderRow={(rowData)=>this.renderRow(rowData)}
                            >
                        </ListView>
                        {/*<DialogButton text={'关闭'}  buttonStyle={[StyleUtil.backgroundColorRed,styles.btn]} textStyle={StyleUtil.textColorWhite} onPress={()=>this.popupDialog.dismiss()}/>*/}
                    </View>
                </PopupDialog>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    body: {
        flex: 1,
        position:'relative'
    },
    logs: {
        elevation: 8,
        backgroundColor: '#fff',
    },
    dialogBottom:{
        position:'absolute',
        width:'100%',
        bottom:0,
        height:'30%'
    },
    logText: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    item: {
        flexDirection: "row",
        marginBottom: 4
    },
    label: {
        color: "#f5533d",
        width: 120,
        paddingRight: 10,
        textAlign: "right"
    },





    contentWrap:{
        width:'100%',
        backgroundColor:'#fff',
        borderColor:'#e5e5e5',
        borderTopWidth:1,
        borderStyle:'solid',
        position:'relative'
    },

    content:{
        width:'94%',
        marginLeft:'auto',
        marginRight:'auto',
    },
    getLastAddress:{
        color:'#3478f6'
    },
    flexWrap:{
        flexDirection: "row",
    },
    imgWrap:{
        width:30,
        height:30,
        position:'absolute',
        top:-40,
        right:7,
        backgroundColor:'rgba(255,255,255,0.6)',
        borderRadius:100,
        zIndex:999

    },
    viewCol:{
        justifyContent:"center",
        height:50,
        borderColor:'#e5e5e5',
        borderBottomWidth:1,
        borderStyle:'solid'
    },
    lvRow:{
        flex:1,
        flexDirection:'row',
        padding:10,
        justifyContent:'center'
    },


})




AppRegistry.registerComponent("RNAMapGeolocation", () => EventsExample);