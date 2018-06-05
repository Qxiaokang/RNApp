'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Header from "../head/Header";

export default class BadInstagramCloneApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameraType: RNCamera.Constants.Type.back,
            imagePath:''
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Header showBack={true} _this={this} title={'拍照'}/>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style = {styles.preview}
                    type={this.state.cameraType}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 14}}> 拍照 </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.switchCamera.bind(this)}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 14}}> 切换镜头 </Text>
                    </TouchableOpacity>
                </View>
                /*拍照完毕，显示图片到界面上*/
                <Image style={{width: 100, height: 100, marginBottom: 20}} source={{uri: this.state.imagePath}}>

                </Image>
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.uploadImage.bind(this)}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 14}}> 上传图片 </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    //切换前后摄像头
    switchCamera() {
        var state = this.state;
        if(state.cameraType === RNCamera.Constants.Type.back) {
            state.cameraType = RNCamera.Constants.Type.front;
        }else{
            state.cameraType = RNCamera.Constants.Type.back;
        }
        this.setState(state);
    }

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 1, base64: true };
            const data = await this.camera.takePictureAsync(options);
            alert(data.uri);
            this.setState({
                imagePath:data.uri
            });
        }
    };

    uploadImage(){
        let formData = new FormData();
        if(!this.state.imagePath){
            alert(this.state.imagePath);
            return
        }
        let file = {uri: this.state.imagePath, type: 'multipart/form-data', name: 'a.jpg'};

        formData.append("images",file);

        fetch('http://192.168.1.110:3200/upload/uploadImg',{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
            },
            body:formData,
        })
            .then((response) => response.text() )
            .then((responseData)=>{

                alert('responseData',responseData);
            })
            .catch((error)=>{console.error('error',error)});

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});

//AppRegistry.registerComponent('BadInstagramCloneApp', () => BadInstagramCloneApp);