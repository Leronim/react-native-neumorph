import React from 'react';
import { Svg, Rect, LinearGradient, Stop, Defs } from 'react-native-svg'

export const InnerShadowSvg: React.FC<any> = ({
    style,
    position
}: any) => {
    const { borderRadius, width, height, backgroundColor, shadowColor } = style;

    const renderStop = () => {
        return[
                <Stop 
                    offset="0.1" 
                    stopColor={backgroundColor || 'white'}
                    stopOpacity="0"
                    key={`Box${position}Linear0`}
                />,
                <Stop 
                    offset="0" 
                    stopColor={shadowColor || 'white'} 
                    stopOpacity="0.3" 
                    key={`Box${position}Linear1`}
                />
        ]
    }

    const renderLinearGradient = () => {
        if(position === 'top') {
            return(
                <Defs>
                    <LinearGradient id="shadow1" x1="0%" x2="0%" y1="0%" y2="100%">
                        {renderStop()}
                    </LinearGradient>
                    <LinearGradient id="shadow2" x1="0%" y1="0%" x2="100%" y2="0%">
                        {renderStop()}
                    </LinearGradient>
                </Defs>
            )
        } else {
            return(
                <Defs>
                    <LinearGradient id="shadow1" x1="100%" y1="0%" x2="0%" y2="0%">
                        {renderStop()}
                    </LinearGradient>
                    <LinearGradient id="shadow2" x1="0%" x2="0%" y1="100%" y2="0%">
                        {renderStop()}
                    </LinearGradient>
                </Defs>
            )
        }
    }

    return(
        <Svg width={width} height={height} style={{ position: 'absolute' }}>
            {renderLinearGradient()}
            <Rect rx={borderRadius} ry={borderRadius} width={width} height={height} fill="url(#shadow1)"/>
            <Rect rx={borderRadius} ry={borderRadius} width={width} height={height} fill="url(#shadow2)"/>
        </Svg>
    )
}