import { hexToRgb, hexToHsl, hexToHsv, hexToCmyk } from '../../colorConversion';

describe('HEX Conversions', () => {
  describe('hexToRgb', () => {
    test('converts basic HEX values to RGB', () => {
      expect(hexToRgb('#ff0000')).toEqual([255, 0, 0]);
      expect(hexToRgb('#00ff00')).toEqual([0, 255, 0]);
      expect(hexToRgb('#0000ff')).toEqual([0, 0, 255]);
    });

    test('converts shorthand HEX values to RGB', () => {
      expect(hexToRgb('#f00')).toEqual([255, 0, 0]);
      expect(hexToRgb('#0f0')).toEqual([0, 255, 0]);
      expect(hexToRgb('#00f')).toEqual([0, 0, 255]);
    });

    test('converts grayscale HEX values to RGB', () => {
      expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
      expect(hexToRgb('#808080')).toEqual([128, 128, 128]);
      expect(hexToRgb('#ffffff')).toEqual([255, 255, 255]);
    });

    test('handles HEX values with/without hash', () => {
      expect(hexToRgb('ff0000')).toEqual([255, 0, 0]);
      expect(hexToRgb('#ff0000')).toEqual([255, 0, 0]);
    });

    test('throws error for invalid HEX values', () => {
      expect(() => hexToRgb('invalid')).toThrow();
      expect(() => hexToRgb('#gggggg')).toThrow();
      expect(() => hexToRgb('#ff00')).toThrow();
    });
  });

  describe('hexToHsl', () => {
    test('converts primary colors to HSL', () => {
      expect(hexToHsl('#ff0000')).toEqual([0, 100, 50]);
      expect(hexToHsl('#00ff00')).toEqual([120, 100, 50]);
      expect(hexToHsl('#0000ff')).toEqual([240, 100, 50]);
    });

    test('converts grayscale values to HSL', () => {
      expect(hexToHsl('#000000')).toEqual([0, 0, 0]);
      expect(hexToHsl('#808080')).toEqual([0, 0, 50]);
      expect(hexToHsl('#ffffff')).toEqual([0, 0, 100]);
    });

    test('converts mixed colors to HSL', () => {
      expect(hexToHsl('#ff8000')).toEqual([30, 100, 50]);
      expect(hexToHsl('#800080')).toEqual([300, 100, 25]);
    });
  });

  describe('hexToHsv', () => {
    test('converts primary colors to HSV', () => {
      expect(hexToHsv('#ff0000')).toEqual([0, 100, 100]);
      expect(hexToHsv('#00ff00')).toEqual([120, 100, 100]);
      expect(hexToHsv('#0000ff')).toEqual([240, 100, 100]);
    });

    test('converts grayscale values to HSV', () => {
      expect(hexToHsv('#000000')).toEqual([0, 0, 0]);
      expect(hexToHsv('#808080')).toEqual([0, 0, 50]);
      expect(hexToHsv('#ffffff')).toEqual([0, 0, 100]);
    });
  });

  describe('hexToCmyk', () => {
    test('converts primary colors to CMYK', () => {
      expect(hexToCmyk('#ff0000')).toEqual([0, 100, 100, 0]);
      expect(hexToCmyk('#00ff00')).toEqual([100, 0, 100, 0]);
      expect(hexToCmyk('#0000ff')).toEqual([100, 100, 0, 0]);
    });

    test('converts black and white to CMYK', () => {
      expect(hexToCmyk('#000000')).toEqual([0, 0, 0, 100]);
      expect(hexToCmyk('#ffffff')).toEqual([0, 0, 0, 0]);
    });

    test('converts mixed values to CMYK', () => {
      expect(hexToCmyk('#808080')).toEqual([0, 0, 0, 50]);
    });
  });
}); 