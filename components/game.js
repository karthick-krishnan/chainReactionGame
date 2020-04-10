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
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';

import { initGame, onCellClick } from '../actions/game';
import { GRID_ROWS_AND_COLUMNS } from '../constants/index';



class Game extends React.Component {


    constructor() {
        super();
        this.state = {
            grid: {}
        };
    }

    componentDidMount() {
        this.createGrid(GRID_ROWS_AND_COLUMNS)
    }


    createGrid(val) {
        let items = Array.apply(null, Array(val)).map((v, i) => {
            return { id: i + 1, isHidden: true };
        });
        this.setState({
            grid: items,
        });
    }

    renderImage(item) {
        if (!item.isHidden) {
            return (
                <View>
                    <Image style={styles.ball} source={require('../images/green-ball.jpeg')} ></Image>
                    <Image style={styles.ball} source={require('../images/red-ball.jpeg')} ></Image>
                </View>
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
        this.setState(this.state.grid);
        //this.props.onCellClick(this.state.grid);
    }


    render() {
        return (
            <View style={styles.MainContainer}>
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
                    numColumns={6}
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
