# Tailwind clamp

Tailwind CSS utilities & plugin to use CSS `clamp` in your project. Enabling fluid interfaces using Tailwind syntax.

The plugin is based on the formula presented in this [article](https://chriskirknielsen.com/blog/modern-fluid-typography-with-clamp/)

## Features

- Clamp values between a min and max viewport width, making it grow / shrink with the viewport.
- Possibility to use small to large, large to small, negative to positive, positive to negative and negative to negative values. (Negative values only work on properties that allow them, e.g. `margin`)
- Helper functions to simplify the definition of clamped values in your config.
- Tailwind plugin to allow the usage of arbitrary values using the `clamp-[...]` syntax.
- Values are interpreted as pixels and output as `rem`

## Installation

Install the plugin from npm:

```sh
npm install nicolas-cusan/tailwind-clamp
```

## Usage

### Predefine values in your config

The package provides two helper functions to help you define "clamped" values in your config:

#### `clamp(start, end, [minViewportWidth=375, maxViewportWidth=1440])`

##### Arguments

- `start` `{number}`: Value at `minViewportWidth` viewport size. The value is interpreted as pixels and outputted as `rem` in the generated CSS.
- `end` `{number}`: Value at `maxViewportWidth` viewport size. The value is interpreted as pixels and outputted as `rem` in the generated CSS.
- `[minViewportWidth=375]` `{number}`: Viewport size, where the clamp starts, defaults to `375`. The value is interpreted as pixels. Value should be smaller than `maxViewportWidth`.
- `[maxViewportWidth=1440]` `{number}`: Viewport size, where the clamp stops, defaults to `1440` The value is interpreted as pixels. Value should be smaller than `minViewportWidth`.

#### `clampFs(start, end, [tracking=null, minViewportWidth=375, maxViewportWidth=1440])`

##### Arguments

- `start` `{[fontSize: number, lineHeight: number]}`: Array of two numbers: `font-size` and `line-height` respectively at `minViewportWidth` viewport size. Both values are interpreted as pixels and outputted as `rem` in the generated CSS.
- `end` `{[fontSize: number, lineHeight: number]}`: Array of two numbers: `font-size` and `line-height` respectively at `maxViewportWidth` viewport size. Both values are interpreted as pixels and outputted as `rem` in the generated CSS.
- `[tracking=null]` `{string|null}`: `letter-spacing` setting, it is recommended to use the `em` unit as it proportional to the font size, e.g. `-0.01em`
- `[minViewportWidth=375]` `{number}`: Viewport size, where the clamp starts, defaults to `375`. The value is interpreted as pixels. Value should be smaller than `maxViewportWidth`.
- `[maxViewportWidth=1440]` `{number}`: Viewport size, where the clamp stops, defaults to `1440` The value is interpreted as pixels. Value should be smaller than `minViewportWidth`.

```js
// tailwind.config.js
const { setupClamp } = require('tailwind-clamp/src/utils.js');

const clampOptions = {
  minViewportWidth: 375,
  maxViewportWidth: 1440,
};

// Setup the clamp helper functions with the default min and max viewport sizes you want to use
const { clamp, clampFs } = setupClamp(options);

module.exports = {
  theme: {
    // ...
    extend: {
      spacing: {
        // Use
        grid: clamp(10, 20),
      },

      fontSize: {
        base: clampFs([16, 20], [24, 28], '-0.01em'),
      },
    },
  },
  // ...
};
```

### Use the plugin with `clamp-[...]`

The package also provides a plugin to use arbitrary values via the `clamp-[...]` syntax.

```js
// tailwind.config.js
const clampOptions = {
  minViewportWidth: 375,
  maxViewportWidth: 1440,
};

module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwind-clamp')(clampOptions),
    // ...
  ],
};
```

#### Configuration

This plugin allows two configuration options:

| Name               | Description                          | Default value |
| ------------------ | ------------------------------------ | ------------- |
| `minViewportWidth` | Viewport size where the clamp starts | `375`         |
| `maxViewportWidth` | Viewport size where the clamp end    | `1440`        |

#### Using the plugin

The arbitrary values syntax for clamp requires at least three arguments separated by commas without whitespace:

#### `clamp-[<property>,<start>,<end>,[minViewportWidth,maxViewportWidth]]`

##### Arguments

- `property` `{string}`: Property that the value should be applied to. See a list of all supported properties below.
- `start` `{number}`: Value at `minViewportWidth` viewport size. The value is interpreted as pixels and output as `rem` in the generated CSS.
- `end` `{number}`: Value at `maxViewportWidth` viewport size. The value is interpreted as pixels and output as `rem` in the generated CSS.
- `[minViewportWidth=375]` `{number}`: Viewport size, where the clamp starts, defaults to `375`. The value is interpreted as pixels. Value should be smaller than `maxViewportWidth`.
- `[maxViewportWidth=1440]` `{number}`: Viewport size, where the clamp stops, defaults to `1440` The value is interpreted as pixels. Value should be smaller than `minViewportWidth`.

##### Example

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
- `text` applied to `font-size`.
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

- Support other units e.g `%`
- Support directional properties e.g. `ps`
- Add showcase
