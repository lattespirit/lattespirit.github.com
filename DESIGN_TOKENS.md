# Design Tokens - Sunset/Twilight Theme

This document describes the new design tokens added to the Tailwind CSS configuration, based on the color palette extracted from `background.jpg`.

## Color Palette Overview

The background image features a beautiful sunset/twilight landscape with a gradient from deep purples at the top to vibrant pinks and corals at the horizon. The design tokens capture these colors organized into three thematic groups:

### 🌌 Twilight - Deep Sky Colors

These colors represent the deep purple and violet tones from the upper sky:

| Token Name | Hex Color | Usage |
|------------|-----------|-------|
| `twilight-deepest` | `#2d1b69` | Darkest purple, top of sky gradient |
| `twilight-deeper` | `#3d2a7f` | Deep purple |
| `twilight-deep` | `#4a2d9a` | Rich purple |
| `twilight` | `#6b4ba1` | Mid-tone purple (base) |
| `twilight-light` | `#8b5cb5` | Light purple |
| `twilight-lighter` | `#a267c8` | Lightest purple shade |

### 🌆 Sunset - Glow & Horizon Colors

These colors capture the vibrant pink, magenta, and coral tones of the sunset:

| Token Name | Hex Color | Usage |
|------------|-----------|-------|
| `sunset-magenta` | `#d85a9c` | Deep magenta/pink |
| `sunset-pink` | `#ed6b9d` | Vibrant pink |
| `sunset-light` | `#f178a6` | Light pink |
| `sunset-coral` | `#ff8aa0` | Coral pink |
| `sunset-salmon` | `#ffa0b0` | Salmon pink |
| `sunset-lightest` | `#ffb4c0` | Lightest pink/coral |

### 🌲 Silhouette - Dark Accent Colors

These colors represent the dark silhouettes and shadows in the foreground:

| Token Name | Hex Color | Usage |
|------------|-----------|-------|
| `silhouette-darkest` | `#0a0614` | Nearly black, deepest shadow |
| `silhouette-dark` | `#1a1228` | Dark navy shadow |
| `silhouette` | `#2a2040` | Dark purple shadow |

## Usage Examples

### Tailwind CSS Classes

```jsx
// Background colors
<div className="bg-twilight-deepest">Deep purple background</div>
<div className="bg-sunset-coral">Coral background</div>
<div className="bg-silhouette-dark">Dark navy background</div>

// Text colors
<p className="text-sunset-pink">Pink text</p>
<h1 className="text-twilight-light">Light purple heading</h1>

// Gradient backgrounds
<div className="bg-gradient-to-b from-twilight-deepest via-twilight to-sunset-pink">
  Sunset gradient matching the background image
</div>

// Borders
<div className="border-2 border-silhouette-dark">Dark border</div>

// Hover states
<button className="bg-sunset-magenta hover:bg-sunset-pink text-white">
  Button with sunset colors
</button>
```

### CSS Custom Properties

The tokens are also available as CSS custom properties:

```css
.hero-section {
  background: linear-gradient(
    to bottom,
    var(--color-twilight-deepest),
    var(--color-twilight),
    var(--color-sunset-pink)
  );
}

.card {
  background-color: var(--color-twilight-light);
  border-color: var(--color-silhouette-dark);
}

.button-primary {
  background-color: var(--color-sunset-magenta);
  color: var(--color-white);
}
```

## Implementation Details

The design tokens are defined in `/src/styles/lattespirit.css` within the `@theme` block, following the Tailwind CSS v4 custom property syntax:

```css
@theme {
  /* Design tokens based on background.jpg - Sunset/Twilight Theme */
  
  /* Deep Sky - Top of the gradient */
  --color-twilight-deepest: #2d1b69;
  --color-twilight-deeper: #3d2a7f;
  --color-twilight-deep: #4a2d9a;
  
  /* Mid Sky - Purple gradient */
  --color-twilight: #6b4ba1;
  --color-twilight-light: #8b5cb5;
  --color-twilight-lighter: #a267c8;
  
  /* Sunset Glow - Pink/Magenta */
  --color-sunset-magenta: #d85a9c;
  --color-sunset-pink: #ed6b9d;
  --color-sunset-light: #f178a6;
  
  /* Horizon - Coral/Salmon */
  --color-sunset-coral: #ff8aa0;
  --color-sunset-salmon: #ffa0b0;
  --color-sunset-lightest: #ffb4c0;
  
  /* Silhouettes - Dark Navy/Black */
  --color-silhouette-darkest: #0a0614;
  --color-silhouette-dark: #1a1228;
  --color-silhouette: #2a2040;
}
```

## Design Considerations

1. **Color Naming**: The tokens are organized by their visual source (twilight, sunset, silhouette) rather than generic names, making it intuitive to understand where each color comes from in the background image.

2. **Progression**: Each color family includes multiple shades that progress naturally (deepest → deeper → deep → base → light → lighter → lightest), allowing for flexible design implementations.

3. **Compatibility**: These tokens work alongside existing color tokens in the theme, so they don't replace any existing functionality.

4. **Accessibility**: When using these colors, ensure sufficient contrast ratios for text and interactive elements, especially when combining lighter sunset colors with white text or darker twilight colors with black text.

## Future Enhancements

Consider adding:
- Additional tints and shades for more granular control
- Opacity variants for layering effects
- Complementary accent colors for calls-to-action
- Semantic color aliases (e.g., `primary`, `secondary`, `accent`) mapped to these tokens
