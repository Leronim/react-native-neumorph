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
    Animated,
    Easing,
    Pressable,
    UIManager,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import Neumorph from './src/Neumorph';
// import { AnimatedNeumorph } from './src/AnimatedNeumorph';
// import Shadow from './src/Shadow';
// import Animated, { useSharedValue, useAnimatedStyle, Easing, withTiming, useValue, interpolateNode, interpolate } from 'react-native-reanimated';
import { hexToRgb } from './src/utils';

const AnimatedNeumorph = Animated.createAnimatedComponent(Neumorph);
const PressableAnim = Animated.createAnimatedComponent(Pressable)


const App: React.FC = () => {
    const [state, setState] = useState(false);
    const width = new Animated.Value(150);
    const widthTwo = new Animated.Value(130);
    const widthThree = new Animated.Value(100);


    const heightTwo = new Animated.Value(150);

    const startTwoAnim = () => {
        Animated.timing(heightTwo, {
            toValue: 300,
            duration: 300,
            useNativeDriver: false
        }).start()
    }

    const downTwoAnim = () => {
        Animated.timing(heightTwo, {
            toValue: 150,
            duration: 300,
            useNativeDriver: false
        }).start()
    }

    const startAnimation = () => {
        Animated.timing(width, {
            toValue: 300,
            easing: Easing.ease,
            duration: 300,
            useNativeDriver: false
        }).start()
        Animated.timing(widthTwo, {
            toValue: 280,
            easing: Easing.ease,
            duration: 300,
            useNativeDriver: false
        }).start()
        Animated.timing(widthThree, {
            toValue: 250,
            easing: Easing.ease,
            duration: 300,
            useNativeDriver: false
        }).start()
        
    }

    const downAnimation = () => {
        Animated.timing(width, {
            toValue: 150,
            easing: Easing.ease,
            duration: 300,
            useNativeDriver: false
        }).start()
        Animated.timing(widthTwo, {
            toValue: 130,
            easing: Easing.ease,
            duration: 300,
            useNativeDriver: false
        }).start()
        Animated.timing(widthThree, {
            toValue: 100,
            easing: Easing.ease,
            duration: 300,
            useNativeDriver: false
        }).start()
    }

    // const width = useSharedValue(150);

    // const height = useSharedValue(150);

    // const startAnimation = () => {
    //     width.value = withTiming(300, {
    //         duration: 300,
    //         easing: Easing.ease
    //     });
    //     // height.value = withTiming(300, {
    //     //     duration: 300,
    //     //     easing: Easing.ease
    //     // })
    // }

    // const downAnimation = () => {
    //     width.value = withTiming(150, {
    //         duration: 300,
    //         easing: Easing.ease
    //     });
    //     // height.value = withTiming(150, {
    //     //     duration: 300,
    //     //     easing: Easing.ease
    //     // });
    // }
    // const styleAnim1 = useAnimatedStyle(() => {
    //     return {
    //         width: withTiming(width.value, {
    //             duration: 1500,
    //             easing: Easing.bezier(0.25, 0.1, 0.25, 1)
    //         })
    //     }
    // })

    return (
        <SafeAreaView style={styles.container}>
            {/* <Button title="Toggle" onPress={() => startAnimation()}/> */}
            {/* <Button title="Down" onPress={() => downAnimation()}/> */}
            <ScrollView contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Pressable onPressIn={() => startAnimation()} onPressOut={() => downAnimation()}>
                    <AnimatedNeumorph
                        inner
                        darkShadowColor="#000000"
                        lightShadowColor="#ffffff"
                        style={{
                            backgroundColor: '#dddddd',
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            borderRadius: 10,
                            marginTop: 20,
                            marginRight: 20,
                            height: 150,
                            width: width
                        }}
                    />
                </Pressable>
                <Pressable onPressIn={() => startTwoAnim()} onPressOut={() => downTwoAnim()}>
                    <AnimatedNeumorph
                        darkShadowColor="#000000"
                        lightShadowColor="#ffffff"
                        style={{
                            backgroundColor: '#dddddd',
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            borderRadius: 10,
                            marginTop: 20,
                            marginRight: 20,
                            width: 150,
                            height: heightTwo,
                        }}
                    />
                </Pressable>
                <Pressable onPressIn={() => startAnimation()} onPressOut={() => downAnimation()}>
                    <AnimatedNeumorph 
                        style={{ 
                            width: width,
                            height: 150, 
                            borderRadius: 30,
                            backgroundColor: '#ddd', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            shadowOpacity: 1,
                            marginTop: Platform.OS === 'ios' ? 50 : 0,
                        }}
                    >
                        <AnimatedNeumorph
                            style={{
                                width: widthTwo,
                                height: 130,
                                borderRadius: 30,
                                backgroundColor: "#ddd",
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowOpacity: 1
                            }}
                        >
                            <AnimatedNeumorph style={{width: widthThree, height: 100, backgroundColor: '#ddd', borderRadius: 30, shadowOpacity: 1}}/>
                        </AnimatedNeumorph>
                    </AnimatedNeumorph>
                </Pressable>
                <Neumorph 
                    inner
                    swapShadow
                    style={{ 
                        width: 150,
                        height: 150, 
                        borderRadius: 30,
                        backgroundColor: '#ddd', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        shadowOpacity: 0.6,
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    }}
                >
                    <Neumorph
                        inner
                        style={{
                            width: 130,
                            height: 130,
                            borderRadius: 30,
                            backgroundColor: "#ddd",
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowOpacity: 1
                        }}
                    >
                        <Neumorph swapShadow inner style={{width: 100, height: 100, backgroundColor: '#ddd', borderRadius: 30, shadowOpacity: 1}}/>
                    </Neumorph>
                </Neumorph>
                <Neumorph 
                    inner
                    swapShadow
                    style={{ 
                        width: 150,
                        height: 150, 
                        borderRadius: 100,
                        backgroundColor: '#ddd', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        shadowOpacity: 0.8,
                        marginTop: Platform.OS === 'ios' ? 50 : 0,
                    }}
                >
                    <Neumorph
                        inner
                        style={{
                            width: 130,
                            height: 130,
                            borderRadius: 100,
                            backgroundColor: "#ddd",
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowOpacity: 0.6
                        }}
                    >
                        <Neumorph swapShadow inner style={{width: 100, height: 100, backgroundColor: '#ddd', borderRadius: 100, shadowOpacity: 0.6}}/>
                    </Neumorph>
                </Neumorph>
                <Neumorph 
                    style={{ 
                        width: 150,
                        height: 150, 
                        borderRadius: 100,
                        backgroundColor: '#ddd', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        shadowOpacity: 1,
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    }}
                >
                    <Neumorph
                        style={{
                            width: 130,
                            height: 130,
                            borderRadius: 100,
                            backgroundColor: "#ddd",
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowOpacity: 1
                        }}
                    >
                        <Neumorph style={{width: 100, height: 100, backgroundColor: '#ddd', borderRadius: 100, shadowOpacity: 1}}/>
                    </Neumorph>
                </Neumorph>
                <Neumorph
                    style={{
                        shadowRadius: 3,
                        borderRadius: 100,
                        backgroundColor: '#DDDDDD',
                        width: 200,
                        height: 200,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    }}
                    >
                        <Neumorph
                            inner
                            darkShadowColor="#ababab"
                            lightShadowColor="#ebebeb"
                            style={{
                                shadowRadius: 7,
                                shadowOpacity: 0.6,
                                borderRadius: 100,
                                backgroundColor: '#F19F9F',
                                width: 180,
                                height: 180,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Neumorph
                                style={{
                                    shadowRadius: 7,
                                    borderRadius: 100,
                                    shadowOpacity: 0.6,
                                    backgroundColor: '#DDDDDD',
                                    width: 100,
                                    height: 100,
                                }}
                            />
                        </Neumorph>
                    </Neumorph>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dddddd',
        flex: 1,
    }
})

export default App;
