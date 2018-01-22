import { compose } from 'react-apollo'; // note: at the moment, compose@react-apollo === compose@redux ; see https://github.com/apollostack/react-apollo/blob/master/src/index.ts#L4-L7
import { getUiOptions } from './ui.js';
import { Promise } from 'meteor/promise';

export const Components = {}; // will be populated on startup (see vulcan:routing)
export const ComponentsTable = {} // storage for infos about components

function getOptionsFromLastArgs(rest) {
  if (rest && Array.isArray(rest) && rest.length > 0 && typeof rest[rest.length - 1] !== 'function' && !Array.isArray(rest[rest.length - 1])) {
    return rest[rest.length - 1];
  }
  return null;
}

/**
 * Register a Vulcan component with a name, a raw component than can be extended
 * and one or more optional higher order components.
 *
 * @param {String} name The name of the component to register.
 * @param {React Component} rawComponent Interchangeable/extendable component.
 * @param {...Function} hocs The HOCs to compose with the raw component.
 *
 * Note: when a component is registered without higher order component, `hocs` will be
 * an empty array, and it's ok! 
 * See https://github.com/reactjs/redux/blob/master/src/compose.js#L13-L15
 * 
 * @returns Structure of a component in the list:
 *
 * ComponentsTable.Foo = {
 *    name: 'Foo',
 *    hocs: [fn1, fn2],
 *    rawComponent: React.Component,
 *    call: () => compose(...hocs)(rawComponent),
 * }
 *
 */
export const registerComponent = (name, rawComponent, ...rest) => {
  let hocs = rest;
  const options = getOptionsFromLastArgs(rest);
  if (options) {
    hocs.splice(hocs.length - 1, 1);
  }
  const {
    framework,
    theme,
  } = getUiOptions(options);
  // console.log('// registering component');
  // console.log(name);
  // console.log('raw component', rawComponent);
  // console.log('higher order components', hocs);
  if (!ComponentsTable[name]) {
    ComponentsTable[name] = {
      [framework]: {
        [theme]: {
          name,
          rawComponent,
          hocs,
        }
      }
    };
  } else if(!ComponentsTable[name][framework]) {
    ComponentsTable[name][framework] = {
      [theme]: {
        name,
        rawComponent,
        hocs,
      }
    };
  } else {
    ComponentsTable[name][framework][theme] = {
      name,
      rawComponent,
      hocs,
    };
  }
};

/**
 * Get a component registered with registerComponent(name, component, ...hocs).
 *
 * @param {String} name The name of the component to get.
 * @returns {Function|React Component} A (wrapped) React component
 */
export const getComponent = (name, options) => {
  const {
    framework,
    theme,
  } = getUiOptions(options);
  const {
    framework: defaultFramework,
    theme: defaultTheme,
  } = getUiOptions();
  let component;
  if (!ComponentsTable[name]) {
    throw new Error(`Component ${name} not registered.`);
  } else if (!ComponentsTable[name][framework]) {
    if (!ComponentsTable[name][defaultFramework]) {
      throw new Error(`Component ${name} with framework ${framework} or default framework ${defaultFramework} not registered.`);
    }
    if (!ComponentsTable[name][defaultFramework][defaultTheme]) {
      throw new Error(`Component ${name} with framework ${framework} or default framework ${defaultFramework} with default theme ${defaultTheme} not registered.`);
    }
    component = ComponentsTable[name][defaultFramework][defaultTheme];
  } else if (!ComponentsTable[name][framework][theme]) {
    if (!ComponentsTable[name][framework][defaultTheme]) {
      throw new Error(`Component ${name} with framework ${framework} with theme ${theme} or defeault theme ${defaultTheme} not registered.`);
    }
    component = ComponentsTable[name][framework][defaultTheme];
  } else {
    component = ComponentsTable[name][framework][theme];
  }
  const hocs = component.hocs.map(hoc => Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc);
  return compose(...hocs)(component.rawComponent);
};

/**
 * Populate the lookup table for components to be callable
 * ℹ️ Called once on app startup
 **/
export const populateComponentsApp = () => {
  const {
    framework,
    theme,
  } = getUiOptions(null);
  // loop over each component in the list
  Object.keys(ComponentsTable).forEach(name => {
      Components[name] = getComponent(name, { framework, theme });
  });
};

/**
 * Get the **raw** (original) component registered with registerComponent
 * without the possible HOCs wrapping it.
 *
 * @param {String} name The name of the component to get.
 * @returns {Function|React Component} An interchangeable/extendable React component
 */
 export const getRawComponent = (name, options) => {
  const {
    framework,
    theme,
  } = getUiOptions(options);
  return ComponentsTable[name][framework][theme].rawComponent;
};

/**
 * Replace a Vulcan component with the same name with a new component or 
 * an extension of the raw component and one or more optional higher order components.
 * This function keeps track of the previous HOCs and wrap the new HOCs around previous ones
 *
 * @param {String} name The name of the component to register.
 * @param {React Component} rawComponent Interchangeable/extendable component.
 * @param {...Function} hocs The HOCs to compose with the raw component.
 * @returns {Function|React Component} A component callable with Components[name]
 *
 * Note: when a component is registered without higher order component, `hocs` will be
 * an empty array, and it's ok! 
 * See https://github.com/reactjs/redux/blob/master/src/compose.js#L13-L15
 */
 export const replaceComponent = (name, newComponent, ...rest) => {
  let newHocs = rest;
  const options = getOptionsFromLastArgs(rest);
  if (options) {
    newHocs.splice(newHocs.length, 1);
  }
  const {
    framework,
    theme,
  } = getUiOptions(options);
  const previousComponent = ComponentsTable[name][framework][theme];
  
  // xxx : throw an error if the previous component doesn't exist

  // console.log('// replacing component');
  // console.log(name);
  // console.log(newComponent);
  // console.log('new hocs', newHocs);
  // console.log('previous hocs', previousComponent.hocs);

  return registerComponent(name, newComponent, ...newHocs, ...previousComponent.hocs, { framework, theme });
};

export const copyHoCs = (sourceComponent, targetComponent) => {
  return compose(...sourceComponent.hocs)(targetComponent);
}
