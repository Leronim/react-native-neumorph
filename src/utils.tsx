import { useAnimatedProps } from 'react-native-reanimated';

/**
 * 
 * @param {string} color hex color
 * @description function convert color hex to hsl
 * @returns hsl color or white
 * @example     
 *  const { h, s, l } = hexToHsl(backgroundColor);
 * 
 */
export const hexToHsl = (color: string) => {
    const result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

    let r = parseInt(result ? result[1] : 'ff', 16);
    let g = parseInt(result ? result[2] : 'ff', 16);
    let b = parseInt(result ? result[3] : 'ff', 16);

    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);

    let h: number = 0,
        s: number = 0,
        l: number = (max + min) / 2;

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

}

/**
 * 
 * @param {number} h hsl color
 * @param {number} s hsl color
 * @param {number} l hsl color
 * @description function convert hsl color to HEX
 * @returns HEX color
 * @example 
 * const color = hslToHex(0 0 98)
 */

export const hslToHex = (
    h: number,
    s: number,
    l: number
) => {
    let newS: number = s / 100,
        newL: number = l / 100;
    s /= 100;
    l /= 100;

    let c: number = (1 - Math.abs(2 * newL - 1)) * newS,
        x: number = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m: number = newL - c / 2,
        countR: number = 0,
        countG: number = 0,
        countB: number = 0;

    if (0 <= h && h < 60) {
        countR = c;
        countG = x;
        countB = 0;
    } else if (60 <= h && h < 120) {
        countR = x;
        countG = c;
        countB = 0;
    } else if (120 <= h && h < 180) {
        countR = 0;
        countG = c;
        countB = x;
    } else if (180 <= h && h < 240) {
        countR = 0;
        countG = x;
        countB = c;
    } else if (240 <= h && h < 300) {
        countR = x;
        countG = 0;
        countB = c;
    } else if (300 <= h && h < 360) {
        countR = c;
        countG = 0;
        countB = x;
    }
    let r: string = Math.round((countR + m) * 255).toString(16),
        g: string = Math.round((countG + m) * 255).toString(16),
        b: string = Math.round((countR + m) * 255).toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return '#' + r + g + b;
};

export const constructAnimPath = (
    type: 'rightTop' | 'rightBottom' | 'leftBottom',
    innerRadius: number,
    outerRadius: string,
    width: any,
    shadowRadius: string,
    height: any = null
) => {
    return useAnimatedProps(() => {
        const mPrefix = `M ${width.value} ${type === 'rightTop' ? '0' : height.value}`;
        const aTopPrefix = `a ${outerRadius} ${outerRadius} 0 0 1 
            ${type === 'rightBottom' || type === 'leftBottom' 
                ? -outerRadius 
                : outerRadius
            } 
            ${type === 'leftBottom' ? -outerRadius : outerRadius}
        `;
        const hPrefix = `h ${type === 'leftBottom' ? shadowRadius : -shadowRadius}`;
        const aBottomPrefix = `a ${innerRadius} ${innerRadius} 0 0 0 
            ${type === 'rightTop' 
                ? -innerRadius
                : innerRadius
            } ${type ==='leftBottom' ? innerRadius : -innerRadius} z`
        const path = `${mPrefix} ${aTopPrefix} ${hPrefix} ${aBottomPrefix}`;
        console.log(path)
        return {
            d: path
        }
    })
}