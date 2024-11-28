// postcss.config.js (uso della sintassi ESM completa)
import tailwindcss from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';
import autoprefixer from 'autoprefixer';

export default {
    plugins: [
        tailwindcss,
        tailwindConfig,
        autoprefixer
    ]
};