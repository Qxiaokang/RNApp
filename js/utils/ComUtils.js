import {Alert, BackHandler} from "react-native";

class ComUtils {
    closeApp=()=>{
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
export default new ComUtils();