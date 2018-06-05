import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View ,Button} from 'react-native'
import { MapView } from 'react-native-amap3d'
import { Geolocation } from "react-native-amap-geolocation"

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    logs: {
        elevation: 8,
        backgroundColor: '#fff',
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
    }
})






export default class EventsExample extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            mLatitude:0,
            mLongitude:0,
            location: {}
        };
    }

    async componentDidMount() {
        await Geolocation.init({
            ios: "1939b08d7b1dba1cb6030821f9e50dae",
        });
        Geolocation.setOptions({
            distanceFilter: 100,
            reGeocode: true
        });
        Geolocation.addLocationListener(location =>
            this.updateLocationState(location)
        )

        this.startLocation();
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
            console.log(location)
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

    _logLocationEvent = ({ nativeEvent }) => this._animatedToLocation('onLocation', nativeEvent)

    render() {
        const { location } = this.state;
        return (
            <View style={styles.body}>
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
                    onLocation={this._logLocationEvent}
                    style={styles.body}
                />

                <Button
                    style={styles.button}
                    title='获取最新地址'
                    onPress={this.getLastLocationTStart}
                />
                <View>
                    <Text>{location.address}</Text>
                    <Text>{location.poiName}</Text>
                    <Text>{location.timestamp}</Text>
                </View>
            </View>
        )
    }
}

AppRegistry.registerComponent("RNAMapGeolocation", () => EventsExample);