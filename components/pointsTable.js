

import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';

import { initGame, onCellClick } from '../actions/game';
import { GAME_OBJECT, NUM_OF_COLUMNS } from '../constants/index';
import { getPlayerDetails, savePlayerDetails } from '../actions/game'
import { getItem } from '../utils/local-storage';
import { createGrid, spreadGridBalls } from '../utils/grid';
import { Table, Row, Rows } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';

class PointsTableScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
            tableData: [
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd'],
                ['1', '2', '3', '456\n789'],
                ['a', 'b', 'c', 'd']
            ]
        }
    }

    async componentDidMount() {
        const game = await getItem('@game');
        this.props.getPlayerDetails(game.mac_id);
    }

    render() {
        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title numeric>Won</DataTable.Title>
                    <DataTable.Title numeric>Lost</DataTable.Title>
                    <DataTable.Title numeric>Amount</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                    <DataTable.Cell numeric>159</DataTable.Cell>
                    <DataTable.Cell numeric>6.0</DataTable.Cell>
                    <DataTable.Cell numeric>6.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                    <DataTable.Cell numeric>237</DataTable.Cell>
                    <DataTable.Cell numeric>8.0</DataTable.Cell>
                    <DataTable.Cell numeric>6.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                        console.log(page);
                    }}
                    label="1-2 of 6"
                />
            </DataTable>
        );
    }

};


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30 },
    head: { height: 40 },
    text: { margin: 6 }
});


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


export default connect(mapStateToProps, mapDispatchToProps)(PointsTableScreen);