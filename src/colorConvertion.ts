import { clamp, validateOrThrow, ColorConversionError } from "./helper";

// * RGB ///
const rgbToHexConversion = (num: number): string => {
  let hexv = Math.round(clamp(num, 0, 255)).toString(16);
  if (hexv.length < 2) {
    hexv = "0" + hexv;
  }
  return hexv;
};

const rgbTohex = (rgb: RGB) => { // TODO: update name to rgbToHex
  try {
    const validRgb = validateOrThrow(
      rgb, 
      "rgb",
      'Invalid RGB value. Expected an array of 3 numbers between 0-255.'
    ) as RGB;

    const r = rgbToHexConversion(validRgb[0]);
    const g = rgbToHexConversion(validRgb[1]);
    const b = rgbToHexConversion(validRgb[2]);

    return `#${r}${g}${b}`;
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert RGB to Hex: ${e.message}`);
  }
};

const rgbTohsl = (rgb: RGB): HSL => { // TODO: update name to rgbToHsl
  try {
    const validRgb = validateOrThrow<RGB>(
      rgb, 
      'rgb', 
      'Invalid RGB value. Expected an array of 3 numbers between 0-255.'
    );
    
    const r = validRgb[0] / 255;
    const g = validRgb[1] / 255;
    const b = validRgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    
    let h = 0;
    let s = 0;
    let l = (min + max) / 2;

    if (max !== min) {
      s = l <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
      
      if (r === max) {
        h = (g - b) / delta + (g < b ? 6 : 0);
      } else if (g === max) {
        h = (b - r) / delta + 2;
      } else if (b === max) {
        h = (r - g) / delta + 4;
      }
      
      h *= 60;
    }

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)] as HSL;
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert RGB to HSL: ${e.message}`);
  }
};

const rgbTohsv = (rgb: RGB) => { // TODO: update name to rgbToHsv
  try {
    const validRgb = validateOrThrow<RGB>(
      rgb, 
      'rgb',
      'Invalid RGB value. Expected an array of 3 numbers between 0-255.'
    );
    
    const r = validRgb[0] / 255;
    const g = validRgb[1] / 255;
    const b = validRgb[2] / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    let h = 0;
    let s = max === 0 ? 0 : delta / max;
    let v = max;

    if (delta !== 0) {
      if (max === r) {
        h = ((g - b) / delta) % 6;
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }
      
      h *= 60;
      if (h < 0) h += 360;
    }

    return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert RGB to HSV: ${e.message}`);
  }
};

const rgbTocmyk = (rgb: RGB) => { // TODO: update name
  try {
    const validRgb = validateOrThrow<RGB>(
      rgb, 
      'rgb',
      'Invalid RGB value. Expected an array of 3 numbers between 0-255.'
    );

    const r = validRgb[0] / 255;
    const g = validRgb[1] / 255;
    const b = validRgb[2] / 255;
    
    if (r === 0 && g === 0 && b === 0) {
      return [0, 0, 0, 100];
    }

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return [
      Math.round(c * 100),
      Math.round(m * 100),
      Math.round(y * 100),
      Math.round(k * 100)
    ];
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert RGB to CMYK: ${e.message}`);
  }
};

const rgbaToHex = (rgba: RGBA) => {
  try {
    const validRgba = validateOrThrow<RGBA>(
      rgba, 
      "rgba", 
      'Invalid RGBA value. Expected an array of 4 numbers, RGB between 0-255 and alpha between 0-1.'
    );
    
    const r = rgbToHexConversion(validRgba[0]);
    const g = rgbToHexConversion(validRgba[1]);
    const b = rgbToHexConversion(validRgba[2]);
    const a = rgbToHexConversion(Math.round(validRgba[3] * 255));

    return `#${r}${g}${b}${a}`;
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert RGBA to Hex: ${e.message}`);
  }
};

// * HEX ////
const hexTorgb = (hex: HEX): RGB => { // TODO: update name
  try {
    const validHex = validateOrThrow<HEX>(
      hex, 
      'hex',
      'Invalid HEX value. Expected a string in format #RGB, #RGBA, #RRGGBB, or #RRGGBBAA.'
    );
    
    // Remove the hash at the start if present
    let cleanHex = validHex.replace(/^#/, '');
    
    // Convert 3-digit hex to 6-digit
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(char => char + char).join('');
    }
    
    // Handle only RGB part for RGBA hex
    if (cleanHex.length === 8) {
      cleanHex = cleanHex.substring(0, 6);
    } else if (cleanHex.length === 4) {
      cleanHex = cleanHex.substring(0, 3);
      cleanHex = cleanHex.split('').map(char => char + char).join('');
    }
    
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    
    return [r, g, b];
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert HEX to RGB: ${e.message}`);
  }
};

const hexTohsl = (hex: HEX): HSL => { // TODO: update name
  try {
    const validHex = validateOrThrow<HEX>(
      hex, 
      'hex', 
      'Invalid HEX value. Expected a string in format #RGB, #RGBA, #RRGGBB, or #RRGGBBAA.'
    );
    
    const rgb = hexTorgb(validHex);
    return rgbTohsl(rgb);
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert HEX to HSL: ${e.message}`);
  }
};

const hexTohsv = (hex: HEX) => { // TODO: update name
  try {
    const validHex = validateOrThrow<HEX>(
      hex, 
      'hex', 
      'Invalid HEX value. Expected a string in format #RGB, #RGBA, #RRGGBB, or #RRGGBBAA.'
    );
    
    const rgb = hexTorgb(validHex);
    return rgbTohsv(rgb);
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert HEX to HSV: ${e.message}`);
  }
};

