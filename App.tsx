/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    NativeModules,
    requireNativeComponent,
    ViewPropTypes,
    // Animated,
    // Easing,
    Pressable
} from 'react-native';
import PropTypes from 'prop-types';
import { useLazyRef } from './src/useLazyRef';
import { Neumorph } from './src/Neumorph';
import { AnimatedNeumorph } from './src/AnimatedNeumorph';
// import Shadow from './src/Shadow';
import Animated, { useSharedValue, useAnimatedStyle, Easing, withTiming, useValue, interpolateNode, interpolate } from 'react-native-reanimated';
import { hexToRgb } from './src/utils';


const App: React.FC = () => {

    const [isAnim, setIsAnim] = useState<boolean>(false);
    // const width = useLazyRef(() => new Animated.Value(150));

    // const startAnimation = () => {
    //     Animated.timing(width, {
    //         toValue: 300,
    //         duration: 10000,
    //         useNativeDriver: false,
    //         easing: Easing.ease
    //     }).start();
    // }

    // const downAnimation = () => {
    //     Animated.timing(width, {
    //         toValue: 150,
    //         duration: 10000,
    //         useNativeDriver: false,
    //         easing: Easing.ease
    //     }).start();
    // }

    const width = useSharedValue(150);

    const height = useSharedValue(150);

    const startAnimation = () => {
        width.value = withTiming(300, {
            duration: 1500,
            easing: Easing.ease
        });
        height.value = withTiming(300, {
            duration: 1500,
            easing: Easing.ease
        })
    }

    const downAnimation = () => {
        width.value = withTiming(150, {
            duration: 1500,
            easing: Easing.ease
        });
        height.value = withTiming(150, {
            duration: 1500,
            easing: Easing.ease
        });
    }
    const styleAnim1 = useAnimatedStyle(() => {
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
    const styleAnim2 = useAnimatedStyle(() => {
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
    const styleAnim3 = useAnimatedStyle(() => {
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
                <Button title="Toggle" onPress={() => startAnimation()}/>
                <Button title="Down" onPress={() => downAnimation()}/>
                {/* <ScrollView contentContainerStyle={{ flexGrow: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                    <AnimatedNeumorph
                        inner
                        style={[styleAnim, { 
                            backgroundColor: "#ddd",
                            shadowOpacity: 1,
                            borderRadius: 10,
                            shadowRadius: 12 
                        }]}
                    />
                    <AnimatedNeumorph
                        basin
                        style={[styleAnim1, { 
                            backgroundColor: "#ddd",
                            shadowOpacity: 1,
                            borderRadius: 10,
                            shadowRadius: 12 
                        }]}
                    />
                    <AnimatedNeumorph
                        style={[styleAnim2, { 
                            backgroundColor: "#ddd",
                            shadowOpacity: 1,
                            borderRadius: 10,
                            shadowRadius: 12 
                        }]}
                    />
                    <AnimatedNeumorph
                        style={[styleAnim3, { 
                            backgroundColor: "#ddd",
                            shadowOpacity: 1,
                            borderRadius: 200,
                            shadowRadius: 12 
                        }]}
                    />
                    <Neumorph
                            inner={isAnim}
                            // basin
                            // lightShadowColor="#ffffff"
                            // darkShadowColor="#000000"
                            style={{
                                shadowOpacity: 1,
                                shadowRadius: 12,
                                borderRadius: 200,
                                backgroundColor: '#ddd',
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Neumorph
                            inner={isAnim}
                            // basin
                            // lightShadowColor="#ffffff"
                            // darkShadowColor="#000000"
                            style={{
                                shadowOpacity: 1,
                                shadowRadius: 12,
                                borderRadius: 200,
                                backgroundColor: '#ddd',
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Neumorph
                            inner={isAnim}
                            // basin
                            // lightShadowColor="#ffffff"
                            // darkShadowColor="#000000"
                            style={{
                                shadowOpacity: 1,
                                shadowRadius: 12,
                                borderRadius: 200,
                                backgroundColor: '#ddd',
                                width: 80,
                                height: 80,
                            }}
                        />
                        <Neumorph
                            inner={isAnim}
                            // basin
                            // lightShadowColor="#ffffff"
                            // darkShadowColor="#000000"
                            style={{
                                shadowOpacity: 1,
                                shadowRadius: 12,
                                borderRadius: 200,
                                backgroundColor: '#ddd',
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Neumorph
                            inner={isAnim}
                            // basin
                            // lightShadowColor="#ffffff"
                            // darkShadowColor="#000000"
                            style={{
                                shadowOpacity: 1,
                                shadowRadius: 12,
                                borderRadius: 200,
                                backgroundColor: '#ddd',
                                width: 80,
                                height: 80,
                            }}
                        />
                        <Neumorph
                            inner={isAnim}
                            // basin
                            // lightShadowColor="#ffffff"
                            // darkShadowColor="#000000"
                            style={{
                                shadowOpacity: 1,
                                shadowRadius: 12,
                                borderRadius: 200,
                                backgroundColor: '#ddd',
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Neumorph
                            inner={isAnim}
                            // basin
                            // lightShadowColor="#ffffff"
                            // darkShadowColor="#000000"
                            style={{
                                shadowOpacity: 1,
                                shadowRadius: 12,
                                borderRadius: 200,
                                backgroundColor: '#ddd',
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Neumorph
                            inner={isAnim}
                            // basin
                            // lightShadowColor="#ffffff"
                            // darkShadowColor="#000000"
                            style={{
                                shadowOpacity: 1,
                                shadowRadius: 12,
                                borderRadius: 200,
                                backgroundColor: '#ddd',
                                width: 150,
                                height: 150,
                            }}
                        />
                </ScrollView> */}
                <View style={{ marginTop: 150, marginLeft: 50 }}>
                    <Pressable onPressIn={() => setIsAnim(true)} onPressOut={() => setIsAnim(false)}>
                        <Neumorph
                            inner={true}
                            // basin
                            // lightShadowColor="#ffffff"
                            // darkShadowColor="#000000"
                            style={{
                                shadowOpacity: 1,
                                shadowRadius: 12,
                                borderRadius: 40,
                                backgroundColor: '#ddd',
                                width: 150,
                                height: 150,
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                shadowOffset: {
                                    width: 3,
                                    height: 6
                                }
                            }}
                        >
                            <Text>123</Text>
                        </Neumorph>
                    </Pressable>
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1
    }
})

export default App;
