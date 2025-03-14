import { clamp,
    ColorConversionError,
    validateOrThrow,
    getRandomValue
} from "./helper";
import {
    hexToHsl,
    hslToHex,
    rgbToHsl,
    hslToRgb,
    rgbToHex,
    hexToRgb,
} from "./colorConversion";

// * Random Color/Scheme ////
const randomcolor = (options?: { // TODO: update name
    format?: 'hex' | 'rgb' | 'hsl';
    hue?: number | [number, number];
    saturation?: number | [number, number];
    lightness?: number | [number, number];
  }): HEX | RGB | HSL => {
    try {
      const format = options?.format || 'hex';
  
      // Generate random HSL values
      const h = getRandomValue(options?.hue, 0, 359);
      const s = getRandomValue(options?.saturation, 0, 100);
      const l = getRandomValue(options?.lightness, 0, 100);
  
      const hsl: HSL = [h, s, l];
  
      // Convert to requested format
      switch (format) {
        case 'hex':
          return hslToHex(hsl) as HEX;
        case 'rgb':
          return hslToRgb(hsl) as RGB;
        case 'hsl':
        default:
          return hsl as HSL;
      }
    } catch (e: any) {
      throw new ColorConversionError(`Failed to generate random color: ${e.message}`);
    }
};
  
const generateColorScheme = (baseColor: RGB | HEX): ColorScheme => {
    // Nice articles for understanding color schemes: 
    // https://www.canva.com/colors/color-wheel/
    https://careerfoundry.com/en/blog/ui-design/introduction-to-color-theory-and-color-palettes/
    try {
      let baseHsl: HSL; // Converting to HSL for easier manipulation
      if (typeof baseColor === 'string') {
        baseHsl = hexToHsl(baseColor);
      } else {
        baseHsl = rgbToHsl(baseColor);
      }
      
      const h = baseHsl[0];
      const s = baseHsl[1];
      const l = baseHsl[2];
      
      const schemeHex = typeof baseColor === 'string' ? baseColor : rgbToHex(baseColor);
  
      // Generate analogous colors(on the color wheel)
      const analogous: HEX[] = [
        hslToHex([(h + 30) % 360, s, l]),
        hslToHex([(h + 330) % 360, s, l])
      ];
  
      // Complementary color (opposite on the color wheel)
      const complementary: HEX[] = [hslToHex([(h + 180) % 360, s, l])];
  
      // Triadic colors (three colors evenly spaced on the color wheel)
      const triadic: HEX[] = [
        hslToHex([(h + 120) % 360, s, l]),
        hslToHex([(h + 240) % 360, s, l])
      ];
  
      // Tetradic colors (four colors forming a rectangle on the color wheel)
      const tetradic: HEX[] = [
        hslToHex([(h + 90) % 360, s, l]),
        hslToHex([(h + 180) % 360, s, l]),
        hslToHex([(h + 270) % 360, s, l])
      ];
  
      // Monochromatic colors (variations of same hue with different lightness/saturation)
      const monochromatic: HEX[] = [
        hslToHex([h, Math.max(0, s - 20), l]),
        hslToHex([h, Math.min(100, s + 20), l]),
        hslToHex([h, s, Math.max(0, l - 20)]),
        hslToHex([h, s, Math.min(100, l + 20)])
      ];
  
      // Split-complementary colors
      const splitComplementary: HEX[] = [
        hslToHex([(h + 150) % 360, s, l]),
        hslToHex([(h + 210) % 360, s, l])
      ];
  
      return {
        base: schemeHex,
        analogous,
        complementary,
        triadic,
        tetradic,
        monochromatic,
        splitComplementary
      };
    } catch (e: any) {
      if (e instanceof ColorConversionError) throw e;
      throw new ColorConversionError(`Failed to generate color scheme: ${e.message}`);
    }
};

