import React from 'react';
import { Svg, Rect, LinearGradient, Stop, Defs } from 'react-native-svg'

export const InnerShadowSvg: React.FC<any> = ({
    width = 0,
	height = 0,
	borderRadius,
	shadowRadius,
	shadowOffset,
	shadowOpacity,
	shadowColor,
	backgroundColor,
	position
}: any) => {
    console.log(shadowOffset)
    const renderStop = () => {
        return[
                <Stop 
                    offset={shadowRadius / 100 / 2} 
                    stopColor={backgroundColor || 'white'}
                    stopOpacity={1 - shadowOpacity}
                    key={`Box${position}Linear0`}
                />,
                <Stop 
                    offset="0" 
                    stopColor={shadowColor || 'white'} 
                    stopOpacity={shadowOpacity ? shadowOpacity : shadowRadius / 100} 
                    key={`Box${position}Linear1`}
                />
        ]
    }

    const renderLinearGradient = () => {
        if(position === 'top') {
            return(
                <Defs>
                    <LinearGradient id="shadow1" x1="0%" x2="0%" y1="0%" y2={`${shadowOffset.y * 20}%`}>
                        {renderStop()}
                    </LinearGradient>
                    <LinearGradient id="shadow2" x1="0%" y1="0%" x2={`${shadowOffset.x * 20}%`} y2="0%">
                        {renderStop()}
                    </LinearGradient>
                </Defs>
            )
        } else {
            return(
                <Defs>
                    <LinearGradient id="shadow1" x1="100%" y1="0%" x2={`${50 - shadowOffset.y * 10}%`} y2="0%">
                        {renderStop()}
                    </LinearGradient>
                    <LinearGradient id="shadow2" x1="0%" x2="0%" y1={`${100 + shadowOffset.x}%`} y2="0%">
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