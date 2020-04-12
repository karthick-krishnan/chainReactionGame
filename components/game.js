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
    Image
} from 'react-native';

import { initGame, onCellClick } from '../actions/game';
import { GRID_ROWS_AND_COLUMNS, NUM_OF_COLUMNS } from '../constants/index';



class Game extends React.Component {


    constructor() {
        super();
        this.state = {
            grid: {},
            players: ['player1', 'player2'],
            ballColors: ['green', 'red'],
            player_turn: null,
            game_started: false,
            player_details: {
                "player1": {
                    "color": null,
                    "moves": []
                },
                "player2": {
                    "color": null,
                    "moves": []
                }
            }
        };
    }

    componentDidMount() {
        this.initGame(GRID_ROWS_AND_COLUMNS)
    }

    initGame(gridValue) {
        //Create a grid
        let items = Array.apply(null, Array(gridValue)).map((v, i) => {
            return { id: i + 1, isHidden: true, belongs_to: null, color: null };
        });

        //Assiging turn for players
        let playerTurn = Math.round(Math.random(this.state.players.length));
        this.state.player_turn = this.state.players[playerTurn];
        this.state.game_started = true;

        //Assigning Colors
        this.state.players.forEach((val, index) => {
            this.state.player_details[val].color = this.state.ballColors[index];
        })

        this.setState({
            grid: items
        });


    }

    renderImage(item) {
        if (!item.isHidden) {
            let image_url = null;
            if (item.color == 'green') {
                image_url = require('../images/green-ball.jpeg');
            } else {
                image_url = require('../images/red-ball.jpeg');
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
        const index = this.state.grid.findIndex((val) => {
            return val.id == item.id;
        })
        this.state.grid[index].isHidden = false;
        this.state.grid[index].belongs_to = this.state.player_turn;
        item.color = this.state.player_details[this.state.player_turn].color;
        const nextPlayerTurn = this.state.players.filter(player => !player.includes(this.state.player_turn));
        this.state.player_turn = nextPlayerTurn;
        this.setState(this.state.grid);

        //this.props.onCellClick(this.state.grid);
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <View><Text>Its {this.state.player_turn}'s turn</Text></View>
                <FlatList
                    data={this.state.grid}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            id={item.id} style={styles.seperator}
                            onPress={(event) => this.onCellClick(item, event)}
                        >
                            {this.renderImage(item)}

                        </TouchableOpacity>

                    )}
                    //Setting the number of column
                    numColumns={NUM_OF_COLUMNS}
                    keyExtractor={item => item.id}
                />
            </View>
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
        justifyContent: 'center',
        flex: 1,
        paddingTop: 30
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    seperator: {
        borderWidth: 1,
        borderColor: 'red',
        flexDirection: "column",
        width: 50,
        height: 50
    },
    ball: {
        width: 20,
        height: 20
    }

});


export default connect(mapStateToProps, mapDispatchToProps)(Game);
