export default class JsonUtil{
    /**
     *
     * json转字符串
     */
    static stringToJson(data){
        return JSON.parse(data);
    }
    /**
     *字符串转json
     */
    static jsonToString(data){
        return JSON.stringify(data);
    }
    /**
     *map转化为对象（map所有键都是字符串，可以将其转换为对象）
     */
    static strMapToObj(strMap){
        let obj= Object.create(null);
        for (let[k,v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }
    /**
     *map转换为json
     */
    static mapToJson(map) {
        return JSON.stringify(JsonUitl.strMapToObj(map));
    }
    /**
     *对象转换为Map
     */
    static   objToStrMap(obj){
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k,obj[k]);
        }
        return strMap;
    }
    /**
     *json转换为map
     */
    static jsonToMap(jsonStr){
        return  JsonUitl.objToStrMap(JSON.parse(jsonStr));
    }
}