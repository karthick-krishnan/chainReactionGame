

import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Text, Button } from 'galio-framework'
import Footer from './footer';
import { getUniqueId } from 'react-native-device-info';

class Initial extends React.Component {

    componentDidMount() {
        console.log('uniqueId', getUniqueId());
    }

    getUserData(navigation) {
        navigation.navigate('Players');
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Text} h2>Chain Reaction</Text>
                <Button style={styles.Button} color="error" onPress={() => this.getUserData(this.props.navigation)}>Start Game</Button>
                <Button style={styles.Button} color="error">Points Table</Button>
                <Footer></Footer>
            </View >
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: 100,
        height: 40,
        bottom: 200,
        margin: 10
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
