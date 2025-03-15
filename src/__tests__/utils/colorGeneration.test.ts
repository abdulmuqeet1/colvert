import { randomcolor, generateColorScheme } from '../../utils';

describe('Color Generation Utils', () => {
  describe('randomcolor', () => {
    test('generates random HEX color by default', () => {
      const color = randomcolor();
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });

    test('generates random RGB color', () => {
      const color = randomcolor({ format: 'rgb' });
      expect(Array.isArray(color)).toBe(true);
      expect(color).toHaveLength(3);
      (color as number[]).forEach(value => {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(255);
      });
    });

    test('generates random HSL color', () => {
      const color = randomcolor({ format: 'hsl' });
      expect(Array.isArray(color)).toBe(true);
      expect(color).toHaveLength(3);
      expect(color[0]).toBeGreaterThanOrEqual(0);
      expect(color[0]).toBeLessThanOrEqual(360);
      expect(color[1]).toBeGreaterThanOrEqual(0);
      expect(color[1]).toBeLessThanOrEqual(100);
      expect(color[2]).toBeGreaterThanOrEqual(0);
      expect(color[2]).toBeLessThanOrEqual(100);
    });
  });

  describe('generateColorScheme', () => {
    test('generates color scheme from HEX color', () => {
      const scheme = generateColorScheme('#ff0000');
      expect(scheme).toEqual({
        base: '#ff0000',
        analogous: expect.arrayContaining([
          expect.stringMatching(/^#[0-9A-F]{6}$/i),
          expect.stringMatching(/^#[0-9A-F]{6}$/i)
        ]),
        complementary: expect.arrayContaining([
          expect.stringMatching(/^#[0-9A-F]{6}$/i)
        ]),
        triadic: expect.arrayContaining([
          expect.stringMatching(/^#[0-9A-F]{6}$/i),
          expect.stringMatching(/^#[0-9A-F]{6}$/i)
        ]),
        tetradic: expect.arrayContaining([
          expect.stringMatching(/^#[0-9A-F]{6}$/i),
          expect.stringMatching(/^#[0-9A-F]{6}$/i),
          expect.stringMatching(/^#[0-9A-F]{6}$/i)
        ]),
        monochromatic: expect.arrayContaining([
          expect.stringMatching(/^#[0-9A-F]{6}$/i),
          expect.stringMatching(/^#[0-9A-F]{6}$/i),
          expect.stringMatching(/^#[0-9A-F]{6}$/i),
          expect.stringMatching(/^#[0-9A-F]{6}$/i)
        ]),
        splitComplementary: expect.arrayContaining([
          expect.stringMatching(/^#[0-9A-F]{6}$/i),
          expect.stringMatching(/^#[0-9A-F]{6}$/i)
        ])
      });
    });

    test('generates color scheme from RGB color', () => {
      const scheme = generateColorScheme([255, 0, 0]);
      expect(scheme.base).toBe('#ff0000');
      expect(scheme.analogous).toHaveLength(2);
      expect(scheme.complementary).toHaveLength(1);
      expect(scheme.triadic).toHaveLength(2);
      expect(scheme.tetradic).toHaveLength(3);
      expect(scheme.monochromatic).toHaveLength(4);
      expect(scheme.splitComplementary).toHaveLength(2);
    });

    test('handles invalid input', () => {
      expect(() => generateColorScheme('invalid')).toThrow();
      expect(() => generateColorScheme([256, 0, 0])).toThrow();
      expect(() => generateColorScheme([0, -1, 0])).toThrow();
    });

    test('generates consistent schemes for same input', () => {
      const scheme1 = generateColorScheme('#ff0000');
      const scheme2 = generateColorScheme('#ff0000');
      expect(scheme1).toEqual(scheme2);
    });
  });
}); 