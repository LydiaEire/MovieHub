import { defineConfig } from 'vite';

export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @import "assets/home.scss";`
            }
        }
    }
});
