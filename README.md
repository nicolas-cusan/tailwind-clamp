# Tailwind clamp

Tailwind CSS plugin to use CSS `clamp` in your project. Enabling fluid interfaces using Tailwind syntax.

The plugin is based on the formula presented in this [article](https://chriskirknielsen.com/blog/modern-fluid-typography-with-clamp/)

## Features

- Clamp values between a min and max viewport width, making it grow / shrink with the viewport.
- Possibility to use small to large, large to small, negative to positive, positive to negative and negative to negative values. (Negative values only work on properties that allow them, e.g. `margin`)
- Supports `px`, `rem` and `em` units.
- Support `text` values with multiple properties (`fontSize`, `lineHeight`, `letterSpacing`). If `lineHeight` is definded as a unitless number or a `calc()` function, the resulting value is calculated and converted to the `fontSize` unit.
- Supports using Tailwind CSS theme values, arbitrary values or a combination.

## Requirements

The current version of the plugin is designed to be used with Tailwind version 4. To use it with version 3 use version 3.x.

## Installation

Install the plugin from npm:

```sh
npm install nicolas-cusan/tailwind-clamp
```

Add the plugin in your main CSS file:

```css
@import 'tailwindcss';
@plugin "tailwind-clamp";
```

### Configuration

The plugin allows two configuration options:

| Name                   | Type       | Description                           | Default value |
| ---------------------- | ---------- | ------------------------------------- | ------------- |
| **`minViewportWidth`** | `{string}` | Viewport size where the clamp starts. | `375`         |
| **`maxViewportWidth`** | `{string}` | Viewport size where the clamp end.    | `1440`        |

Value should be a css length (`px`, `rem`, `em`). The unit for both options need to match.

```css
@import 'tailwindcss';
@plugin "tailwind-clamp" {
  minViewportWidth: 23rem,
  maxViewportWidth: 90rem
};
```

## Usage

The plugin relies on the arbitrary values syntax `clamp-[...]`. You need to pass at least three arguments separated by commas without whitespace, optionally you can also pass the `minViewportWidth` and the `maxViewportWidth`:

```
clamp-[<property>,<start>,<end>,[minViewportWidth,maxViewportWidth]]
```

### Arguments

- `property`: Property that the value should be applied to. See a list of all supported properties below.
- `start`: Value at `minViewportWidth` viewport size. It can be a key from your Tailwind CSS config file or a a css length (`px`, `rem`, `em`), the unit will need to match `end`.
- `end`: Value at `maxViewportWidth` viewport size. It can be a key from your Tailwind CSS config file or a css length (`px`, `rem`, `em`), the unit will need to match `start`.
- `[minViewportWidth=375]`: Viewport size, where the clamp starts, defaults to `23.4375rem` (`375px`). It can be a breakpoint name from your theme or a css length (`px`, `rem`, `em`), the unit will need to match `maxViewportWidth` and be smaller than `maxViewportWidth`.
- `[maxViewportWidth=1440]`: Viewport size, where the clamp stops, defaults to `90rem` (`1440`). It can be a breakpoint name from your theme or a css length (`px`, `rem`, `em`), the unit will need to match `minViewportWidth` and be be larger than `minViewportWidth`.

### Examples

```html
<div class="clamp-[px,20,40] clamp-[py,10,18]">
  Add some fluid padding here.
</div>
```

## Supported properties

- `p` including `pt`, `pb`, `pl`, `pr`, `px`, `py`, `ps`, `pe`.
- `m` including `mt`, `mb`, `ml`, `mr`, `mx`, `my`, `ms`, `me`.
- `inset` including `inset-x`, `inset-y`.
- `top`
- `left` and `start`.
- `right` and `end`.
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
- `rounded` including `rounded-s`, `rounded-ss`, `rounded-se`, `rounded-e`, `rounded-ee`, `rounded-es`, `rounded-t`, `rounded-r`, `rounded-b`, `rounded-l`, `rounded-tl`, `rounded-tr`, `rounded-bl`, `rounded-br`.
- `translate-x`
- `translate-y`
- `text-stroke`
- `stroke`
- `leading`
- `tracking`
- `border` including `border-t`, `border-b`, `border-l`, `border-r`, `border-x`, `border-y`.
- `scroll-m`

## Roadmap

- Add showcase
