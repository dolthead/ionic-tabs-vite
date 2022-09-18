# Vite with the Ionic tabs starter!

Based on [the YouTube tutorial](https://www.youtube.com/watch?v=-FwQ6c6OreQ) from [@alvarosabu](https://github.com/alvarosabu).

[View the commit](https://github.com/dolthead/vitehow/commit/2ab6f7e311942ef8ea472cdb9a00e17a9a873d5e) for all these changes.

If you don't care how it's done--you just want the vite-based tabs starter--then fork and clone away!

## Why?

The prod build using vue-cli is **3MB**, while the build with VITE is **413KB** (86% smaller)!

Also, the dev live reload times are super-much quicklier with VITE. ⚡️

## Start with the Ionic Vue tabs starter

> `npm i -g @ionic/cli@latest`
>
> `ionic start tabsApp tabs --type vue`
>
> `cd tabsApp`
>
> `code .`

Edit tsconfig.json:

- `types: [ "node" ]`
- `exclude: [ "node_modules", "tests" }`
  
Edit package.json:

- remove all @vue/cli lines
- remove all jest lines
- replace scripts with
```
"serve": "vite dev",
"build": "vue-tsc --noEmit && vite build,"
"e2e": "cypress run",
"test": "vitest",
"coverage": "vitest run --coverage",
```

Install vite and vitest, with dependencies:

> `npm i -D vue-tsc vite @vitejs/plugin-vue jshint` // for vite
> 
> `npm i -D vitest jsdom @vitest/coverage-c8` // for vitest 

Remove jest.config.js:

> `rm jest.config.js`

Add vite.config.ts

```
import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig({
    define: {
        'process.env': {},
    },
    resolve:{
        alias:{
            '@' : path.resolve(__dirname, './src')
        },
    },
	plugins: [ 
		vue(),
	],
	server: {
		port: 8100,
        open: true,
	},
});
```

Add vitest.config.ts:

```
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';
import { fileURLToPath, URL } from "url";

export default mergeConfig(viteConfig, defineConfig({
    test: {
        deps: {
            inline: [
                "@ionic/core"
            ]
        },
        globals: true,
        environment: 'jsdom',
    },
    resolve: {
      alias: {
        '@ionic/vue/css': fileURLToPath(new URL('./node_modules/@ionic/vue/css', import.meta.url)),
        '@ionic/vue': fileURLToPath(new URL('./node_modules/@ionic/vue/dist/index.esm.js', import.meta.url))
      },
    },
  },
));
```

Move & edit index.html:

> `mv public/index.html .`
> 
remove `<%= BASE_URL %>`

add `<script type="module" src="/src/main.ts"></script>`
after `<div id="app"></div>`

## Start it up

> `npm run serve`

## Run unit and e2e tests

> `npm run test`
>
> `npm run coverage`
> 
> `npm run e2e`

## Prod build

> `npm run build`

-----

## Add PWA support

> `npm i -D vite-plugin-pwa`

Update your `vite.config.ts`:

```
import { VitePWA } from 'vite-plugin-pwa';
...
	plugins: [ 
		vue(),
		VitePWA({ registerType: 'autoUpdate' }),
	],
```

Update your `tsconfig.json`:
```
"types": [
    "node",
    "vite-plugin-pwa/client",
],
```

Add to your `package.json` scripts:

```
"serve:pwa": "vite build --mode pwa && vite preview --mode pwa",
```

Run the PWA on your machine:

> `npm run serve:pwa`

-----

### Note

Ignore 404 warnings for missing map files--it's caused by the "Vue.js devtools" chrome extension.
