import type { FwIconLibrary } from './library.icon.utils';
//
// System icons are a separate library to ensure they're always available, regardless of how the default icon library is
// configured or if its icons resolve properly.
//
// All Crayons components must use the system library instead of the default library. For visual consistency, system
// icons are a subset of Crayons Icons.
//
const crayons_system_icons = {
  'check':
    "<svg viewBox='0 0 8 6'><path d='M3 5.87a.7.7 0 0 1-.5-.2L.21 3.41a.707.707 0 1 1 1-1L3 4.18 6.8.33a.71.71 0 0 1 1 0 .69.69 0 0 1 0 1L3.45 5.67a.7.7 0 0 1-.45.2z' fill='currentColor' fill-rule='evenodd'/></svg>",
  'chevron-down':
    "<svg viewBox='0 0 8 6'><path d='M4 5.35a.74.74 0 0 1-.5-.2L.21 1.85a.707.707 0 1 1 1-1L4 3.66 6.8.85a.707.707 0 0 1 1 1l-3.3 3.3a.74.74 0 0 1-.5.2z' fill='currentColor' fill-rule='evenodd'/></svg>",
  'chevron-up':
    "<svg viewBox='0 0 8 6'><path d='M7.3 5.35a.74.74 0 0 1-.5-.2L4 2.34 1.2 5.15a.707.707 0 0 1-1-1L3.5.85a.72.72 0 0 1 1 0l3.29 3.3a.7.7 0 0 1-.49 1.2z' fill='currentColor' fill-rule='evenodd'/></svg>",
  'cross-big':
    "<svg viewBox='0 0 14 14'><path d='M8 7l5.8-5.8a.707.707 0 0 0-1-1L7 6 1.2.21a.707.707 0 0 0-1 1L6 7 .2 12.8a.69.69 0 0 0 0 1 .67.67 0 0 0 .5.2.7.7 0 0 0 .5-.21L7 8l5.8 5.8a.7.7 0 0 0 .5.21.67.67 0 0 0 .49-.21.69.69 0 0 0 0-1L8 7z' fill='currentColor' fill-rule='evenodd'/></svg>",
  'cross':
    "<svg viewBox='0 0 6 6'><path d='M2.007 2.985L.18 1.17a.707.707 0 1 1 1-1l1.824 1.824L4.83.18a.707.707 0 1 1 1 1L4.006 2.996 5.83 4.82a.71.71 0 0 1-.49 1.2L5.33 6a.7.7 0 0 1-.5-.21L3.013 3.985 1.17 5.82a.7.7 0 0 1-.5.18.71.71 0 0 1-.49-1.2l1.827-1.815z' fill='currentColor' fill-rule='evenodd'/></svg>",
  'error':
    "<svg viewBox='0 0 16 16'><path d='M8 0a8 8 0 1 0 5.657 2.343A8 8 0 0 0 8 0zm0 14.6A6.6 6.6 0 1 1 14.6 8 6.6 6.6 0 0 1 8 14.6zm2.82-8.43L9 8l1.83 1.83a.707.707 0 0 1-1 1L8 9l-1.83 1.82a.707.707 0 0 1-1-1L7 8 5.18 6.17a.707.707 0 0 1 1-1L8 7l1.83-1.82a.707.707 0 0 1 1 1z' fill='currentColor'/></svg>",
  'image':
    "<svg viewBox='0 0 14 14'><path d='M11.6 0A2.41 2.41 0 0 1 14 2.4v9.2a2.39 2.39 0 0 1-.66 1.68l-.32.29h-.05a2.22 2.22 0 0 1-.39.23c-.143.06-.29.11-.44.15a2.73 2.73 0 0 1-.5.05h-9.2A3.27 3.27 0 0 1 2 14l-.34-.16-.17-.05-.28-.13-.1-.06a2.61 2.61 0 0 1-.27-.19A2.41 2.41 0 0 1 0 11.6V2.4A2.41 2.41 0 0 1 2.4 0h9.2zm0 12.6a1.19 1.19 0 0 0 .26-.05L8.7 8.34l-2.65 3.59a.7.7 0 0 1-1.12 0l-1-1.33-1.53 2h9.2zm1-1.4l-.03-8.8a1 1 0 0 0-1-1h-9.2a1 1 0 0 0-1 1v9.24l2-2.64a.73.73 0 0 1 1.12 0l1 1.29 2.65-3.54a.73.73 0 0 1 1.12 0l3.34 4.45zM5 2.55a2.41 2.41 0 1 1-.1 4.819A2.41 2.41 0 0 1 5 2.55zM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' fill='currentColor' fill-rule='evenodd'/></svg>",
  'info':
    "<svg viewBox='0 0 16 16'><path d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 14.6A6.61 6.61 0 0 0 14.6 8 6.6 6.6 0 1 0 8 14.6zM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1 4.69v.05a.7.7 0 1 1 0 1.4H7a.7.7 0 0 1 0-1.4h.3V8.39H7a.7.7 0 0 1 0-1.4h1a.7.7 0 0 1 .7.7v3H9z' fill='currentColor' fill-rule='evenodd'/></svg>",
  'success':
    "<svg viewBox='0 0 16 16'><path d='M8 0a8 8 0 1 0 5.657 2.343A8 8 0 0 0 8 0zm0 14.6A6.6 6.6 0 1 1 14.6 8 6.6 6.6 0 0 1 8 14.6zm3.79-9.27a.69.69 0 0 1 0 1l-4.34 4.34a.71.71 0 0 1-1 0L4.21 8.41a.707.707 0 0 1 1-1L7 9.18l3.8-3.85a.71.71 0 0 1 .99 0z' fill='currentColor'/></svg>",
  'warning':
    "<svg viewBox='0 0 16 16'><path d='M8 0a8 8 0 1 1-8 8 8 8 0 0 1 8-8zm0 1.4A6.6 6.6 0 1 0 14.6 8 6.6 6.6 0 0 0 8 1.4zm.05 8.66a1 1 0 0 1 1.05 1.05 1.05 1.05 0 1 1-1.05-1.05zm.35-5.966a.7.7 0 0 1 .35.606v3.61a.7.7 0 0 1-1.4 0V4.7a.7.7 0 0 1 1.05-.606z' fill='currentColor'/></svg>",
};

const systemLibrary: FwIconLibrary = {
  name: 'system',
  resolver: (name: keyof typeof crayons_system_icons) => {
    if (crayons_system_icons[name]) {
      return `data:image/svg+xml,${encodeURIComponent(
        crayons_system_icons[name]
      )}`;
    } else {
      return '';
    }
  },
};

export default systemLibrary;
