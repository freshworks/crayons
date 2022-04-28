# Color System

## Color schemes

The color system handles the variability of dynamically changing color schemes that arise as user inputs change.
While key colors are the basis for tonal palettes, only a selection of colors from each tonal palette are used in a UI. A scheme is the group of tones assigned to specific roles that get mapped to components. Color schemes can be considered a cohesive group of relative tones, such as primary schema, secondary schema, etc.,.

## Design Tokens

Crayons makes use of several design tokens to provide a consistent appearance across components. You can customize them and use them in your own application with pure CSS — no preprocessor required. Design tokens are accessed through CSS custom properties that are defined in your theme. To customize a design token, simply override it in your stylesheet using a :root block.

| CSS Variable             | Default color  | Color Code                                                                |
| ------------------------ | -------------- | ------------------------------------------------------------------------- |
| --fw-color-primary-900   | elephant-900   | ![#12344d](https://via.placeholder.com/15/12344d/12344d?text=+) `#12344d` |
| --fw-color-primary-800   | elephant-800   | ![#264966](https://via.placeholder.com/15/264966/264966?text=+) `#264966` |
| --fw-color-primary-700   | elephant-700   | ![#345c7c](https://via.placeholder.com/15/345c7c/345c7c?text=+) `#345c7c` |
| --fw-color-primary-50    | elephant-600   | ![#447093](https://via.placeholder.com/15/447093/447093?text=+) `#447093` |
| --fw-color-secondary-700 | smoke-700      | ![#475867](https://via.placeholder.com/15/475867/475867?text=+) `#475867` |
| --fw-color-secondary-400 | smoke-400      | ![#7b8e9f](https://via.placeholder.com/15/7b8e9f/7b8e9f?text=+) `#7b8e9f` |
| --fw-color-secondary-300 | smoke-300      | ![#92a2b1](https://via.placeholder.com/15/92a2b1/92a2b1?text=+) `#92a2b1` |
| --fw-color-secondary-200 | smoke-200      | ![#b1bdc8](https://via.placeholder.com/15/b1bdc8/b1bdc8?text=+) `#b1bdc8` |
| --fw-color-secondary-100 | smoke-100      | ![#cfd7df](https://via.placeholder.com/15/cfd7df/cfd7df?text=+) `#cfd7df` |
| --fw-color-secondary-50  | smoke-50       | ![#ebeff3](https://via.placeholder.com/15/ebeff3/ebeff3?text=+) `#ebeff3` |
| --fw-color-secondary-25  | smoke-25       | ![#f5f7f9](https://via.placeholder.com/15/f5f7f9/f5f7f9?text=+) `#f5f7f9` |
| --fw-color-success-800   | jungle-800     | ![#00795b](https://via.placeholder.com/15/00795b/00795b?text=+) `#00795b` |
| --fw-color-success-500   | jungle-500     | ![#00a886](https://via.placeholder.com/15/00a886/00a886?text=+) `#00a886` |
| --fw-color-success-100   | jungle-100     | ![#b4e5da](https://via.placeholder.com/15/b4e5da/b4e5da?text=+) `#b4e5da` |
| --fw-color-success-50    | jungle-50      | ![#e0f5f1](https://via.placeholder.com/15/e0f5f1/e0f5f1?text=+) `#e0f5f1` |
| --fw-color-warning-700   | casablanca-700 | ![#e86f25](https://via.placeholder.com/15/e86f25/e86f25?text=+) `#e86f25` |
| --fw-color-warning-300   | casablanca-300 | ![#f8ab59](https://via.placeholder.com/15/f8ab59/f8ab59?text=+) `#f8ab59` |
| --fw-color-warning-100   | casablanca-100 | ![#fedcb3](https://via.placeholder.com/15/fedcb3/fedcb3?text=+) `#fedcb3` |
| --fw-color-warning-50    | casablanca-50  | ![#fef1e1](https://via.placeholder.com/15/fef1e1/fef1e1?text=+) `#fef1e1` |
| --fw-color-danger-900    | persimmon-900  | ![#c82124](https://via.placeholder.com/15/c82124/c82124?text=+) `#c82124` |
| --fw-color-danger-800    | persimmon-800  | ![#d72d30](https://via.placeholder.com/15/d72d30/d72d30?text=+) `#d72d30` |
| --fw-color-danger-300    | persimmon-300  | ![#f2797b](https://via.placeholder.com/15/f2797b/f2797b?text=+) `#f2797b` |
| --fw-color-danger-200    | persimmon-200  | ![#f89fa1](https://via.placeholder.com/15/f89fa1/f89fa1?text=+) `#f89fa1` |
| --fw-color-danger-100    | persimmon-100  | ![#ffd0d6](https://via.placeholder.com/15/ffd0d6/ffd0d6?text=+) `#ffd0d6` |
| --fw-color-danger-50     | persimmon-50   | ![#ffecf0](https://via.placeholder.com/15/ffecf0/ffecf0?text=+) `#ffecf0` |
| --fw-color-info-800      | azure-800      | ![#2c5cc5](https://via.placeholder.com/15/2c5cc5/2c5cc5?text=+) `#2c5cc5` |
| --fw-color-info-100      | azure-100      | ![#bbdcfe](https://via.placeholder.com/15/bbdcfe/bbdcfe?text=+) `#bbdcfe` |
| --fw-color-info-50       | azure-50       | ![#e5f2fd](https://via.placeholder.com/15/e5f2fd/e5f2fd?text=+) `#e5f2fd` |
| --fw-color-neutral-100   | milk           | ![#fff](https://via.placeholder.com/15/fff/fff?text=+) `#fff`             |

## Surface tones

Surfaces at elevation levels +1 to +2 are tinted via color which introduces tonal variation to the surface baseline.

Tonal surfaces provide a few benefits:

- Simulate the effect of elevation to create differentiation amongst competing content areas
- Establish contrast for accessibility benefits

| CSS Variable          | Default Shadow value                  | Usage           |
| --------------------- | ------------------------------------- | --------------- |
| --fw-elevation-level1 | `-15px 20px 40px rgba(0, 0, 0, 0.04)` | popover, select |
| --fw-elevation-level2 | `0px 2px 18px rgba(18, 52, 77, 0.2)`  | modal           |
