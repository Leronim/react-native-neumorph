import React from 'react';
import { View, Dimensions } from 'react-native';
import { InerShadowSvg } from './InerShadowSvg';
import Animated from 'react-native-reanimated';
import { Svg } from 'react-native-svg';

interface NeomorphProps {
    children: React.ReactChild;
    inner?: boolean;
    style: any;
    width: any;
    height: any;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const NeomorphTwo: React.FC<NeomorphProps> = ({ 
    children,
    inner,
    style,
    width,
    height
    }: NeomorphProps) => {
        const { borderRadius, backgroundColor, shadowRadius } = style;
        if(inner) {
            return(
                <AnimatedView style={{
                    ...style,
                    width: width,
                    height: width   
                }}>
                    <View>
                        <InerShadowSvg 
                            borderRadius={borderRadius} 
                            backgroundColor={backgroundColor} 
                            position="top"
                            shadowProps=""
                            width={width}
                            height={height}
                        />
                        <InerShadowSvg 
                            borderRadius={borderRadius} 
                            position="bottom"
                            backgroundColor={backgroundColor}
                            shadowProps=""
                            width={width}
                            height={height}
                        />
                    </View>
                    <View>{children}</View>
                </AnimatedView>
            )
        } else {
            return(
                <View></View>
            )
        }
};