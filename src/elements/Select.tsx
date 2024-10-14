import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import { useInstanceValues } from "../model/InstanceData";
import { TemplateData, TemplateRender } from "../template/loader";
import { useMemo } from "react";
import { getProperty, isArrayOf, isString } from "../template/json";

export const Select = (render: TemplateRender, data: TemplateData) => {
  const target = useMemo(() => getProperty(data, "target", isString), [data]);
  const name = useMemo(() => getProperty(data, "name", isString), [data]);
  const options = useMemo(
    () => getProperty(data, "options", isArrayOf(isString)),
    [data]
  );
  const { value, update } = useInstanceValues(target);

  const handleChange = (event: SelectChangeEvent) => {
    update(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={`select-${target}-label`}>{name}</InputLabel>
      <MuiSelect
        labelId={`select-${target}-label-id`}
        id={`select-${target}-id`}
        value={value}
        label={name}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.replace(" ", "_")}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
