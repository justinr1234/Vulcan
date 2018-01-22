import { getSetting } from './settings.js';

export const getUiOptions = (options) => {
  return {
    framework: getSetting('ui.framework', 'bootstrap3'),
    theme: getSetting('ui.theme', 'default'),
    ...options
  };
};
