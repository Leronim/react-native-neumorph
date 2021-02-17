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
// import Shadow from './src/Shadow';
import { Neomorph } from 'react-native-neomorph-shadows';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, useValue, interpolateNode } from 'react-native-reanimated';
import Test from './src/Test';
import { AnimatedNeomorph } from './src/AnimatedNeomorph';
import { NeomorphTwo } from './src/NeomorphTwo';

const AnimNeomorph = Animated.createAnimatedComponent(Neomorph);

const App: React.FC = () => {

    const [isAnim, setIsAnim] = useState<boolean>(false);

    const width = useSharedValue(150);

    const height = useSharedValue(150);

    const startAnimation = () => {
        setIsAnim(!isAnim);
        width.value = 300;
        height.value = 300
    }

    const downAnimation = () => {
        setIsAnim(!isAnim); 
        width.value = 150;
        height.value = 150;
    }

    const styleAnim = useAnimatedStyle(() => {
        return {
            width: withTiming(width.value, {
                duration: 1500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1)
            }),
            height: withTiming(height.value, {
                duration: 1500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1)
            }),
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[{ backgroundColor: 'blue' }]}>

            </Animated.View>
            <View style={{ marginLeft: 50, marginTop: 100 }}>
                <AnimNeomorph
                    // inner 
                    // swapShadow
                    style={{ 
                        ...styleAnim,
                        shadowOpacity: 1,
                        shadowRadius: 20,
                        borderRadius: 10,
                        shadowOffset: {
                            width: 2,
                            height: 4,
                        },
                        backgroundColor: '#DDDDDD',
                    }}
                >
                    <Text>123</Text>
                </AnimNeomorph>
            </View>
            <View style={{ marginTop: 100 }}>
                <Button onPress={() => startAnimation()} title="toggle"/>
                <Button onPress={() => downAnimation()} title="down"/> 
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ececec',
        height: '100%'
    }
})

export default App;