// * Accessibility Functions //
const getLuminance = (color: RGB | HEX): number => {
  try {
    const rgb = typeof color === 'string' ? hexToRgb(color) : color;

    // Calculate relative luminance according to WCAG 2.0
    const sRGB = rgb.map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * sRGB[0]! + 0.7152 * sRGB[1]! + 0.0722 * sRGB[2]!;
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to calculate luminance: ${e.message}`);
  }
};

const getContrastRatio = (color1: RGB | HEX, color2: RGB | HEX): number => {
  try {
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);

    // Calculate contrast ratio according to WCAG 2.0
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to calculate contrast ratio: ${e.message}`);
  }
};

const isWcagAA = (foreground: RGB | HEX, background: RGB | HEX, isLargeText: boolean = false): boolean => {
  try {
    const ratio = getContrastRatio(foreground, background);
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to check WCAG AA compliance: ${e.message}`);
  }
};

const isWcagAAA = (foreground: RGB | HEX, background: RGB | HEX, isLargeText: boolean = false): boolean => {
  try {
    const ratio = getContrastRatio(foreground, background);
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to check WCAG AAA compliance: ${e.message}`);
  }
};

// * Filters //
const lighten = (color: RGB | HEX | HSL, amount: number) => {
    try {
      const normalizedAmount = clamp(amount, 0, 100) / 100;
      
      if (typeof color === 'string') {
        const hsl = hexToHsl(color);
        const newL = Math.min(100, hsl[2] + Math.round(normalizedAmount * 100));
        return hslToHex([hsl[0], hsl[1], newL]);
      } else if (color.length === 3) {
        if (Boolean(validateOrThrow(
          color, 
          "rgb",
          'Invalid RGB value. Expected an array of 3 numbers between 0-255.'
        ))) {
          const hsl = rgbToHsl(color as RGB);
          const newL = Math.min(100, hsl[2] + Math.round(normalizedAmount * 100));
          if (Boolean(validateOrThrow(
            [hsl[0], hsl[1], newL],
            "hsl",
            'Invalid HSL value. Expected an array with h(0-360), s(0-100), l(0-100).'
          ))) {
            return hslToRgb([hsl[0], hsl[1], newL]) as typeof color;
          }
        } else if (Boolean(validateOrThrow(
          color, 
          "hsl",
          'Invalid HSL value. Expected an array with h(0-360), s(0-100), l(0-100).'
        ))) {
          const hsl = color as HSL;
          const newL = Math.min(100, hsl[2] + Math.round(normalizedAmount * 100));
          return [hsl[0], hsl[1], newL] as typeof color;
        }
      }
      
      throw new ColorConversionError('Unsupported color format for lighten function');
    } catch (e: any) {
      if (e instanceof ColorConversionError) throw e;
      throw new ColorConversionError(`Failed to lighten color: ${e.message}`);
    }
};

const darken = (color: RGB | HEX | HSL, amount: number) => {
    try {
      const normalizedAmount = clamp(amount, 0, 100) / 100;
  
      if (typeof color === 'string') {
        const hsl = hexToHsl(color);
        const newL = Math.max(0, hsl[2] - Math.round(normalizedAmount * 100));
        return hslToHex([hsl[0], hsl[1], newL]);
      } else if (color.length === 3) {
        if (Boolean(validateOrThrow(
          color, 
          "rgb",
          'Invalid RGB value. Expected an array of 3 numbers between 0-255.'
        ))) {
          const hsl = rgbToHsl(color as RGB);
          const newL = Math.max(0, hsl[2] - Math.round(normalizedAmount * 100));
          return hslToRgb([hsl[0], hsl[1], newL]) as typeof color;
        } else if (Boolean(validateOrThrow(
          color, 
          "hsl",
          'Invalid HSL value. Expected an array with h(0-360), s(0-100), l(0-100).'
        ))) {
          const hsl = color as HSL;
          const newL = Math.max(0, hsl[2] - Math.round(normalizedAmount * 100));
          return [hsl[0], hsl[1], newL] as typeof color;
        }
      }
      
      throw new ColorConversionError('Unsupported color format for darken function');
    } catch (e: any) {
      if (e instanceof ColorConversionError) throw e;
      throw new ColorConversionError(`Failed to darken color: ${e.message}`);
    }
};

