# postcss-root-parse-var

Simple PostCSS plugin to add support for **`parse-var()`**, allowing a CSS variable to be parsed from `:root` or a selector of your choice.

Useful if a subsequent PostCSS plugin requires a static value to work on. This is not intended as a fallback for `var()`.

### Installation

```shell
yarn add postcss-root-parse-var --dev
```

Require `postcssRootParseVar` at the top of Webpack or Mix:
```js
const postcssRootParseVar = require('postcss-root-parse-var');
```

#### Using Webpack

```js
postcss([postcssRootParseVar]);
```

#### Using Mix Sass (Sage 10)

```js
mix
    .sass('resources/assets/styles/editor.scss', 'styles')
    .options({
        postCss: [postcssRootParseVar]
    });
```

### Config

Some config can be passed into `postcssRootParseVar()` in Webpack or Mix. 

```js
postcssRange({
    root: ':root',
    prefix: 'parse-var',
})
```

### Usage

```scss
:root {
    --screen-md: 48rem;
    --screen-lg: 75rem,
}

.parse-var {
    font-size: range(2rem, 6rem, parse-var(--screen-md), parse-var(--screen-lg));
}

```

This will parse the root variables resulting in a static value for `--screen-md` and `--screen-lg`.

```scss
.parse-var {
    font-size: range(2rem, 6rem, 48rem, 75rem);
}
```
