import * as colorConversion from "./colorConversion"
import * as utils from "./utils"
import {
  rgbTohsl,
  rgbTohex,
  rgbTohsv,
  rgbTocmyk,
  rgbaToHex,
  rgbToLab,
  rgbToXyz,
  rgbToLch,

  hexTorgb,
  hexTohsl,
  hexTohsv,
  hexTocmyk,
  hexToRgba,

  hslTorgb,
  hslTohex,
  hslTohsv,

  cmykTorgb,
  cmykTohex,
  cmykTohsl,
} from "./colorConversion"
import {
    randomcolor,
    generateColorScheme,
    getSuggestedTextColor,

    getLuminance,
    getContrastRatio,
    isWcagAA,
    isWcagAAA,
    lighten,
    darken,
    saturate,
    desaturate,
    grayscale,
} from "./utils"


export default {
  ...colorConversion,
  ...utils,
};

export {
  rgbTohsl,
  rgbTohsl as rgbToHsl,
  rgbTohex,
  rgbTohex as rgbToHex,
  rgbTohsv,
  rgbTohsv as rgbToHsv,
  rgbTocmyk,
  rgbTocmyk as rgbToCmyk,
  rgbaToHex,
  rgbToLab,
  rgbToXyz,
  rgbToLch,

  hexTorgb,
  hexTorgb as hexToRgb,
  hexTohsl,
  hexTohsl as hexToHsl,
  hexTohsv,
  hexTohsv as hexToHsv,
  hexTocmyk,
  hexTocmyk as hexToCmyk,
  hexToRgba,

  hslTorgb,
  hslTorgb as hslToRgb,
  hslTohex,
  hslTohex as hslToHex,
  hslTohsv,
  hslTohsv as hslToHsv,

  cmykTorgb,
  cmykTorgb as cmykToRgb,
  cmykTohex,
  cmykTohex as cmykToHex,
  cmykTohsl,
  cmykTohsl as cmykToHsl,

  randomcolor,
  randomcolor as randomColor,
  generateColorScheme,
  getSuggestedTextColor,

  getLuminance,
  getContrastRatio,
  isWcagAA,
  isWcagAAA,
  lighten,
  darken,
  saturate,
  desaturate,
  grayscale,
}
