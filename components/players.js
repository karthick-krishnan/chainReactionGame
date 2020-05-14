

import React from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';
import { Text, Button, Input, theme } from 'galio-framework'
import InputSpinner from 'react-native-input-spinner';

class Players extends React.Component {

    constructor() {
        super();
        this.state = { number: 0 };
    }

    getUserData(navigation) {
        navigation.navigate('Game');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.playerContainer}>
                    <Text h5 style={styles.HeaderText}> Player 1</Text>
                    <View style={styles.player}>
                        <View style={styles.column}>
                            <Text h5 > Name:</Text>
                            <Input placeholder="regular" style={styles.TextInput} />
                        </View>
                        <View style={styles.column}>
                            <Text h5 > color:</Text>
                            <Image style={{ width: 25, height: 25 }} source={require('../images/green-bomb.png')} ></Image>
                        </View>
                    </View>
                    <Text h5 style={styles.HeaderText}> Player 2</Text>
                    <View style={styles.player}>
                        <View style={styles.column}>
                            <Text h5 > Name:</Text>
                            <Input placeholder="regular" style={styles.TextInput} />
                        </View>
                        <View style={styles.column}>
                            <Text h5 > color:</Text>
                            <Image style={{ width: 25, height: 25 }} source={require('../images/red-bomb.png')} ></Image>
                        </View>
                    </View>
                    <View style={styles.column}>
                        <Text h5 > BetAmount:</Text>
                        <InputSpinner
                            max={1000}
                            min={100}
                            step={100}
                            colorMax={"#f04048"}
                            colorMin={"#40c5f4"}
                            value={this.state.number}
                            onChange={(num) => { console.log(num) }} />
                    </View>
                    <Text h5 style={styles.HeaderText}> Good to go ?</Text>
                    <View style={styles.confirmationButton}>
                        <Button iconSize={15} style={styles.Button} onPress={() => this.props.navigation.navigate('Game')}>Yes</Button>
                        <Button iconSize={30} style={styles.Button} onPress={() => this.props.navigation.navigate('Initial')}>No</Button>
                    </View>
                </View>
            </View >

        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff"
    },
    HeaderText: {
        color: "#50C7C7",
        fontWeight: "bold",
        alignSelf: "center"
    },
    TextInput: {
        width: 100,
        height: 20
    },
    Button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10
    },
    playerContainer: {
        flex: 4
    },
    player: {
        alignContent: "center",
        justifyContent: 'space-between',
        flex: 2
    },
    column: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    confirmationButton: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: "center",
        flexDirection: 'row'
    }
});




export default Players;
