import {
  Badge,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useInstanceValueKeys, useInstanceValues } from "../model/storageHooks";
import {
  TemplateComponent,
  TemplateData,
  TemplateRender,
} from "../template/model";
import { useDeferredValue, useMemo, useState } from "react";
import { getProperty, isString } from "../template/json";
import { useTemplateEditor } from "../template/editor";

export const Value: TemplateComponent = (
  _: TemplateRender,
  data: TemplateData
) => {
  const reference = getProperty(data, "reference", isString);
  const { value } = useInstanceValues(reference);
  const { ids } = useInstanceValueKeys();
  const { inTemplateMode } = useTemplateEditor();

  if (inTemplateMode) {
    return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Reference</InputLabel>
        <Select
          value={reference}
          label="Reference"
          onChange={(event) => {
            console.log("selected", event.target.value)
            Reflect.set(data, "reference", event.target.value)
          }}
        >
          {ids.map((key, index) => (
            <MenuItem key={index} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return <Typography variant="body2">{value}</Typography>;
};
