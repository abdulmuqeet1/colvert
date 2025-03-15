declare module 'colvert' {
  export type RGB = [number, number, number];
  export type RGBA = [number, number, number, number];
  export type HSL = [number, number, number];
  export type HSV = [number, number, number];
  export type CMYK = [number, number, number, number];
  export type HEX = string;
  export type LAB = [number, number, number];
  export type LCH = [number, number, number];
  export type XYZ = [number, number, number];
  
  export interface ColorScheme {
    base: HEX;
    analogous: HEX[];
    complementary: HEX[];
    triadic: HEX[];
    tetradic: HEX[];
    monochromatic: HEX[];
    splitComplementary: HEX[];
  }

  export function rgbToHex(rgb: RGB): HEX;
  export function rgbTohex(rgb: RGB): HEX;
  export function rgbToHsl(rgb: RGB): HSL;
  export function rgbTohsl(rgb: RGB): HSL;
  export function rgbToHsv(rgb: RGB): HSV;
  export function rgbTohsv(rgb: RGB): HSV;
  export function rgbToCmyk(rgb: RGB): CMYK;
  export function rgbTocmyk(rgb: RGB): CMYK;
  export function rgbToLab(rgb: RGB): LAB;
  export function rgbToXyz(rgb: RGB): XYZ;
  export function rgbToLch(rgb: RGB): LCH;
  export function rgbaToHex(rgba: RGBA): HEX;

  export function hexTorgb(hex: HEX): RGB;
  export function hexToRgb(hex: HEX): RGB;
  export function hexToHsl(hex: HEX): HSL;
  export function hexTohsl(hex: HEX): HSL;
  export function hexToHsv(hex: HEX): HSV;
  export function hexTohsv(hex: HEX): HSV;
  export function hexToCmyk(hex: HEX): CMYK;
  export function hexTocmyk(hex: HEX): CMYK;
  export function hexToRgba(hex: HEX): RGBA;
  
  export function hslToRgb(hsl: HSL): RGB;
  export function hslTorgb(hsl: HSL): RGB;
  export function hslToHex(hsl: HSL): HEX;
  export function hslTohex(hsl: HSL): HEX;
  export function hslToHsv(hsl: HSL): HSV;
  export function hslTohsv(hsl: HSL): HSV;
  
  export function cmykToRgb(cmyk: CMYK): RGB;
  export function cmykTorgb(cmyk: CMYK): RGB;
  export function cmykToHex(cmyk: CMYK): HEX;
  export function cmykTohex(cmyk: CMYK): HEX;
  export function cmykToHsl(cmyk: CMYK): HSL;
  export function cmykTohsl(cmyk: CMYK): HSL;

  export interface RandomColorOptions {
    format?: 'hex' | 'rgb' | 'hsl';
    hue?: number | [number, number];
    saturation?: number | [number, number];
    lightness?: number | [number, number];
  }
  
  export function randomColor(options?: RandomColorOptions): HEX | RGB | HSL;
  export function randomcolor(options?: RandomColorOptions): HEX | RGB | HSL;
  export function generateColorScheme(baseColor: RGB | HEX): ColorScheme;

  export function lighten(color: RGB | HEX | HSL, amount: number): typeof color;
  export function darken(color: RGB | HEX | HSL, amount: number): typeof color;
  export function saturate(color: RGB | HEX | HSL, amount: number): typeof color;
  export function desaturate(color: RGB | HEX | HSL, amount: number): typeof color;
  export function grayscale(color: RGB | HEX | HSL): typeof color;

  export function getLuminance(color: RGB | HEX): number;
  export function getContrastRatio(color1: RGB | HEX, color2: RGB | HEX): number;
  export function isWcagAA(color1: RGB | HEX, color2: RGB | HEX): boolean;
  export function isWcagAAA(color1: RGB | HEX, color2: RGB | HEX): boolean;
  export function getSuggestedTextColor(background: RGB | HEX): HEX;
} 