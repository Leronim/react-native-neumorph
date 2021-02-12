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
    Button,
    View,
    TextBase,
} from 'react-native';
import Shadow from './src/Shadow';
import { Neomorph } from 'react-native-neomorph-shadows';
import Animated, { Value, timing, Easing, useValue } from 'react-native-reanimated';
import Test from './src/Test';
import { AnimatedNeomorph } from './src/AnimatedNeomorph';
import { NeomorphTwo } from './src/NeomorphTwo';

const NeomorphAnim = Animated.createAnimatedComponent(Neomorph);
const AnimTest = Animated.createAnimatedComponent(Test);
const AnimView = Animated.createAnimatedComponent(View);

const App: React.FC = () => {

    const width = useValue(150)

    const startAnimation = () => {
        timing(width, {
          toValue: 300,
          duration: 1500,
          easing: Easing.ease
        }).start();
    }

    const shadowOpt = {
        width:100,
        height:100,
        color:"#000",
        border:2,
        radius:3,
        opacity:0.2,
        x:0,
        y:3,
        style:{marginVertical:5}
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Pressable onPressIn={() => setIsToggle(true)} onPressOut={() => setIsToggle(false)}>
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
            </Pressable> */}
            {/* <AnimTest width={width}/>
            <Neomorph
                    inner // <- enable shadow inside of neomorph
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
            <Button onPress={() => startAnimation()} title="toggle"/> */}
            {/* <NeomorphTwo
                inner
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
            </NeomorphTwo> */}
            <NeomorphTwo
                // inner
                // swapShadow
                style={{
                    shadowOpacity: 0.8,
                    shadowRadius: 10,
                    borderRadius: 30,
                    shadowOffset: {
                        width: 2,
                        height: 4,
                    },
                    backgroundColor: '#DDDDDD',
                    width: 300,
                    height: 300,
                    marginTop: 50,
                    marginLeft: 50
                }}
            >
                <Text>123</Text>
            </NeomorphTwo>
            <Neomorph
                // inner // <- enable shadow inside of neomorph
                style={{
                    shadowOpacity: 0.8,
                    shadowRadius: 10,
                    borderRadius: 40,
                    backgroundColor: '#DDDDDD',
                    shadowOffset: {
                        width: 3,
                        height: 6
                    },
                    width: 300,
                    height: 300,
                    marginTop: 50,
                    marginLeft: 50
                }}
                >
                    <Text>123</Text>
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
