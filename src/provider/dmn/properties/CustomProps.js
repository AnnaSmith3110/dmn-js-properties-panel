import { TextFieldEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'dmn-js-properties-panel';
import { getBusinessObject } from 'dmn-js-shared/lib/util/ModelUtil';

/**
 * @returns {Array<Entry>} entries
 */
export function CustomProps({ element }) {
  return [
    {
      id: 'customName',
      element: element,
      component: CustomName,
      isEdited: isTextFieldEntryEdited
    },
    {
      id: 'customTimestamp',
      element: element,
      component: CustomTimestamp,
      isEdited: isTextFieldEntryEdited
    }
  ];
}

function CustomName({ element, id }) {
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');

  return TextFieldEntry({
    element,
    id,
    label: translate('Custom Name'),
    debounce,
    getValue: (element) => {
      return getBusinessObject(element).get('custom:name');
    },
    setValue: (value) => {
      modeling.updateProperties(element, {
        'custom:name': value
      });
    }
  });
}

function CustomTimestamp({ element, id }) {
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');

  return TextFieldEntry({
    element,
    id,
    label: translate('Custom Timestamp'),
    debounce,
    getValue: (element) => {
      return getBusinessObject(element).get('custom:timestamp');
    },
    setValue: (value) => {
      modeling.updateProperties(element, {
        'custom:timestamp': value
      });
    }
  });
}
