/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Alert
} from 'react-native';

import { initGame, onCellClick } from '../actions/game';
import { GAME_OBJECT, NUM_OF_COLUMNS } from '../constants/index';
import { getItem } from '../utils/local-storage';
import { createGrid, spreadGridBalls } from '../utils/grid';



class Game extends React.Component {


    constructor() {
        super();
        this.state = { ...GAME_OBJECT, loading: true };
    }

    async componentDidMount() {
        const game = await getItem('@game');
        this.state.betAmount = game.betAmount;
        this.state.player_details['player1'].color = game.player1.color;
        this.state.player_details['player1'].name = game.player1.name
        this.state.player_details['player2'].color = game.player2.color;
        this.state.player_details['player2'].name = game.player2.name;
        console.log('stateObject', this.state);
        this.initGame(this.state);
    }

    initGame() {
        //Create a grid
        try {
            const gridItems = createGrid();

            //Assiging turn for players
            console.log(Math.random(this.state.players.length));
            let playerTurn = Math.round(Math.random(this.state.players.length));
            this.state.player_turn = this.state.players[playerTurn];
            this.state.game_started = true;
            //setting up the games
            this.state.player_details['player1'].game_started = false;
            this.state.player_details['player2'].game_started = false;


            this.setState({
                grid: gridItems,
                grid_color: this.state.player_details[this.state.player_turn].color
            });

        } catch (Ex) {
            console.log('Ex---->', Ex);
        }



    }

    renderImage(item) {

        if (!item.isHidden) {
            let image_url = null;
            if (item.color == 'green') {
                if (item.times_clicked === item.corners - 1) {
                    image_url = require('../images/green-bomb.png');
                } else {
                    image_url = require('../images/green-circle.png');
                }

            } else if (item.color == 'red') {
                if (item.times_clicked === item.corners - 1) {
                    image_url = require('../images/red-bomb.png');
                } else {
                    image_url = require('../images/red-circle.png');
                }
            }
            return (
                <View>
                    <Image style={styles.ball} source={image_url} ></Image>
                </View >
            );
        } else {
            return null;
        }
    }
    onCellClick(item) {
        let grid = this.state.grid;
        const index = grid.findIndex((val) => {
            return val.id == item.id;
        });
        if (!grid[index].isHidden && grid[index].belongs_to != this.state.player_turn) {
            this.setState({ grid: grid });
            return;
        } else if (!grid[index].isHidden && grid[index].belongs_to == this.state.player_turn) {
            grid[index].times_clicked++;
            if (grid[index].corners == grid[index].times_clicked) {
                this.setState(spreadGridBalls(this.state, item));
                this.checkWinner();
            } else {
                grid[index].belongs_to = this.state.player_turn;
                item.color = this.state.player_details[this.state.player_turn].color;
                const nextPlayerTurn = this.state.players.filter(player => !player.includes(this.state.player_turn));
                this.state.player_turn = nextPlayerTurn[0];
                this.setState({ grid: grid, grid_color: this.state.player_details[this.state.player_turn].color });
                this.checkWinner();
            }
        } else {
            //first timeClick
            console.log('clicked');
            grid[index].times_clicked++;
            grid[index].isHidden = false;
            grid[index].belongs_to = this.state.player_turn;
            console.log(' this.state.grid', this.state.grid);
            console.log(' this.state.player_details before', this.state.player_details);
            this.state.player_details[grid[index].belongs_to].game_started = true;
            console.log(' this.state.player_details', this.state.player_details);
            item.color = this.state.player_details[this.state.player_turn].color;
            const nextPlayerTurn = this.state.players.filter(player => !player.includes(this.state.player_turn));
            this.state.player_turn = nextPlayerTurn[0];
            this.setState({ grid: grid, grid_color: this.state.player_details[this.state.player_turn].color });
            this.checkWinner();
        }
        //this.props.onCellClick(this.state.grid);
    }

    checkWinner() {
        try {
            const grid = this.state.grid;
            const player1Cells = grid.filter(val => val.belongs_to == 'player1');
            const player2Cells = grid.filter(val => val.belongs_to == 'player2');
            const player1Status = this.state.player_details['player1'].game_started;
            const player2Status = this.state.player_details['player2'].game_started;
            const winner = (player1Status && player2Status) ? (player1Cells.length > 0 && player2Cells.length == 0) ? 'player1' :
                ((player2Cells.length > 0 && player1Cells.length == 0) && player1Status && player2Status) ? 'player2' : null : null;
            winner ? this.setState({ winner: winner }) : null;
            if (winner) {
                Alert.alert(
                    'You have won',
                    `${winner} has won the game`,
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]
                );
            }
            return;
        } catch (ex) {
            console.log('ex', ex);
        }

    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <View>
                    {this.state.winner ? <Text style={{ color: 'red' }}>{this.state.winner} has won the game</Text> : null}
                </View>
                <FlatList
                    data={this.state.grid}
                    style={styles.grid}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            id={item.id} style={[styles.seperator, { borderColor: this.state.grid_color }]}
                            onPress={(event) => this.onCellClick(item, event)}
                        >
                            {this.renderImage(item)}

                        </TouchableOpacity>

                    )}
                    //Setting the number of column
                    numColumns={NUM_OF_COLUMNS}
                    keyExtractor={item => item.id}
                />
            </View >
        );
    }
};





const mapDispatchToProps = (dispatch) => {
    return {
        initGame: () => {
            dispatch(initGame());
        },
        onCellClick: (items) => {
            dispatch(onCellClick(items));
        }
    };
}


const mapStateToProps = (state) => {
    return {
        grid: state.game.grid
    }
};




const styles = StyleSheet.create({
    MainContainer: {
        flex: 12,
        backgroundColor: 'black',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    seperator: {
        borderWidth: 2,
        borderRadius: 5,
        flex: 2,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50
    },
    ball: {
        width: 25,
        height: 25
    },
    grid: {
        marginTop: 20,
        maxHeight: '100%'
    },
    circleShapeView: (width, height, radius, color) => {
        return {
            width: 20,
            height: 20,
            borderRadius: radius,
            backgroundColor: color
        }
    }

});





export default connect(mapStateToProps, mapDispatchToProps)(Game);
