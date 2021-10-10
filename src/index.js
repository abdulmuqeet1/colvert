/////////////////////////
/// rgb --> others //////
/////////////////////////

const rgbToHexconvetion = (num) => {
  let hexv = num.toString(16);
  if (hexv.length < 2) {
    hexv = "0" + hexv;
  }
  return hexv;
};

const rgbTohex = (rgb) => {
  const r = rgbToHexconvetion(Math.round(rgb[0]));
  const g = rgbToHexconvetion(Math.round(rgb[1]));
  const b = rgbToHexconvetion(Math.round(rgb[2]));

  return `#${r}${g}${b}`;
};
const rgbTohsl = (rgb) => {
  try {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;

    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }

    h = Math.min(h * 60, 360);

    if (h < 0) {
      h += 360;
    }

    const l = (min + max) / 2;

    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    // console.log([h, s * 100, l * 100]);

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
  } catch (e) {
    console.error("errror converting rgb to hsl", e);
  }
};

const rgbTohsv = (rgb) => {
  let rdif;
  let gdif;
  let bdif;
  let h;
  let s;

  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const v = Math.max(r, g, b);
  const diff = v - Math.min(r, g, b);
  const diffc = function (c) {
    return (v - c) / 6 / diff + 1 / 2;
  };

  if (diff === 0) {
    h = 0;
    s = 0;
  } else {
    s = diff / v;
    rdif = diffc(r);
    gdif = diffc(g);
    bdif = diffc(b);

    if (r === v) {
      h = bdif - gdif;
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif;
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif;
    }

    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
};

const rgbTocmyk = (rgb) => {
  const r01 = rgb[0] / 255;
  const g01 = rgb[1] / 255;
  const b01 = rgb[2] / 255;

  if (r01 === 0 && g01 === 0 && b01 === 0) return { c: 0, m: 0, y: 0, k: 100 };

  const k = 1 - Math.max(r01, g01, b01);
  const c = (1 - r01 - k) / (1 - k);
  const m = (1 - g01 - k) / (1 - k);
  const y = (1 - b01 - k) / (1 - k);

  const roundedCmyk = [
    Math.round(c * 100),
    Math.round(y * 100),
    Math.round(m * 100),
    Math.round(k * 100),
  ];
  return roundedCmyk;
};
/////////////////////////
/// RGBA --> others /////
/////////////////////////

/////////////////////////
/// hex --> others //////
/////////////////////////

const hexTorgb = (hex) => {
  const match = hex.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match) {
    return [0, 0, 0];
  }

  let colorString = match[0];

  if (match[0].length === 3) {
    colorString = colorString
      .split("")
      .map((char) => {
        return char + char;
      })
      .join("");
  }

  const integer = parseInt(colorString, 16);
  const r = (integer >> 16) & 0xff;
  const g = (integer >> 8) & 0xff;
  const b = integer & 0xff;

  return [r, g, b];
};
const hexTohsl = (hex) => {
  return rgbTohsl(hexTorgb(hex));
};
const hexTohsv = (hex) => {
  return rgbTohsv(hexTorgb(hex));
};

const hexTocmyk = (hex) => {
  return rgbTocmyk(hexTorgb(hex));
};

const hslTorgb = (hsl) => {
  const h = hsl[0] / 360;
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  let t2;
  let t3;
  let val;

  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  const t1 = 2 * l - t2;

  const rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    t3 = h + (1 / 3) * -(i - 1);
    if (t3 < 0) {
      t3++;
    }

    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val * 255;
  }

  return rgb;
};

const hslTohex = (hsl) => {
  return rgbTohex(hslTorgb(hsl));
};

const hslTohsv = (hsl) => {
  return rgbTohsv(hslTorgb(hsl));
};

// need revision - inaccurate results
const cmykTorgb = (cmyk) => {
  const c = cmyk[0] / 100;
  const m = cmyk[1] / 100;
  const y = cmyk[2] / 100;
  const k = cmyk[3] / 100;

  const rgb01 = [
    Math.round((1 - Math.min(1, c * (1 - k) + k)) * 100),
    Math.round((1 - Math.min(1, m * (1 - k) + k)) * 100),
    Math.round((1 - Math.min(1, y * (1 - k) + k)) * 100),
  ];
  return rgb01;
};

const cmykTohex = (cmyk) => {
  return rgbTohex(cmykTorgb(cmyk));
};

const cmykTohsl = (cmyk) => {
  return rgbTohsl(cmykTorgb(cmyk));
};

const randomcolor = () => {
  const alphabet = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += alphabet[Math.floor(Math.random() * 16)];
  }
  return color;
};

module.exports = {
  rgbTohsl,
  rgbTohex,
  rgbTohsv,
  rgbTocmyk,

  hexTorgb,
  hexTohsl,
  hexTohsv,
  hexTocmyk,

  hslTorgb,
  hslTohex,
  hslTohsv,

  cmykTorgb,
  cmykTohex,
  cmykTohsl,

  randomcolor,
};
