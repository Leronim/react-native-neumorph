import React from 'react';
import { Svg, Rect, LinearGradient, Stop, Defs, Path } from 'react-native-svg';

export const InnerShadowSvg: React.FC<any> = ({
    option: {
        width = 0,
        height = 0,
        borderRadius,
        shadowRadius,
        shadowOffset,
        shadowOpacity,
        shadowColor,
        backgroundColor,
    },
    position
}: any) => {

    const innerWidth = position === 'bottom' ? shadowRadius : width;
    const innerHeight = position === 'bottom' ? shadowRadius : height

    const renderStop = () => {
        return[
                <Stop 
                    offset={0.1} 
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
                // <Stop
                //     offset="0"
                //     stopColor={color}
                //     stopOpacity={shadowOpacity}
                //     key={`Box` + position + 'Linear0'}
                //     />,
                // <Stop
                //     offset="1"
                //     stopColor={color}
                //     stopOpacity={shadowRadius / 100}
                //     key={'Box' + position + 'Linear1'}
                // />,
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
            <Rect 
                rx={borderRadius} 
                ry={borderRadius} 
                // width={position === 'bottom' ? shadowRadius : width} 
                // height={position === 'bottom' ? height : shadowRadius} 
                width={width}
                height={height}
                fill="url(#shadow1)"
            />
            <Rect 
                rx={borderRadius} 
                ry={borderRadius} 
                // width={position === 'bottom' ? width : shadowRadius} 
                // height={position === 'bottom' ? shadowRadius : height} 
                width={width}
                height={height}
                fill="url(#shadow2)"
            />
        </Svg>
    )
}