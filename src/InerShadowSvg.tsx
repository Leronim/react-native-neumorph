import React from 'react';
import { Svg, Rect, LinearGradient, Stop, Defs } from 'react-native-svg';
import Animated from 'react-native-reanimated';

interface InerShadowProps {
    borderRadius?: number;
    position: string;
    backgroundColor: string;
    shadowProps: string;
    width: any;
    height: any;
}

const AnimSvg = Animated.createAnimatedComponent(Svg);
const AnimRect = Animated.createAnimatedComponent(Rect);

export const InerShadowSvg: React.FC<InerShadowProps> = ({ 
    borderRadius,
    position,
    backgroundColor,
    shadowProps,
    width,
    height
}) => {
    const renderStop = (shadowProps: string) => {
        return[
                <Stop 
                    offset="0.1" 
                    stopColor={'black'}
                    stopOpacity="0"
                    key={`Box${position}Linear0`}
                />,
                <Stop 
                    offset="0" 
                    stopColor={'white'} 
                    stopOpacity="0.3" 
                    key={`Box${position}Linear1`}
                />
        ]
    }


    const renderLinearGradient = (shadowProps: string) => {
        if(position === 'top') {
            return(
                <Defs>
                    <LinearGradient id="shadow1" x1="0%" x2="0%" y1="0%" y2="100%">
                        {renderStop(shadowProps)}
                    </LinearGradient>
                    <LinearGradient id="shadow2" x1="0%" y1="0%" x2="100%" y2="0%">
                        {renderStop(shadowProps)}
                    </LinearGradient>
                </Defs>
            )
        } else {
            return(
                <Defs>
                    <LinearGradient id="shadow1" x1="100%" y1="0%" x2="0%" y2="0%">
                        {renderStop(shadowProps)}
                    </LinearGradient>
                    <LinearGradient id="shadow2" x1="0%" x2="0%" y1="100%" y2="0%">
                        {renderStop(shadowProps)}
                    </LinearGradient>
                </Defs>
            )
        }
    }

    return(
        <AnimSvg width={width} height={height} style={{ position: 'absolute' }}>
            {renderLinearGradient(shadowProps)}
            <AnimRect rx={borderRadius} ry={borderRadius} width={width} height={height} fill="url(#shadow1)"/>
            <AnimRect rx={borderRadius} ry={borderRadius} width={width} height={height} fill="url(#shadow2)"/>
        </AnimSvg>
    )
}