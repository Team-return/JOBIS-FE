type AsProps = {
    as?: Exclude<keyof JSX.IntrinsicElements, keyof SVGElementTagNameMap>;
};

type ElementProps = Omit<React.HTMLAttributes<HTMLElement>, 'as'>;

export type AsElementProps = AsProps & ElementProps;

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type CSSVARIABLE = `var(--${string})`;

export type ColorType = RGB | RGBA | HEX | CSSVARIABLE;
