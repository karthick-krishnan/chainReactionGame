

import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Text } from 'galio-framework';
import Footer from './footer';
import { getUniqueId } from 'react-native-device-info';
import Button from '@ant-design/react-native/lib/button';
import { saveItem } from '../utils/local-storage';

class Initial extends React.Component {

    async componentDidMount() {
        await saveItem('@game', { 'mac_id': getUniqueId() });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Text} h2>Chain Reaction</Text>
                <Button type="primary" onPress={() => this.props.navigation.navigate('Players')}>Start Game</Button>
                <Button type="primary" onPress={() => this.props.navigation.navigate('PointsTable')}>Points Table</Button>
                <Footer></Footer>
            </View >

        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Text: {
        flex: 1,
        color: "#50C7C7",
        fontWeight: "bold",
        top: 60
    },
    Button: {
        width: 200,
        height: 40,
        bottom: -50

    },
    footer: {
        fontWeight: "normal",
        bottom: 30,
        left: 100
    },
    animatedStyles: {
        width: 44,
        height: 44,
        borderRadius: 44 / 2,
        backgroundColor: 'red'
    }
});




export default Initial;