const saturate = (color: RGB | HEX | HSL, amount: number) => {
    try {
      const normalizedAmount = clamp(amount, 0, 100) / 100;
      
      if (typeof color === 'string') {
        const hsl = hexToHsl(color);
        const newS = Math.min(100, hsl[1] + Math.round(normalizedAmount * 100));
        return hslToHex([hsl[0], newS, hsl[2]]);
      } else if (color.length === 3) {
        if (Boolean(validateOrThrow(
          color, 
          "rgb",
          'Invalid RGB value. Expected an array of 3 numbers between 0-255.'
        ))) {
          const hsl = rgbToHsl(color as RGB);
          const newS = Math.min(100, hsl[1] + Math.round(normalizedAmount * 100));
          return hslToRgb([hsl[0], newS, hsl[2]]) as typeof color;
        } else if (Boolean(validateOrThrow(
          color, 
          "hsl",
          'Invalid HSL value. Expected an array with h(0-360), s(0-100), l(0-100).'
        ))) {
          const hsl = color as HSL;
          const newS = Math.min(100, hsl[1] + Math.round(normalizedAmount * 100));
          return [hsl[0], newS, hsl[2]] as typeof color;
        }
      }
      
      throw new ColorConversionError('Unsupported color format for saturate function');
    } catch (e: any) {
      if (e instanceof ColorConversionError) throw e;
      throw new ColorConversionError(`Failed to saturate color: ${e.message}`);
    }
};
  
const desaturate = (color: RGB | HEX | HSL, amount: number) => {
    try {
      const normalizedAmount = clamp(amount, 0, 100) / 100;
  
      if (typeof color === 'string') {
        const hsl = hexToHsl(color);
        const newS = Math.max(0, hsl[1] - Math.round(normalizedAmount * 100));
        return hslToHex([hsl[0], newS, hsl[2]]);
      } else if (color.length === 3) {
        if (Boolean(validateOrThrow(
          color, 
          "rgb",
          'Invalid RGB value. Expected an array of 3 numbers between 0-255.'
        ))) {
          const hsl = rgbToHsl(color as RGB);
          const newS = Math.max(0, hsl[1] - Math.round(normalizedAmount * 100));
          return hslToRgb([hsl[0], newS, hsl[2]]) as typeof color;
        } else if (Boolean(validateOrThrow(
          color, 
          "hsl",
          'Invalid HSL value. Expected an array with h(0-360), s(0-100), l(0-100).'
        ))) {
          const hsl = color as HSL;
          const newS = Math.max(0, hsl[1] - Math.round(normalizedAmount * 100));
          return [hsl[0], newS, hsl[2]] as typeof color;
        }
      }
      
      throw new ColorConversionError('Unsupported color format for desaturate function');
    } catch (e: any) {
      if (e instanceof ColorConversionError) throw e;
      throw new ColorConversionError(`Failed to desaturate color: ${e.message}`);
    }
};
  
const grayscale = (color: RGB | HEX | HSL) => {
    try {
      return desaturate(color, 100);
    } catch (e: any) {
      if (e instanceof ColorConversionError) throw e;
      throw new ColorConversionError(`Failed to convert color to grayscale: ${e.message}`);
    }
};

const getSuggestedTextColor = (background: RGB | HEX) => {
  try {
    const bgLuminance = getLuminance(background);
    // Return white for dark backgrounds, black for light backgrounds
    return bgLuminance > 0.5 ? '#000000' : '#ffffff';
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to suggest text color: ${e.message}`);
  }
};

export {
    randomcolor,
    randomcolor as randomColor,
    generateColorScheme,
    getSuggestedTextColor,

    getLuminance,
    getContrastRatio,
    isWcagAA,
    isWcagAAA,
    lighten,
    lighten as lightenColor,
    darken,
    darken as darkenColor,
    saturate,
    saturate as saturateColor,
    desaturate,
    desaturate as desaturateColor,
    grayscale,
    grayscale as grayscaleColor,
};