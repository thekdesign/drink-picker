import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const r = (p) => path.resolve(__dirname, p);

export default defineConfig({
    root: 'resources/js',
    plugins: [vue()],
    resolve: {
        extensions: ['.js', '.json', '.css', '.scss', '.vue'],
        alias: {
            apis: r('resources/js/apis'),
            bootstrap: r('resources/js/bootstrap'),
            components: r('resources/js/components'),
            composables: r('resources/js/composables'),
            config: r('resources/js/config'),
            data: r('resources/js/data'),
            directives: r('resources/js/directives'),
            enums: r('resources/js/enums'),
            formatters: r('resources/js/formatters'),
            img: r('resources/img'),
            libs: r('resources/js/libs'),
            maps: r('resources/js/maps'),
            parameters: r('resources/js/parameters'),
            router: r('resources/js/router'),
            sass: r('resources/sass'),
            stores: r('resources/js/stores'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
            },
        },
    },
});
