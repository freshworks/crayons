# Typography

We can easily add font related styles through SASS mixin and CSS Utils.

## Heading

For heading text, we can use 'fw-type-#{size}'. 

*#{size} can be 'h1', 'h2' .. 'h6', 'h7'*

#### Heading size chart:

name | h1 | h2 | h3 | h4 | h5 | h6 | h7
--- | --- | --- | --- |--- |--- |--- |---
rem | 2.75rem | 2rem | 1.5rem | 1.125rem | 1rem | 0.875rem | 0.75rem
px (font size of the root element being 16px) | 44px | 32px | 24px | 18px | 16px | 14px | 12px

```html  live
<div>
  <div class="fw-type-h1">The quick brown fox jumps</div>
  <div class="fw-type-h2">The quick brown fox jumps</div>
  <div class="fw-type-h3">The quick brown fox jumps</div>
  <div class="fw-type-h4">The quick brown fox jumps</div>
  <div class="fw-type-h5">The quick brown fox jumps</div>
  <div class="fw-type-h6">The quick brown fox jumps</div>
  <div class="fw-type-h7">The quick brown fox jumps</div>
</div>
```

## Body

For Body text, we can use 'fw-type-#{size}'.

*#{size} can be '3xl', '2xl', 'xl', 'lg', 'base', 'sm', 'xs'*

#### Body size chart

name | 3xl | 2xl | xl | lg | base | sm | xs
--- | --- | --- | --- |--- |--- |--- |---
rem | 2.75rem | 2rem | 1.5rem | 1.125rem | 1rem | 0.875rem | 0.75rem
px (font size of the root element being 16px) | 44px | 32px | 24px | 18px | 16px | 14px | 12px


```html  live
<div>
  <div class="fw-type-3xl">The quick brown fox jumps</div>
  <div class="fw-type-2xl">The quick brown fox jumps</div>
  <div class="fw-type-xl">The quick brown fox jumps</div>
  <div class="fw-type-lg">The quick brown fox jumps</div>
  <div class="fw-type-base">The quick brown fox jumps</div>
  <div class="fw-type-sm">The quick brown fox jumps</div>
  <div class="fw-type-xs">The quick brown fox jumps</div>
</div>
```

## Font weight

For font weight, we can use 'fw-type-#{weight}'

*#{weight} can be 'bold', 'semibold', 'regular', 'light'*

```html  live
<div>
  <div class="fw-type-bold">The quick brown fox jumps</div>
  <div class="fw-type-semibold">The quick brown fox jumps</div>
  <div class="fw-type-regular">The quick brown fox jumps</div>
  <div class="fw-type-light">The quick brown fox jumps</div>
</div>
```

## Anchor

For anchor tags, we can use 'fw-type-anchor'

```html live
<a class="fw-type-anchor" href="#anchor">Anchor Text</a>
```

----------------------------------------------

Built with ❤ at Freshworks
