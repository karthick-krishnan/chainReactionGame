import { AsyncStorage } from 'react-native';

exports.saveItem = async (keyName, Value) => {
    try {
        return await AsyncStorage.setItem(keyName, JSON.stringify(Value));
    } catch (ex) {
        console.log('ex', ex);
    }

}


exports.getItem = async (itemName) => {
    try {
        let item = await AsyncStorage.getItem(itemName);
        return JSON.parse(item);
    } catch (ex) {
        console.log('ex', ex);
    }
}

exports.mergeItem = async (key, mergeValue) => {
    try {
        return await AsyncStorage.mergeItem(key, JSON.stringify(mergeValue));
    } catch (ex) {
        console.log('ex', ex);
    }
}