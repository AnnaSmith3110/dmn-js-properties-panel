import { Group } from '@bpmn-io/properties-panel';

import {
  DocumentationProps,
  IdProps,
  NameProps,
  CustomProps
} from './properties';

export default class DmnPropertiesProvider {

  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(this);
  }

  getGroups(element) {
    return (groups) => {
      return [
        ...groups,
        ...getGroups(element)
      ];
    };
  }

}

DmnPropertiesProvider.$inject = [ 'propertiesPanel' ];


function getGroups(element) {

  const groups = [
    GeneralGroup(element),
    DocumentationGroup(element),
    CustomGroup(element)
  ];

  // contract: if a group returns null, it should not be displayed at all
  return groups.filter(group => group !== null);
}

function GeneralGroup(element) {

  const entries = [
    ...NameProps({ element }),
    ...IdProps({ element })
  ];

  return {
    id: 'general',
    label: 'General',
    entries,
    component: Group
  };
}

function DocumentationGroup(element) {
  const entries = [
    ...DocumentationProps({ element })
  ];

  if (!entries.length) {
    return null;
  }

  return {
    id: 'documentation',
    label: 'Documentation',
    entries,
    component: Group
  };
}

// Define your custom group
function CustomGroup(element) {
  const entries = [
    ...CustomProps({ element }) // This is where your custom properties are added
  ];

  return {
    id: 'custom',
    label: 'Custom Properties',
    entries,
    component: Group
  };
}