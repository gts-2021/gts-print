# `BadgeComponent` Documentation

## Introduction

The `BadgeComponent` is a customizable badge that supports various themes. It’s designed to integrate seamlessly with different styles and themes for primary, secondary, and danger badges.

## Props
| Prop            | Type       | Required | Default         | Description
| `text`          | `String`   | Yes      | `''`             | Text displayed as the bagde text.  
| `theme`         | `String`   | No       | `''`       | badge theme, supporting styles like ``, ``, ``, etc. from constants. |
| `className`     | `String`   | No       | `gts-badge`            | Custom class applied to the badge for additional styling.


## Data Properties

None.

## Events

-

## Methods


## CSS Classes

The badge component includes multiple CSS classes for styling, with SCSS used for dynamic theming. Below are the main classes:

- `.gts-badge-primary`: Primary badge with default primary color styling.
- `.gts-badge-sucess`: Sucess badge style with a green theme.
- `.gts-badge-warning`: Warning badge style with an orang theme.
- `.gts-badge-danger`: Danger badge style with a red theme.

## Usage Examples

### Basic badge with title only

```vue
<template>
  <Badge />
</template>

<script>
import Badge from './Badge.vue';

export default {
  components: { Badge },
};
</script>

```
### badge with specific theme

```vue
<template>
  <Badge :text="'Completed'" :theme="PRIMARY"/>
</template>

<script>
import Badge from './Badge.vue';
import { PRIMARY } from '@/constants/badges.js';

export default {
  components: { Badge },
  data() {
		return {
      PRIMARY,
    }
  },
};
</script>
```

### badge with specific style

```vue
<template>
  <Badge :text="'Completed'" className="custom-badge-style"/>
</template>

<script>
import Badge from './Badge.vue';

export default {
  components: { Badge },
};
</script>
```
