export {};

declare global {
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

    export type ColorInput = RGB | HSL | HSV | CMYK | HEX;
    export type ColorForContrast = RGB | HEX;
}