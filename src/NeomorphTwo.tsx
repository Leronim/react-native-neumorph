import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import {Shadow} from './Shadow';
import { InnerShadowSvg } from './InnerShadowSvg';

const hexToHsl = (hex: any) => {
    const result: any = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
  
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h: any,
      s,
      l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
  
    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);
  
    return {
      h,
      s,
      l,
    };
  };

const hslToHex = (h:any, s:any, l:any) => {
    s /= 100;
    l /= 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r: any = 0,
      g: any = 0,
      b: any = 0;
  
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
  
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
  
    return '#' + r + g + b;
  };

export const NeomorphTwo: React.FC<any> = ({
    inner,
    children,
    style: {
        height,
        width,
        borderRadius,
        backgroundColor,
        shadowOffset,
        shadowRadius,
        shadowOpacity
    },
    style
}: any) => {

    const { h, s, l } = hexToHsl(backgroundColor);
    const light = hslToHex(h - 2 < 0 ? 0 : h - 2, s, l + 5 > 100 ? 100 : l + 5);
    const dark = hslToHex(h, s, l - 8 < 0 ? 0 : l - 20);
    const mid = hslToHex(h, s, l - 5 < 0 ? 0 : l - 5);

    const lightSetting = {
        width,
        height,
        shadowRadius,
        shadowOffset: {
            width: -shadowRadius + -shadowOffset.width,
            height: -shadowRadius + -shadowOffset.height
        },
        borderRadius,
        color: inner ? dark : light,
        shadowOpacity
    };
    
      const darkSetting = {
        width,
        height,
        shadowRadius,
        shadowOffset: {
            width: shadowOffset.width,
            height: shadowOffset.height
        },
        color: inner ? light : dark,
        borderRadius,
        shadowOpacity,
    };

    const insetLightSetting = {
        width,
        height,
        shadowRadius,
        shadowOffset: {
            width: shadowOffset.width,
            height: shadowOffset.height
        },
        borderRadius,
        color: dark,
        shadowOpacity,
        backgroundColor
    };
    
    const insetDarkSetting = {
        width: width,
        height: height,
        shadowRadius,
        shadowOffset: {
            width: shadowOffset.width,
            height: shadowOffset.height
        },
        color: light,
        borderRadius,
        shadowOpacity,
        backgroundColor
    };

    const styles = StyleSheet.create({
        view: {
            width,
            height,
            borderRadius,
            backgroundColor,
        }
    })

    return (
        <View style={{ ...style }}>
            {inner 
                ?
                (
                    <>
                        <InnerShadowSvg position="top" option={insetLightSetting}/>
                        <InnerShadowSvg position="bottom" option={insetDarkSetting}/>
                        <View style={style.view}>{children}</View>
                    </>
                ) 
                :
                (
                    <>
                        <Shadow option={lightSetting} />
                        <Shadow option={darkSetting} />
                        <View style={styles.view}>{children}</View>
                    </>
                )
            }
        </View>
    )
    
}