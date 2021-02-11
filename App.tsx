/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Pressable
} from 'react-native';
import Shadow from './src/Shadow';
import Neomorph from './src/Neomorph'
import { Svg, Rect, Path } from 'react-native-svg';
import { getPathWithRadius } from './src/helpers';


const App: React.FC = () => {
    const [isToggle, setIsToggle] = useState(false)
    const path = getPathWithRadius(
        100 + -30 + 2,
        100 + -30 + 2,
        20 + -30 / 2,
    ); 

    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPressIn={() => setIsToggle(true)} onPressOut={() => setIsToggle(false)}>
                <Neomorph
                    inner={isToggle} // <- enable shadow inside of neomorph
                    // swapShadows // <- change zIndex of each shadow color
                    style={{
                        shadowRadius: 10,
                        borderRadius: 25,
                        backgroundColor: '#DDDDDD',
                        width: 300,
                        height: 300,
                        marginTop: 50,
                        marginLeft: 50
                    }}
                    >
                    <Text></Text>
                </Neomorph>
            </Pressable>
            <Neomorph
                // useArt
                inner // <- enable shadow inside of neomorph
                // swapShadows // <- change zIndex of each shadow color
                style={{
                    shadowRadius: 10,
                    borderRadius: 25,
                    backgroundColor: '#DDDDDD',
                    width: 300,
                    height: 300,
                    marginTop: 50,
                    marginLeft: 40
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
