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
    Pressable
} from 'react-native';
import PropTypes from 'prop-types';
import { useLazyRef } from './src/useLazyRef';
import { Neumorph } from './src/Neumorph';
import { NativeNeumorph } from './src/nativeComponent';
// import Shadow from './src/Shadow';
// import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, useValue, interpolateNode, interpolate } from 'react-native-reanimated';


const App: React.FC = () => {

    const [isAnim, setIsAnim] = useState<boolean>(false);
    const width = useLazyRef(() => new Animated.Value(150));

    const startAnimation = () => {
        Animated.timing(width, {
            toValue: 300,
            duration: 10000,
            useNativeDriver: false,
            easing: Easing.ease
        }).start();
    }

    const downAnimation = () => {
        Animated.timing(width, {
            toValue: 150,
            duration: 10000,
            useNativeDriver: false,
            easing: Easing.ease
        }).start();
    }

    // const width = useSharedValue(150);

    // const height = useSharedValue(150);

    // const startAnimation = () => {
    //     width.value = withTiming(300, {
    //         duration: 1500,
    //         easing: Easing.ease
    //     });
    //     height.value = withTiming(300, {
    //         duration: 1500,
    //         easing: Easing.ease
    //     })
    // }

    // const downAnimation = () => {
    //     width.value = withTiming(150, {
    //         duration: 1500,
    //         easing: Easing.ease
    //     });
    //     height.value = withTiming(150, {
    //         duration: 1500,
    //         easing: Easing.ease
    //     });
    // }

    // const styleAnim = useAnimatedStyle(() => {
    //     return {
    //         width: withTiming(width.value, {
    //             duration: 1500,
    //             easing: Easing.bezier(0.25, 0.1, 0.25, 1)
    //         }),
    //         height: withTiming(height.value, {
    //             duration: 1500,
    //             easing: Easing.bezier(0.25, 0.1, 0.25, 1)
    //         }),
    //     }
    // })
    return (
        <SafeAreaView style={styles.container}>
                <Button title="Toggle" onPress={() => setIsAnim(!isAnim)}/>
                {/* <View style={{ borderRadius: 200, backgroundColor: 'red', width: 300, height: 300 }}>

                </View> */}
                <View style={{ marginLeft: 50, marginTop: 100 }}>
                    <NativeNeumorph style={{width: 150, height: 150}}/>
                </View>
                <View style={{ marginTop: 150, marginLeft: 50 }}>
                    <Pressable onPressIn={() => setIsAnim(true)} onPressOut={() => setIsAnim(false)}>
                        {/* <Neumorph
                            style={{
                                shadowRadius: 12,
                                borderRadius: 200,
                                backgroundColor: '#DDDDDD',
                                width: 200,
                                height: 200,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        > */}
                            {/* <Neumorph
                                inner
                                darkShadowColor="#c3c3c3"
                                lightShadowColor="#ffffff"
                                style={{
                                    shadowRadius: 8,
                                    borderRadius: 200,
                                    backgroundColor: '#F19F9F',
                                    width: 180,
                                    height: 180,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    shadowOffset: {
                                        width: 12,
                                        height: 12
                                    }
                                }}
                            > */}
                                {/* <Neumorph
                                    style={{
                                        shadowRadius: 12,
                                        borderRadius: 200,
                                        backgroundColor: '#DDDDDD',
                                        width: 100,
                                        height: 100,
                                        shadowOffset: {
                                            width: 20,
                                            height: 20
                                        }
                                      }}
                                />
                            </Neumorph>
                        </Neumorph> */}
                        {/* <Neumorph
                            inner={isAnim}
                            // basin
                            // lightShadowColor="#ffffff"
                            // darkShadowColor="#000000"
                            style={{
                                shadowOpacity: 1,
                                shadowRadius: 12,
                                borderRadius: 200,
                                backgroundColor: '#ddd',
                                width: 200,
                                height: 200,
                            }}
                        /> */}
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
