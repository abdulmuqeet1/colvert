# Colvert 🎨

> A comprehensive color conversion and manipulation package for JavaScript/TypeScript

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg?cacheSeconds=2592000)](#)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](#)

## Features

- 🔄 Convert between different color formats (RGB, HEX, HSL, CMYK)
- 🎨 Generate random colors
- ✨ Manipulate colors (lighten, darken, saturate, desaturate)
- 🌈 Generate color schemes
- 💪 TypeScript support
- 🚀 Zero dependencies

## Installation

```bash
npm install colvert
# or
yarn add colvert
```

## Usage

```typescript
import { 
  hexToRgb, 
  rgbToHex, 
  randomColor,
  lighten,
  generateColorScheme 
} from 'colvert';

// Convert HEX to RGB
const rgb = hexToRgb('#0A167B');  // returns [10, 22, 123]

// Convert RGB to HEX
const hex = rgbToHex([23, 180, 60]);  // returns "#17b43c"

// Generate a random color
const randomHex = randomColor();  // returns random color in HEX format

// Lighten a color by 20%
const lightened = lighten('#ff0000', 20);  // returns lightened color in HEX

// Generate a color scheme
const scheme = generateColorScheme('#ff0000', 5);  // returns array of 5 harmonious colors
```

## API Reference

### Color Conversion Functions

#### RGB Conversions
- `rgbToHex(rgb: [number, number, number]): string`
- `rgbToHsl(rgb: [number, number, number]): [number, number, number]`
- `rgbToHsv(rgb: [number, number, number]): [number, number, number]`
- `rgbToCmyk(rgb: [number, number, number]): [number, number, number, number]`

#### HEX Conversions
- `hexToRgb(hex: string): [number, number, number]`
- `hexToHsl(hex: string): [number, number, number]`
- `hexToHsv(hex: string): [number, number, number]`
- `hexToCmyk(hex: string): [number, number, number, number]`

#### HSL Conversions
- `hslToRgb(hsl: [number, number, number]): [number, number, number]`
- `hslToHex(hsl: [number, number, number]): string`
- `hslToHsv(hsl: [number, number, number]): [number, number, number]`

#### CMYK Conversions
- `cmykToRgb(cmyk: [number, number, number, number]): [number, number, number]`
- `cmykToHex(cmyk: [number, number, number, number]): string`
- `cmykToHsl(cmyk: [number, number, number, number]): [number, number, number]`

### Color Manipulation Functions

- `lighten(color: string, amount: number): string`
- `darken(color: string, amount: number): string`
- `saturate(color: string, amount: number): string`
- `desaturate(color: string, amount: number): string`
- `grayscale(color: string): string`

### Color Generation Functions

- `randomColor(): string`
- `generateColorScheme(baseColor: string, count?: number): string[]`

## Input Formats

- **RGB**: Array of three numbers [0-255]
- **HEX**: String starting with '#' followed by 3 or 6 hexadecimal characters
- **HSL**: Array of [hue (0-360), saturation (0-100), lightness (0-100)]
- **CMYK**: Array of [cyan (0-100), magenta (0-100), yellow (0-100), key/black (0-100)]

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/abdulmuqeet1/colvert/issues).

## License

This project is [MIT](LICENSE) licensed.

---

Made with ❤️ by [Abdul Muqeet](https://github.com/abdulmuqeet1)
