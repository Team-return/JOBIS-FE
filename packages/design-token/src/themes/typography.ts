const fontToCss = (size: number, lineHeight: number) =>
    `
    font-size: ${size}px;
    line-height: ${lineHeight}px;
`;

export const text = {
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

export const fontWeight = {
    bold: '700',
    medium: '500',
    regular: '400',
};
