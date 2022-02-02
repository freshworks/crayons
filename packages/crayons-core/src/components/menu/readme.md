# Menu (fw-menu)

## Usage

Menu is a container for `fw-menu-item` components.

```html live
<template>
  <fw-menu style="--menu-max-width: 300px">
    <fw-menu-item
      >Messages
      <fw-icon name="email" size="16" slot="prefix"></fw-icon>
      <div class="badge" slot="suffix">10</div>
    </fw-menu-item>

    <hr class="separator" />

    <fw-menu-item
      >Help
      <fw-icon name="help" size="16" slot="prefix"></fw-icon>
    </fw-menu-item>

    <fw-menu-item
      >More Information
      <fw-icon name="info" size="16" slot="prefix"></fw-icon>
    </fw-menu-item>

    <hr class="separator" />

    <fw-menu-item selectable>First Option</fw-menu-item>
    <fw-menu-item selectable>Second Option</fw-menu-item>
    <fw-menu-item selectable>Third Option</fw-menu-item>

    <hr class="separator" />

    <fw-menu-item>
      <fw-avatar initials="PT" size="xsmall" slot="prefix"></fw-avatar>
      User name
      <fw-button slot="suffix" color="primary">Log Out</fw-button>
    </fw-menu-item>
  </fw-menu>
</template>
<style>
  .badge {
    width: 24px;
    border-radius: 8px;
    text-align: center;
    background: dodgerblue;
  }

  .separator {
    width: 100%;
    height: 1px;
    margin: 0px;
    border-width: 0;
    color: #ebeff3;
    background-color: #ebeff3;
  }
</style>
```

<!-- Auto Generated Below -->


## CSS Custom Properties

| Name                   | Description                         |
| ---------------------- | ----------------------------------- |
| `--menu-border`        | Border of the menu content.         |
| `--menu-border-radius` | Border radius of the menu content.  |
| `--menu-box-shadow`    | Box Shadow of the menu content.     |
| `--menu-max-height`    | Maximum height of the menu content. |
| `--menu-max-width`     | Maximum width of the menu content.  |
| `--menu-min-height`    | Minimum height of the menu content. |
| `--menu-min-width`     | Minimum width of the menu content.  |


----------------------------------------------

Built with ❤ at Freshworks
