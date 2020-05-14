

import React from 'react';
import {
    View,
    Button
} from 'react-native';

class Initial extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button title="play the game"
                    onPress={() => this.props.navigation.navigate('Game')}
                />
            </View>

        );
    }
};




export default Initial;
