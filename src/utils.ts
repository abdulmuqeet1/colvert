// Check if color value is valid
const isColorValid = (value: Array<number | string> | string, type: string): boolean => {
    switch (type) {
        case 'rgb': {
            if (!Array.isArray(value) || value.length !== 3) return false;
            return value.every(val => typeof val === 'number' && val >= 0 && val <= 255);
        }
        case 'rgba': {
            if (!Array.isArray(value) || value.length !== 4) return false;
            return value.slice(0, 3).every(val => typeof val === 'number' && val >= 0 && val <= 255) &&
                typeof value[3] === 'number' && value[3] >= 0 && value[3] <= 1;
        }
        case 'hsl': {
            if (!Array.isArray(value) || value.length !== 3) return false;
            return typeof value[0] === 'number' && value[0] >= 0 && value[0] <= 360 &&
                typeof value[1] === 'number' && value[1] >= 0 && value[1] <= 100 &&
                typeof value[2] === 'number' && value[2] >= 0 && value[2] <= 100;
        }
        case 'hsv': {
            if (!Array.isArray(value) || value.length !== 3) return false;
            return typeof value[0] === 'number' && value[0] >= 0 && value[0] <= 360 &&
                typeof value[1] === 'number' && value[1] >= 0 && value[1] <= 100 &&
                typeof value[2] === 'number' && value[2] >= 0 && value[2] <= 100;
        }
        case 'cmyk': {
            if (!Array.isArray(value) || value.length !== 4) return false;
            return value.every(val => typeof val === 'number' && val >= 0 && val <= 100);
        }
        case 'hex': {
            if (typeof value !== 'string') return false;
            return /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(value);
        }
        default: {
            return false;
        }
    }
}

// Error class for color conversion errors
export class ColorConversionError extends Error {
constructor(message: string) {
    super(message);
    this.name = 'ColorConversionError';
}
}
  
// Helper functions
const validateOrThrow = <T>(value: any, type: string, errorMsg: string): T => {
    if (!isColorValid(value, type)) {
        throw new ColorConversionError(errorMsg);
    }
    return value as T;
};

const clamp = (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
};

export { 
    isColorValid,
    validateOrThrow,
    clamp
};