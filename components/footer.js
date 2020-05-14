

import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Text } from 'galio-framework';

class Footer extends React.Component {


    render() {
        return (
            <View>
                <Text style={styles.footer} p>By</Text>
                <Text style={styles.footer} p>Buzzie.Me</Text>
            </View >

        );
    }
}



const styles = StyleSheet.create({
    footer: {
        fontWeight: "normal",
        bottom: 30,
        left: 100
    }
});

export default Footer;