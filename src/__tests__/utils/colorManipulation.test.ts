import { lighten, darken, saturate, desaturate} from '../../utils';

describe('Color Manipulation Utils', () => {
  describe('lighten', () => {
    test('lightens HEX colors', () => {
      expect(lighten('#000000', 50)).toBe('#808080');
      expect(lighten('#ff0000', 20)).toBe('#ff3333');
      expect(lighten('#000000', 100)).toBe('#ffffff');
    });

    test('lightens RGB colors', () => {
      expect(lighten([0, 0, 0], 50)).toEqual([128, 128, 128]);
      expect(lighten([255, 0, 0], 20)).toEqual([255, 51, 51]);
      expect(lighten([0, 0, 0], 100)).toEqual([255, 255, 255]);
    });

    test('handles invalid amount values', () => {
      expect(() => lighten('#000000', -1)).toThrow();
      expect(() => lighten('#000000', 101)).toThrow();
    });
  });

  describe('darken', () => {
    test('darkens HEX colors', () => {
      expect(darken('#ffffff', 50)).toBe('#808080');
      expect(darken('#ff0000', 20)).toBe('#cc0000');
      expect(darken('#ffffff', 100)).toBe('#000000');
    });

    test('darkens RGB colors', () => {
      expect(darken([255, 255, 255], 50)).toEqual([128, 128, 128]);
      expect(darken([255, 0, 0], 20)).toEqual([204, 0, 0]);
      expect(darken([255, 255, 255], 100)).toEqual([0, 0, 0]);
    });

    test('handles invalid amount values', () => {
      expect(() => darken('#ffffff', -1)).toThrow();
      expect(() => darken('#ffffff', 101)).toThrow();
    });
  });

  describe('saturate', () => {
    test('saturates HEX colors', () => {
      expect(saturate('#808080', 50)).toBe('#bf4040');
      expect(saturate('#ff0000', 20)).toBe('#ff0000'); // Already fully saturated
    });

    test('saturates RGB colors', () => {
      expect(saturate([128, 128, 128], 50)).toEqual([191, 64, 64]);
      expect(saturate([255, 0, 0], 20)).toEqual([255, 0, 0]); // Already fully saturated
    });

    test('handles invalid amount values', () => {
      expect(() => saturate('#808080', -1)).toThrow();
      expect(() => saturate('#808080', 101)).toThrow();
    });
  });

  describe('desaturate', () => {
    test('desaturates HEX colors', () => {
      expect(desaturate('#ff0000', 50)).toBe('#bf4040');
      expect(desaturate('#808080', 20)).toBe('#808080'); // Already fully desaturated
    });

    test('desaturates RGB colors', () => {
      expect(desaturate([255, 0, 0], 50)).toEqual([191, 64, 64]);
      expect(desaturate([128, 128, 128], 20)).toEqual([128, 128, 128]); // Already fully desaturated
    });

    test('handles invalid amount values', () => {
      expect(() => desaturate('#ff0000', -1)).toThrow();
      expect(() => desaturate('#ff0000', 101)).toThrow();
    });
  });

  // describe('invert', () => {
  //   test('inverts HEX colors', () => {
  //     expect(invert('#000000')).toBe('#ffffff');
  //     expect(invert('#ffffff')).toBe('#000000');
  //     expect(invert('#ff0000')).toBe('#00ffff');
  //   });

  //   test('inverts RGB colors', () => {
  //     expect(invert([0, 0, 0])).toEqual([255, 255, 255]);
  //     expect(invert([255, 255, 255])).toEqual([0, 0, 0]);
  //     expect(invert([255, 0, 0])).toEqual([0, 255, 255]);
  //   });
  // });

  // describe('mix', () => {
  //   test('mixes two HEX colors', () => {
  //     expect(mix('#ff0000', '#0000ff', 50)).toBe('#800080');
  //     expect(mix('#ff0000', '#0000ff', 25)).toBe('#bf0040');
  //     expect(mix('#ff0000', '#0000ff', 75)).toBe('#4000bf');
  //   });

  //   test('mixes two RGB colors', () => {
  //     expect(mix([255, 0, 0], [0, 0, 255], 50)).toEqual([128, 0, 128]);
  //     expect(mix([255, 0, 0], [0, 0, 255], 25)).toEqual([191, 0, 64]);
  //     expect(mix([255, 0, 0], [0, 0, 255], 75)).toEqual([64, 0, 191]);
  //   });

  //   test('handles invalid weight values', () => {
  //     expect(() => mix('#ff0000', '#0000ff', -1)).toThrow();
  //     expect(() => mix('#ff0000', '#0000ff', 101)).toThrow();
  //   });
  // });
}); 