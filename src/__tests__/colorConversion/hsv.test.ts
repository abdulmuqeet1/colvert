// import { hsvToRgb, hsvToHex, hsvToHsl, hsvToCmyk } from '../../colorConversion';

// describe('HSV Conversions', () => {
//   describe('hsvToRgb', () => {
//     test('converts primary colors to RGB', () => {
//       expect(hsvToRgb([0, 100, 100])).toEqual([255, 0, 0]);
//       expect(hsvToRgb([120, 100, 100])).toEqual([0, 255, 0]);
//       expect(hsvToRgb([240, 100, 100])).toEqual([0, 0, 255]);
//     });

//     test('converts grayscale values to RGB', () => {
//       expect(hsvToRgb([0, 0, 0])).toEqual([0, 0, 0]);
//       expect(hsvToRgb([0, 0, 50])).toEqual([128, 128, 128]);
//       expect(hsvToRgb([0, 0, 100])).toEqual([255, 255, 255]);
//     });

//     test('converts mixed values to RGB', () => {
//       expect(hsvToRgb([30, 100, 100])).toEqual([255, 128, 0]);
//       expect(hsvToRgb([300, 100, 50])).toEqual([128, 0, 128]);
//     });

//     test('throws error for invalid HSV values', () => {
//       expect(() => hsvToRgb([-1, 100, 100])).toThrow();
//       expect(() => hsvToRgb([361, 100, 100])).toThrow();
//       expect(() => hsvToRgb([0, -1, 100])).toThrow();
//       expect(() => hsvToRgb([0, 101, 100])).toThrow();
//       expect(() => hsvToRgb([0, 100, -1])).toThrow();
//       expect(() => hsvToRgb([0, 100, 101])).toThrow();
//     });
//   });

//   describe('hsvToHex', () => {
//     test('converts primary colors to HEX', () => {
//       expect(hsvToHex([0, 100, 100])).toBe('#ff0000');
//       expect(hsvToHex([120, 100, 100])).toBe('#00ff00');
//       expect(hsvToHex([240, 100, 100])).toBe('#0000ff');
//     });

//     test('converts grayscale values to HEX', () => {
//       expect(hsvToHex([0, 0, 0])).toBe('#000000');
//       expect(hsvToHex([0, 0, 50])).toBe('#808080');
//       expect(hsvToHex([0, 0, 100])).toBe('#ffffff');
//     });

//     test('converts mixed values to HEX', () => {
//       expect(hsvToHex([30, 100, 100])).toBe('#ff8000');
//       expect(hsvToHex([300, 100, 50])).toBe('#800080');
//     });
//   });

//   describe('hsvToHsl', () => {
//     test('converts primary colors to HSL', () => {
//       expect(hsvToHsl([0, 100, 100])).toEqual([0, 100, 50]);
//       expect(hsvToHsl([120, 100, 100])).toEqual([120, 100, 50]);
//       expect(hsvToHsl([240, 100, 100])).toEqual([240, 100, 50]);
//     });

//     test('converts grayscale values to HSL', () => {
//       expect(hsvToHsl([0, 0, 0])).toEqual([0, 0, 0]);
//       expect(hsvToHsl([0, 0, 50])).toEqual([0, 0, 50]);
//       expect(hsvToHsl([0, 0, 100])).toEqual([0, 0, 100]);
//     });

//     test('converts mixed values to HSL', () => {
//       expect(hsvToHsl([30, 100, 100])).toEqual([30, 100, 50]);
//       expect(hsvToHsl([300, 100, 50])).toEqual([300, 100, 25]);
//     });
//   });

//   describe('hsvToCmyk', () => {
//     test('converts primary colors to CMYK', () => {
//       expect(hsvToCmyk([0, 100, 100])).toEqual([0, 100, 100, 0]);
//       expect(hsvToCmyk([120, 100, 100])).toEqual([100, 0, 100, 0]);
//       expect(hsvToCmyk([240, 100, 100])).toEqual([100, 100, 0, 0]);
//     });

//     test('converts black and white to CMYK', () => {
//       expect(hsvToCmyk([0, 0, 0])).toEqual([0, 0, 0, 100]);
//       expect(hsvToCmyk([0, 0, 100])).toEqual([0, 0, 0, 0]);
//     });

//     test('converts mixed values to CMYK', () => {
//       expect(hsvToCmyk([0, 0, 50])).toEqual([0, 0, 0, 50]);
//     });
//   });
// }); 