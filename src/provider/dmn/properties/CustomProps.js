import { TextFieldEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'dmn-js-properties-panel';
import { getBusinessObject, is } from 'dmn-js-shared/lib/util/ModelUtil';

/**
 * @returns {Array<Entry>} entries
 */
export function CustomProps({ element }) {
  const businessObject = getBusinessObject(element);

  if (is(element, 'dmn:Definitions')) {
    // Show Custom Name and Custom Timestamp only for the root definitions element
    return [
      {
        id: 'customName',
        element,
        component: CustomName,
        isEdited: isTextFieldEntryEdited
      },
      {
        id: 'customTimestamp',
        element,
        component: CustomTimestamp,
        isEdited: isTextFieldEntryEdited
      }
    ];
  } else {
    // Show Custom Type for all other elements
    return [
      {
        id: 'customType',
        element,
        component: CustomType,
        isEdited: isTextFieldEntryEdited
      }
    ];
  }
}

function CustomName({ element, id }) {
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');

  const getValue = () => {
    return getBusinessObject(element).get('custom:name') || ''; // Fetch from the businessObject
  };

  const setValue = (value) => {
    modeling.updateProperties(element, {
      'custom:name': value // Update the businessObject with the custom property
    });
  };

  return TextFieldEntry({
    element,
    id,
    label: translate('Custom Name'),
    debounce,
    getValue,
    setValue
  });
}

function CustomTimestamp({ element, id }) {
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');

  const getValue = () => {
    return getBusinessObject(element).get('custom:timestamp') || ''; // Fetch from the businessObject
  };

  const setValue = (value) => {
    modeling.updateProperties(element, {
      'custom:timestamp': value // Update the businessObject with the custom property
    });
  };

  return TextFieldEntry({
    element,
    id,
    label: translate('Custom Timestamp'),
    debounce,
    getValue,
    setValue
  });
}

function CustomType({ element, id }) {
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');

  const getValue = () => {
    return getBusinessObject(element).get('custom:type') || ''; // Fetch from the businessObject
  };

  const setValue = (value) => {
    modeling.updateProperties(element, {
      'custom:type': value // Update the businessObject with the custom property
    });
  };

  return TextFieldEntry({
    element,
    id,
    label: translate('Custom Type'),
    debounce,
    getValue,
    setValue
  });
}