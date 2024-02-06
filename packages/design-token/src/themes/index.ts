export const Color = {
    primary: {
        10: 'var(--primary-10)',
        20: 'var(--primary-20)',
        30: 'var(--primary-30)',
        40: 'var(--primary-40)',
    },
    grayScale: {
        10: 'var(--grayscale-10)',
        20: 'var(--grayscale-20)',
        30: 'var(--grayscale-30)',
        40: 'var(--grayscale-40)',
        50: 'var(--grayscale-50)',
        60: 'var(--grayscale-60)',
        70: 'var(--grayscale-70)',
        80: 'var(--grayscale-80)',
        90: 'var(--grayscale-90)',
    },
    subColor: {
        red: {
            10: 'var(--subcolor-red-10)',
            20: 'var(--subcolor-red-20)',
        },
        green: {
            10: 'var(--subcolor-green-10)',
            20: 'var(--subcolor-green-20)',
        },
        blue: {
            10: 'var(--subcolor-blue-10)',
            20: 'var(--subcolor-blue-20)',
        },
        yellow: {
            10: 'var(--subcolor-yellow-10)',
            20: 'var(--subcolor-yellow-20)',
        },
    },
};

const fontToCss = (size: number, lineHeight: number) => {
    return {
        fontSize: `${size}px`,
        lineHeight: `${lineHeight}px`,
    };
};

export const Font = {
    h1: fontToCss(40, 60),
    h2: fontToCss(36, 54),
    h3: fontToCss(32, 48),
    h4: fontToCss(28, 40),
    h5: fontToCss(24, 36),
    h6: fontToCss(20, 28),
    body1: fontToCss(18, 26),
    body2: fontToCss(16, 24),
    body3: fontToCss(14, 20),
    caption: fontToCss(12, 18),
};

export const FontWeight = {
    bold: '700',
    medium: '500',
    regular: '400',
};
