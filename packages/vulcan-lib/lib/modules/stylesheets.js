import { getUiOptions } from './ui.js';

export const Stylesheets = {}; // will be populated on startup (see vulcan:routing)
export const StylesheetsTable = {}; // storage for infos about stylesheets

export const registerStylesheet = (name, rawComponent, options) => {
  const {
    framework,
    theme,
  } = getUiOptions(options);
  if (!StylesheetsTable[name]) {
    StylesheetsTable[name] = {
      [framework]: {
        [theme]: rawComponent
      }
    };
  } else if(!StylesheetsTable[name][framework]) {
    StylesheetsTable[name][framework] = {
      [theme]: rawComponent
    };
  } else {
    StylesheetsTable[name][framework][theme] = rawComponent;
  }
};

export const getStylesheet = (name, options) => {
  const {
    framework,
    theme,
  } = getUiOptions(options);
  const stylesheet = StylesheetsTable[name];
  if (!stylesheet) {
    throw new Error(`Stylesheet ${name} not registered.`);
  } else if (!stylesheet[framework]) {
    throw new Error(`Stylesheet ${name} for framework ${framework} not registered.`);
  } else if (!stylesheet[framework][theme]) {
    throw new Error(`Stylesheet ${name} from framework ${framework} with theme ${theme} not registered.`);
  }
  return stylesheet[framework][theme];
};

export const populateStylesheetsApp = () => {
  Object.keys(StylesheetsTable).forEach(name => {
    if (!Stylesheets[name]) {
      Stylesheets[name] = {};
    }
    Object.keys(StylesheetsTable[name]).forEach(framework => {
      if (!Stylesheets[name][framework]) {
        Stylesheets[name][framework] = {};
      }
      Object.keys(StylesheetsTable[name][framework]).forEach(theme => {
        Stylesheets[name][framework][theme] = getStylesheet(name, { framework, theme });
      });
    });
  });
};

export const getCurrentStylesheets = () => {
  const {
    framework,
    theme,
  } = getUiOptions(null);

  const sheets = Object.keys(StylesheetsTable)
    .filter(name => StylesheetsTable[name][framework] && StylesheetsTable[name][framework][theme])
    .map(name => StylesheetsTable[name][framework][theme]);

  return sheets;
};

export const getRawStylesheet = (name, options) => {
  const {
    framework,
    theme,
  } = getUiOptions(options);
  const stylesheet = StylesheetsTable[name];
  return stylesheet && stylesheet[framework] && stylesheet[framework][theme];
}

export const replaceStylesheet = (name, newComponent, options) => {
  return registerStylesheet(name, newComponent, options);
}
