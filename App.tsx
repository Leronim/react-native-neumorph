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
    Easing
} from 'react-native';
import PropTypes from 'prop-types';
import { useLazyRef } from './src/useLazyRef';
import { brightness } from './src/helpers';
// import Shadow from './src/Shadow';
// import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, useValue, interpolateNode, interpolate } from 'react-native-reanimated';

const Neumorph = requireNativeComponent('Neumorph');
const AnimNeomorph = Animated.createAnimatedComponent(Neumorph);

const App: React.FC = () => {

    const [isAnim, setIsAnim] = useState<boolean>(false);
    const width = useLazyRef(() => new Animated.Value(150));

    console.log(brightness('#ffffff'))

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
    
    const viewProps = {
        name: 'Neumorph',
        propTypes: {
            backgroundColor: PropTypes.string,
            ...ViewPropTypes
        }
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
            {/* <Button title="Toggle" onPress={() => setIsAnim(!isAnim)}/> */}
            {/* <Animated.View 
                style={{ 
                    backgroundColor: 'red',
                    width: width,
                    height: width 
                }}> */}
                <ScrollView contentContainerStyle={{ flexGrow: 1, flexWrap: 'wrap', flexDirection: 'row' }}>

                <AnimNeomorph
                    style={{
                        width: width,
                        height: width,
                    }}
                >
                    <AnimNeomorph
                        inner
                        style={{
                            width: width,
                            height: width,
                        }}
                    />
                </AnimNeomorph>
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Neumorph
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />
                </ScrollView>
            {/* </Animated.View> */}
            <Button title='up' onPress={() => startAnimation()}/>
            <Button title='down' onPress={() => downAnimation()}/>
            {/* <ScrollView contentContainerStyle={{ flexGrow: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                {new Array(15).fill('').map((_, index: number) => {
                    return (
                        <View key={index} style={{ marginLeft: 30, marginTop: 100 }}>
                            <NeomorphTwo
                                inner={isAnim} 
                                // swapShadow
                                style={{ 
                                    shadowOpacity: 1,
                                    shadowRadius: 10,
                                    borderRadius: 70,
                                    width: 150,
                                    height: 150,
                                    shadowOffset: {
                                        width: 2,
                                        height: 4,
                                    },
                                    backgroundColor: '#dddddd',
                                }}
                            >
                                <NeomorphTwo
                                    inner={isAnim} 
                                    // swapShadow
                                    style={{ 
                                        shadowOpacity: 1,
                                        shadowRadius: 10,
                                        borderRadius: 70,
                                        width: 50,
                                        height: 50,
                                        shadowOffset: {
                                            width: 2,
                                            height: 4,
                                        },
                                        backgroundColor: '#dddddd',
                                    }}
                                >
                                    <Text>123</Text>
                                </NeomorphTwo>
                            </NeomorphTwo>
                        </View>
                    )
                })}
            </ScrollView> */}
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
