import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { isUndefined } from 'lodash';
import PropTypes from 'prop-types';

const SelectComponent = (props) => {

    const { label, name, defaultValue, options, language, menuTitle, disabled} = props;
    const methods = useFormContext()

    return (
    <FormControl

    className={`select-${name}`}
    fullWidth
    focused={false}
  >
    <InputLabel id={`select-${name}`}>{label}</InputLabel>
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={methods.control}
      render={({ field }) => (
        <Select
        {...field}
        labelId={`select-${name}`}
        label={label}
        disabled={disabled}
        value={field.value.id ? field.value.id : ""}
        onChange={(event) => {
          const selected = options.find((el) => el.id === event.target.value);
          field.onChange(selected);
        }}
        >
                {options.map((code, key) => (
                  <MenuItem key={key} value={code.id}>
                    {isUndefined(menuTitle) ? code.text[language] : code[menuTitle]}
                  </MenuItem>
                ))}
              </Select>
      )}
    />
  </FormControl>
  )
}
SelectComponent.propTypes = {
    methods: PropTypes.object,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    options: PropTypes.array.isRequired,
    language: PropTypes.string,
    menuTitle: PropTypes.string,
    disabled: PropTypes.bool
  };
  
  SelectComponent.defaultProps = {
    methods: {},
    defaultValue: {},
    language: 'de',
    menuTitle: undefined,
    disabled: false
  };

  export default SelectComponent;