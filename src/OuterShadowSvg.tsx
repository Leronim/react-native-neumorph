import React from 'react';
import { Svg, Rect, LinearGradient, Defs, Stop } from 'react-native-svg';

export const OuterShadowSvg: React.FC<any> = ({
    style,
    position
}:any) => {
    const { borderRadius, width, height, shadowColor, backgroundColor } = style;

    const top = position === 'top' ? -10 : 10;
    const left = position === 'top' ? -15 : 15;

    const renderStop = () => {
		return[
				<Stop 
					offset="0" 
					stopColor={shadowColor}
					stopOpacity="0.2"
					key={`Box${position}Linear0`}
				/>,
				<Stop
					offset="1"
					stopColor={shadowColor}
					stopOpacity="0.4"
					key={`Box${position}Linear1`}
				/>,
				<Stop 
					offset="1" 
					stopColor={shadowColor}
					stopOpacity="0" 
					key={`Box${position}Linear2`}
				/>
		]
	}

    const renderLinearGradient = () => {
		if(position === 'top') {
			return(
				<Defs>
					<LinearGradient id="shadow1" x1="100%" x2="100%" y1="100%" y2="100%">
						{renderStop()}
					</LinearGradient>
				</Defs>
			)
		} else {
			return(
				<Defs>
					<LinearGradient id="shadow1" x1="100%" y1="100%" x2="100%" y2="100%">
						{renderStop()}
					</LinearGradient>
				</Defs>
			)
		}
	}

    return(
        <Svg width={width} height={height} style={{ position: 'absolute', left: left, top: top }}>
            {renderLinearGradient()}
            <Rect 
                rx={borderRadius} 
                ry={borderRadius} 
                width={width} 
                height={height}
                fill="url(#shadow1)"
            />
        </Svg>
    )
}