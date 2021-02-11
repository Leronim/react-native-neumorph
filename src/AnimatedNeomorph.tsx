import React from 'react';
import { View, Dimensions } from 'react-native';
import { AnimatedInerShadowSvg } from './AnimatedInerShadowSvg';
import Animated from 'react-native-reanimated';
import { Svg } from 'react-native-svg';

interface NeomorphProps extends Neomorph {
    width: any;
    height: any;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const AnimatedNeomorph: React.FC<NeomorphProps> = ({ 
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
                        <AnimatedInerShadowSvg 
                            borderRadius={borderRadius} 
                            backgroundColor={backgroundColor} 
                            position="top"
                            shadowProps=""
                            width={width}
                            height={height}
                        />
                        <AnimatedInerShadowSvg 
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