const hexTocmyk = (hex: HEX) => { // TODO: update name
  try {
    const validHex = validateOrThrow<HEX>(
      hex, 
      'hex', 
      'Invalid HEX value. Expected a string in format #RGB, #RGBA, #RRGGBB, or #RRGGBBAA.'
    );
    
    const rgb = hexTorgb(validHex);
    return rgbTocmyk(rgb);
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert HEX to CMYK: ${e.message}`);
  }
};

const hexToRgba = (hex: HEX) => {
  try {
    const validHex = validateOrThrow<HEX>(
      hex, 
      'hex', 
      'Invalid HEX value. Expected a string in format #RGB, #RGBA, #RRGGBB, or #RRGGBBAA.'
    );
    
    // Remove the hash at the start if present
    let cleanHex = validHex.replace(/^#/, '');
    
    // Handle different hex formats
    if (cleanHex.length === 3) {
      // Convert #RGB to #RRGGBB
      cleanHex = cleanHex.split('').map(char => char + char).join('');
      // Add full alpha
      cleanHex += 'FF';
    } else if (cleanHex.length === 4) {
      // Convert #RGBA to #RRGGBBAA
      cleanHex = cleanHex.split('').map(char => char + char).join('');
    } else if (cleanHex.length === 6) {
      // Add full alpha to #RRGGBB
      cleanHex += 'FF';
    }
    
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 24) & 255;
    const g = (bigint >> 16) & 255;
    const b = (bigint >> 8) & 255;
    const a = (bigint & 255) / 255;
    
    return [r, g, b, parseFloat(a.toFixed(2))];
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert HEX to RGBA: ${e.message}`);
  }
};

// * HSL /////
const hslTorgb = (hsl: HSL) => { // TODO: update name
  try {
    const validHsl = validateOrThrow<HSL>(
      hsl, 
      'hsl', 
      'Invalid HSL value. Expected an array with h(0-360), s(0-100), l(0-100).'
    );
    
    const h = validHsl[0] / 360;
    const s = validHsl[1] / 100;
    const l = validHsl[2] / 100;
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    ];
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert HSL to RGB: ${e.message}`);
  }
};

const hslTohex = (hsl: HSL) => { // TODO: update name
  try {
    const validHsl = validateOrThrow<HSL>(
      hsl, 
      'hsl',
      'Invalid HSL value. Expected an array with h(0-360), s(0-100), l(0-100).'
    );
    
    const rgb = hslTorgb(validHsl);
    return rgbTohex(rgb as RGB);
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert HSL to HEX: ${e.message}`);
  }
};

const hslTohsv = (hsl: HSL) => { // TODO: update name
  try {
    const validHsl = validateOrThrow<HSL>(
      hsl, 
      'hsl',
      'Invalid HSL value. Expected an array with h(0-360), s(0-100), l(0-100).'
    );
    
    const h = validHsl[0];
    const s = validHsl[1] / 100;
    const l = validHsl[2] / 100;
    
    let v = l + s * Math.min(l, 1 - l);
    let sv = v === 0 ? 0 : 2 * (1 - l / v);
    
    return [h, Math.round(sv * 100), Math.round(v * 100)];
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert HSL to HSV: ${e.message}`);
  }
};

// * CYMK /// 
// need revision - inaccurate results
const cmykTorgb = (cmyk: CMYK) => { // TODO: update name
  try {
    const validCmyk = validateOrThrow<CMYK>(
      cmyk, 
      'cymk', 
      'Invalid CMYK value. Expected an array with c,m,y,k values between 0-100.'
    );
    
    const c = validCmyk[0] / 100;
    const m = validCmyk[1] / 100;
    const y = validCmyk[2] / 100;
    const k = validCmyk[3] / 100;
    
    const r = Math.round(255 * (1 - c) * (1 - k));
    const g = Math.round(255 * (1 - m) * (1 - k));
    const b = Math.round(255 * (1 - y) * (1 - k));
    
    return [r, g, b];
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert CMYK to RGB: ${e.message}`);
  }
};

const cmykTohex = (cmyk: CMYK) => { // TODO: update name
  try {
    const validCmyk = validateOrThrow<CMYK>(
      cmyk, 
      'cymk', 
      'Invalid CMYK value. Expected an array with c,m,y,k values between 0-100.'
    );
    
    const rgb = cmykTorgb(validCmyk);
    return rgbTohex(rgb as RGB);
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert CMYK to HEX: ${e.message}`);
  }
};

const cmykTohsl = (cmyk: CMYK) => { // TODO: update name
  try {
    const validCmyk = validateOrThrow<CMYK>(
      cmyk, 
      'hsl', 
      'Invalid CMYK value. Expected an array with c,m,y,k values between 0-100.'
    );
    
    const rgb = cmykTorgb(validCmyk);
    return rgbTohsl(rgb as RGB);
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert CMYK to HSL: ${e.message}`);
  }
};

export {
  rgbTohsl,
  rgbTohsl as rgbToHsl,
  rgbTohex,
  rgbTohex as rgbToHex,
  rgbTohsv,
  rgbTohsv as rgbToHsv,
  rgbTocmyk,
  rgbTocmyk as rgbToCmyk,
  rgbaToHex,

  hexTorgb,
  hexTorgb as hexToRgb,
  hexTohsl,
  hexTohsl as hexToHsl,
  hexTohsv,
  hexTohsv as hexToHsv,
  hexTocmyk,
  hexTocmyk as hexToCmyk,
  hexToRgba,

  hslTorgb,
  hslTorgb as hslToRgb,
  hslTohex,
  hslTohex as hslToHex,
  hslTohsv,
  hslTohsv as hslToHsv,

  cmykTorgb,
  cmykTorgb as cmykToRgb,
  cmykTohex,
  cmykTohex as cmykToHex,
  cmykTohsl,
  cmykTohsl as cmykToHsl,
};
