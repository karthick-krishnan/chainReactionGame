
import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    YellowBox
} from 'react-native';
import { Text, Button } from 'galio-framework'
import { getPlayerDetails, savePlayerDetails } from '../actions/game'
import { getItem, mergeItem } from '../utils/local-storage';
import InputSpinner from 'react-native-input-spinner';
import { connect } from 'react-redux';

class Players extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const game = await getItem('@game');
        this.props.getPlayerDetails(game.mac_id);
    }


    onChangeValue(inputType, value) {
        inputType ? inputType == 'betAmount' ? this.props.playerDetails[inputType].betAmount = value :
            this.props.playerDetails[inputType].name = value : null;
        this.setState(this.props.playerDetails);
    }

    async savePlayerDetails() {
        await mergeItem('@game', this.props.playerDetails);
        this.props.navigation.navigate('Game');
    }

    render() {
        if (this.props.isloading != null && !this.props.isloading) {
            const { player1, player2, betAmount } = this.props.playerDetails;
            return (
                <View style={styles.container}>
                    <View style={styles.playerContainer}>
                        <Text h5 style={styles.HeaderText}> Player 1</Text>
                        <View style={styles.player}>
                            <View style={styles.column}>
                                <Text h5 > Name: </Text>
                                <TextInput placeholder="info" style={styles.TextInput} onChangeText={(text) => this.onChangeValue('player1', text)} value={player1.name} />
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
                                <TextInput placeholder="info" style={styles.TextInput} onChangeText={(text) => this.onChangeValue('player2', text)} value={player2.name} />
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
                                value={betAmount}
                                onChange={(num) => this.onChangeValue('betAmount', num)} />
                        </View>
                        <Text h5 style={styles.HeaderText}> Good to go ?</Text>
                        <View style={styles.confirmationButton}>
                            <Button iconSize={15} style={styles.Button} onPress={() => this.savePlayerDetails()}>Yes</Button>
                            <Button iconSize={30} style={styles.Button} onPress={() => this.props.navigation.navigate('Initial')}>No</Button>
                        </View>
                    </View>
                </View >

            )
        } else {
            return (
                <View></View>
            )
        }

    }

};


const mapStateToProps = (state) => {
    return {
        playerDetails: state.game.playerDetails,
        isloading: state.game.loading
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        getPlayerDetails: (macId) => {
            dispatch(getPlayerDetails(macId))
        },
        savePlayerDetails: (macId) => {
            dispatch(savePlayerDetails(macId))
        }
    })
}



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
        height: 20,
        borderColor: 'red',
        borderWidth: 1,
        color: 'black',
        paddingVertical: 0
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



export default connect(mapStateToProps, mapDispatchToProps)(Players);
