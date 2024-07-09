# Tailwind clamp

Tailwind CSS plugin to use CSS `clamp` in your project. Enabling fluid interfaces using Tailwind syntax.

The plugin is based on the formula presented in this [article](https://chriskirknielsen.com/blog/modern-fluid-typography-with-clamp/)

## Features

- Clamp values between a min and max viewport width, making it grow / shrink with the viewport.
- Possibility to use small to large, large to small, negative to positive, positive to negative and negative to negative values. (Negative values only work on properties that allow them, e.g. `margin`)
- Supports `px`, `rem` and `em` units.
- Support `text` values with multiple properties (`fontSize`, `lineHeight`, `letterSpacing`).
- Support using defined in the Tailwind CSS configuration file, arbitrary values or a combination.

## Installation

Install the plugin from npm:

```sh
npm install nicolas-cusan/tailwind-clamp
```

Add the plugin in your Tailwind CSS configuration file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwind-clamp'),
    // ...
  ],
};
```

### Configuration

The plugin allows two configuration options:

| Name               | Description                          | Default value |
| ------------------ | ------------------------------------ | ------------- |
| `minViewportWidth` | Viewport size where the clamp starts | `375`         |
| `maxViewportWidth` | Viewport size where the clamp end    | `1440`        |

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwind-clamp')({
      minViewportWidth: 375,
      maxViewportWidth: 1440,
    }),
    // ...
  ],
};
```

## Usage

The plugin relies on the arbitrary values syntax `clamp-[...]`. You need to pass at least three arguments separated by commas without whitespace, optionally you can also pass the `minViewportWidth` and the `maxViewportWidth`:

```
clamp-[<property>,<start>,<end>,[minViewportWidth,maxViewportWidth]]
```

### Arguments

- `property`: Property that the value should be applied to. See a list of all supported properties below.
- `start`: Value at `minViewportWidth` viewport size. It can be a key from your Tailwind CSS config file, a css value (`px`, `rem`, `em`) or a number (unit will be `px`), the unit will need to match `end`.
- `end`: Value at `maxViewportWidth` viewport size. It can be a key from your Tailwind CSS config file, a css value (`px`, `rem`, `em`) or a number (unit will be `px`), the unit will need to match `start`.
- `[minViewportWidth=375]`: Viewport size, where the clamp starts, defaults to `375`. Can be a key from `screens` a css value (`px`, `rem`, `em`) or a number (unit will be `px`), the unit will need to match `maxViewportWidth`. Value needs be smaller than `maxViewportWidth`.
- `[maxViewportWidth=1440]`: Viewport size, where the clamp stops, defaults to `1440`. Can be a key from `screens` a css value (`px`, `rem`, `em`) or a number (unit will be `px`), the unit will need to match `minViewportWidth`. Value needs to be larger than `minViewportWidth`.

### Examples

```html
<div class="clamp-[px,20,40] clamp-[py,10,18]">
  Add some fluid padding here.
</div>
```

##### Supported properties

- `p` including `pt`, `pb`, `pl`, `pr`, `px`, `py`.
- `m` including `mt`, `mb`, `ml`, `mr`, `mx`, `my`.
- `inset`
- `top`
- `left`
- `right`
- `bottom`
- `text` including `font-size`, `line-height` and `letter-spacing` if defined.
- `gap` including `gap-x`, `gap-y`.
- `w`
- `h`
- `size`
- `min-w`
- `min-h`
- `max-w`
- `max-h`
- `rounded` including `rounded-t`, `rounded-r`, `rounded-b`, `rounded-l`, `rounded-tl`, `rounded-tr`, `rounded-bl`, `rounded-br`.
- `translate-x`
- `translate-y`
- `text-stroke`
- `stroke`
- `leading`
- `border` including `border-t`, `border-b`, `border-l`, `border-r`, `border-x`, `border-y`.
- `scroll-m`

## Roadmap

- Support directional properties e.g. `ps`
- Add showcase
