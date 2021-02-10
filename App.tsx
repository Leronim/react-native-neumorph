/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';
import Shadow from './src/Shadow';
import Neomorph from './src/Neomorph'
import { Svg, Rect, Path } from 'react-native-svg';
import { getPathWithRadius } from './src/helpers';


const App: React.FC = () => {
    const path = getPathWithRadius(
        100 + -30 + 2,
        100 + -30 + 2,
        20 + -30 / 2,
    );


    return (
        <SafeAreaView style={styles.container}>
            {/* <Shadow
                inner
                // useArt
                style={{
                    shadowOffset: { width: 10, height: 10 },
                    shadowOpacity: 1,
                    shadowColor: "grey",
                    shadowRadius: 10,
                    borderRadius: 20,
                    backgroundColor: '#DDDDDD',
                    width: 300,
                    height: 300,
                    marginBottom: 100
                }}
            >
                <Text></Text>
            </Shadow> */}
            <Neomorph
                inner // <- enable shadow inside of neomorph
                // swapShadows // <- change zIndex of each shadow color
                style={{
                    shadowRadius: 10,
                    borderRadius: 25,
                    backgroundColor: '#DDDDDD',
                    width: 300,
                    height: 300,
                }}
                >
                <Text></Text>
            </Neomorph>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDDDDD',
        height: '100%'
    }
})

export default App;
