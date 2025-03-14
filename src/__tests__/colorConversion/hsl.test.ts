import { hslToRgb, hslToHex, hslToHsv } from '../../colorConversion';

describe('HSL Conversions', () => {
  describe('hslToRgb', () => {
    test('converts primary colors to RGB', () => {
      expect(hslToRgb([0, 100, 50])).toEqual([255, 0, 0]);
      expect(hslToRgb([120, 100, 50])).toEqual([0, 255, 0]);
      expect(hslToRgb([240, 100, 50])).toEqual([0, 0, 255]);
    });

    test('converts grayscale values to RGB', () => {
      expect(hslToRgb([0, 0, 0])).toEqual([0, 0, 0]);
      expect(hslToRgb([0, 0, 50])).toEqual([128, 128, 128]);
      expect(hslToRgb([0, 0, 100])).toEqual([255, 255, 255]);
    });

    test('converts mixed values to RGB', () => {
      expect(hslToRgb([30, 100, 50])).toEqual([255, 128, 0]);
      expect(hslToRgb([300, 100, 25])).toEqual([128, 0, 128]);
    });

    test('throws error for invalid HSL values', () => {
      expect(() => hslToRgb([-1, 100, 50])).toThrow();
      expect(() => hslToRgb([361, 100, 50])).toThrow();
      expect(() => hslToRgb([0, -1, 50])).toThrow();
      expect(() => hslToRgb([0, 101, 50])).toThrow();
      expect(() => hslToRgb([0, 100, -1])).toThrow();
      expect(() => hslToRgb([0, 100, 101])).toThrow();
    });
  });

  describe('hslToHex', () => {
    test('converts primary colors to HEX', () => {
      expect(hslToHex([0, 100, 50])).toBe('#ff0000');
      expect(hslToHex([120, 100, 50])).toBe('#00ff00');
      expect(hslToHex([240, 100, 50])).toBe('#0000ff');
    });

    test('converts grayscale values to HEX', () => {
      expect(hslToHex([0, 0, 0])).toBe('#000000');
      expect(hslToHex([0, 0, 50])).toBe('#808080');
      expect(hslToHex([0, 0, 100])).toBe('#ffffff');
    });

    test('converts mixed values to HEX', () => {
      expect(hslToHex([30, 100, 50])).toBe('#ff8000');
      expect(hslToHex([300, 100, 25])).toBe('#800080');
    });
  });

  describe('hslToHsv', () => {
    test('converts primary colors to HSV', () => {
      expect(hslToHsv([0, 100, 50])).toEqual([0, 100, 100]);
      expect(hslToHsv([120, 100, 50])).toEqual([120, 100, 100]);
      expect(hslToHsv([240, 100, 50])).toEqual([240, 100, 100]);
    });

    test('converts grayscale values to HSV', () => {
      expect(hslToHsv([0, 0, 0])).toEqual([0, 0, 0]);
      expect(hslToHsv([0, 0, 50])).toEqual([0, 0, 50]);
      expect(hslToHsv([0, 0, 100])).toEqual([0, 0, 100]);
    });
  });

}); 