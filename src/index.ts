import { RGB, RGBA } from "./@types";
import { clamp, validateOrThrow, ColorConversionError } from "./utils";
/////////////////////////
/// rgb --> others //////
/////////////////////////

const rgbToHexConversion = (num: number): string => {
  let hexv = Math.round(clamp(num, 0, 255)).toString(16);
  if (hexv.length < 2) {
    hexv = "0" + hexv;
  }
  return hexv;
};

const rgbTohex = (rgb: number[]) => { // TODO: update name to rgbToHex & and check backward compatibility compatibility
  try {
    const validRgb = validateOrThrow(
      rgb, 
      "rgb",
      'Invalid RGB value. Expected an array of 3 numbers between 0-255.'
    ) as number[];
    
    const r = rgbToHexConversion(validRgb[0]);
    const g = rgbToHexConversion(validRgb[1]);
    const b = rgbToHexConversion(validRgb[2]);

    return `#${r}${g}${b}`;
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert RGB to Hex: ${e.message}`);
  }
};

const rgbTohsl = (rgb: number[]) => { // TODO: update name to rgbToHsl & and check backward compatibility compatibility
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

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
  } catch (e: any) {
    if (e instanceof ColorConversionError) throw e;
    throw new ColorConversionError(`Failed to convert RGB to HSL: ${e.message}`);
  }
};

const rgbTohsv = (rgb: number[]) => { // TODO: update name to rgbToHsv & and check backward compatibility compatibility
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

const rgbTocmyk = (rgb: number[]) => { // TODO: check and update
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

export const rgbaToHex = (rgba: RGBA) => {
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

/////////////////////////
/// hex --> others //////
/////////////////////////
const hexTorgb = (hex: string) => {
  // const match = hex.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  const match = hex.toString().match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match) {
    return [0, 0, 0];
  }

  let colorString = match[0];

  if (match[0].length === 3) {
    colorString = colorString
      .split("")
      .map((char) => {
        return char + char;
      })
      .join("");
  }

  const integer = parseInt(colorString, 16);
  const r = (integer >> 16) & 0xff;
  const g = (integer >> 8) & 0xff;
  const b = integer & 0xff;

  return [r, g, b];
};
const hexTohsl = (hex: string) => {
  return rgbTohsl(hexTorgb(hex));
};
const hexTohsv = (hex: string) => {
  return rgbTohsv(hexTorgb(hex));
};

const hexTocmyk = (hex: string) => {
  return rgbTocmyk(hexTorgb(hex));
};

const hslTorgb = (hsl: number[]) => {
  const h = hsl[0] / 360;
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  let t2;
  let t3;
  let val;

  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  const t1 = 2 * l - t2;

  const rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    t3 = h + (1 / 3) * -(i - 1);
    if (t3 < 0) {
      t3++;
    }

    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val * 255;
  }

  return rgb;
};

const hslTohex = (hsl: number[]) => {
  return rgbTohex(hslTorgb(hsl));
};

const hslTohsv = (hsl: number[]) => {
  return rgbTohsv(hslTorgb(hsl));
};

// need revision - inaccurate results
const cmykTorgb = (cmyk: number[]) => {
  const c = cmyk[0] / 100;
  const m = cmyk[1] / 100;
  const y = cmyk[2] / 100;
  const k = cmyk[3] / 100;

  const rgb01 = [
    Math.round((1 - Math.min(1, c * (1 - k) + k)) * 100),
    Math.round((1 - Math.min(1, m * (1 - k) + k)) * 100),
    Math.round((1 - Math.min(1, y * (1 - k) + k)) * 100),
  ];
  return rgb01;
};

const cmykTohex = (cmyk: number[]) => {
  return rgbTohex(cmykTorgb(cmyk));
};

const cmykTohsl = (cmyk: number[]) => {
  return rgbTohsl(cmykTorgb(cmyk));
};

const randomcolor = () => {
  const alphabet = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += alphabet[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default {
  rgbTohsl,
  rgbTohex,
  rgbTohsv,
  rgbTocmyk,

  hexTorgb,
  hexTohsl,
  hexTohsv,
  hexTocmyk,

  hslTorgb,
  hslTohex,
  hslTohsv,

  cmykTorgb,
  cmykTohex,
  cmykTohsl,

  randomcolor,
};
