import '@jobis/design-token/global.css';
import './style.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            color: /(background|color)$/i,
            date: /Date$/i,
        },
        rootAttributesTooltip: true,
        rootAttributes: [
            {
                root: 'body',
                attribute: 'class',
                defaultState: {
                    name: 'light',
                    value: 'theme-dark',
                },
                states: [
                    {
                        name: 'dark',
                        value: 'theme-light',
                    },
                ],
            },
        ],
    },
};

const initTheme = () => {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkTheme) {
        document.body.classList.add('theme-dark');
    }

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQueryList.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('theme-dark');
        } else {
            document.body.classList.remove('theme-dark');
        }
    });
};

initTheme();

export default preview;
