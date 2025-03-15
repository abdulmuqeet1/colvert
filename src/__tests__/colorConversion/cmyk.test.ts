import { cmykToRgb, cmykToHex, cmykToHsl } from '../../colorConversion';

describe('CMYK Conversions', () => {
  describe('cmykToRgb', () => {
    test('converts primary colors to RGB', () => {
      expect(cmykToRgb([0, 100, 100, 0])).toEqual([255, 0, 0]);
      expect(cmykToRgb([100, 0, 100, 0])).toEqual([0, 255, 0]);
      expect(cmykToRgb([100, 100, 0, 0])).toEqual([0, 0, 255]);
    });

    test('converts black and white to RGB', () => {
      expect(cmykToRgb([0, 0, 0, 100])).toEqual([0, 0, 0]);
      expect(cmykToRgb([0, 0, 0, 0])).toEqual([255, 255, 255]);
    });

    test('converts mixed values to RGB', () => {
      expect(cmykToRgb([0, 0, 0, 50])).toEqual([128, 128, 128]);
      expect(cmykToRgb([0, 50, 100, 0])).toEqual([255, 128, 0]);
    });

    test('throws error for invalid CMYK values', () => {
      expect(() => cmykToRgb([-1, 0, 0, 0])).toThrow();
      expect(() => cmykToRgb([101, 0, 0, 0])).toThrow();
      expect(() => cmykToRgb([0, -1, 0, 0])).toThrow();
      expect(() => cmykToRgb([0, 101, 0, 0])).toThrow();
      expect(() => cmykToRgb([0, 0, -1, 0])).toThrow();
      expect(() => cmykToRgb([0, 0, 101, 0])).toThrow();
      expect(() => cmykToRgb([0, 0, 0, -1])).toThrow();
      expect(() => cmykToRgb([0, 0, 0, 101])).toThrow();
    });
  });

  describe('cmykToHex', () => {
    test('converts primary colors to HEX', () => {
      expect(cmykToHex([0, 100, 100, 0])).toBe('#ff0000');
      expect(cmykToHex([100, 0, 100, 0])).toBe('#00ff00');
      expect(cmykToHex([100, 100, 0, 0])).toBe('#0000ff');
    });

    test('converts black and white to HEX', () => {
      expect(cmykToHex([0, 0, 0, 100])).toBe('#000000');
      expect(cmykToHex([0, 0, 0, 0])).toBe('#ffffff');
    });

    test('converts mixed values to HEX', () => {
      expect(cmykToHex([0, 0, 0, 50])).toBe('#808080');
      expect(cmykToHex([0, 50, 100, 0])).toBe('#ff8000');
    });
  });

  describe('cmykToHsl', () => {
    test('converts primary colors to HSL', () => {
      expect(cmykToHsl([0, 100, 100, 0])).toEqual([0, 100, 50]);
      expect(cmykToHsl([100, 0, 100, 0])).toEqual([120, 100, 50]);
      expect(cmykToHsl([100, 100, 0, 0])).toEqual([240, 100, 50]);
    });

    test('converts black and white to HSL', () => {
      expect(cmykToHsl([0, 0, 0, 100])).toEqual([0, 0, 0]);
      expect(cmykToHsl([0, 0, 0, 0])).toEqual([0, 0, 100]);
    });

    test('converts mixed values to HSL', () => {
      expect(cmykToHsl([0, 0, 0, 50])).toEqual([0, 0, 50]);
      expect(cmykToHsl([0, 50, 100, 0])).toEqual([30, 100, 50]);
    });
  });
}); 