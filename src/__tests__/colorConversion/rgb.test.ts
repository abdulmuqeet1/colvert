import { rgbToHex, rgbToHsl, rgbToHsv, rgbToCmyk } from '../../colorConversion';

describe('RGB Conversions', () => {
  describe('rgbToHex', () => {
    test('converts basic RGB values to HEX', () => {
      expect(rgbToHex([255, 0, 0])).toBe('#ff0000');
      expect(rgbToHex([0, 255, 0])).toBe('#00ff00');
      expect(rgbToHex([0, 0, 255])).toBe('#0000ff');
    });

    test('converts grayscale RGB values to HEX', () => {
      expect(rgbToHex([0, 0, 0])).toBe('#000000');
      expect(rgbToHex([128, 128, 128])).toBe('#808080');
      expect(rgbToHex([255, 255, 255])).toBe('#ffffff');
    });

    test('handles decimal RGB values', () => {
      expect(rgbToHex([128.4, 0, 0])).toBe('#800000');
      expect(rgbToHex([0, 128.6, 0])).toBe('#008100');
    });

    test('throws error for invalid RGB values', () => {
      expect(() => rgbToHex([-1, 0, 0])).toThrow();
      expect(() => rgbToHex([256, 0, 0])).toThrow();
      expect(() => rgbToHex([0, -1, 0])).toThrow();
      expect(() => rgbToHex([0, 256, 0])).toThrow();
    });
  });

  describe('rgbToHsl', () => {
    test('converts primary colors to HSL', () => {
      expect(rgbToHsl([255, 0, 0])).toEqual([0, 100, 50]);
      expect(rgbToHsl([0, 255, 0])).toEqual([120, 100, 50]);
      expect(rgbToHsl([0, 0, 255])).toEqual([240, 100, 50]);
    });

    test('converts grayscale values to HSL', () => {
      expect(rgbToHsl([0, 0, 0])).toEqual([0, 0, 0]);
      expect(rgbToHsl([128, 128, 128])).toEqual([0, 0, 50]);
      expect(rgbToHsl([255, 255, 255])).toEqual([0, 0, 100]);
    });

    test('converts mixed RGB values to HSL', () => {
      expect(rgbToHsl([255, 128, 0])).toEqual([30, 100, 50]);
      expect(rgbToHsl([128, 0, 128])).toEqual([300, 100, 25]);
    });
  });

  describe('rgbToHsv', () => {
    test('converts primary colors to HSV', () => {
      expect(rgbToHsv([255, 0, 0])).toEqual([0, 100, 100]);
      expect(rgbToHsv([0, 255, 0])).toEqual([120, 100, 100]);
      expect(rgbToHsv([0, 0, 255])).toEqual([240, 100, 100]);
    });

    test('converts grayscale values to HSV', () => {
      expect(rgbToHsv([0, 0, 0])).toEqual([0, 0, 0]);
      expect(rgbToHsv([128, 128, 128])).toEqual([0, 0, 50]);
      expect(rgbToHsv([255, 255, 255])).toEqual([0, 0, 100]);
    });
  });

  describe('rgbToCmyk', () => {
    test('converts primary colors to CMYK', () => {
      expect(rgbToCmyk([255, 0, 0])).toEqual([0, 100, 100, 0]);
      expect(rgbToCmyk([0, 255, 0])).toEqual([100, 0, 100, 0]);
      expect(rgbToCmyk([0, 0, 255])).toEqual([100, 100, 0, 0]);
    });

    test('converts black and white to CMYK', () => {
      expect(rgbToCmyk([0, 0, 0])).toEqual([0, 0, 0, 100]);
      expect(rgbToCmyk([255, 255, 255])).toEqual([0, 0, 0, 0]);
    });

    test('converts mixed values to CMYK', () => {
      expect(rgbToCmyk([128, 128, 128])).toEqual([0, 0, 0, 50]);
    });
  });
}); 