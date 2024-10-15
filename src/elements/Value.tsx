import { Typography } from "@mui/material";
import { useInstanceValues } from "../model/storageHooks";
import { TemplateComponent, TemplateData, TemplateRender } from "../template/loader";
import { useMemo } from "react";
import { getProperty, isString } from "../template/json";

export const Value: TemplateComponent = (
  _: TemplateRender,
  data: TemplateData
) => {
  const reference = useMemo(() => getProperty(data, "reference", isString), [data]);
  const { value } = useInstanceValues(reference);

  return <Typography variant="body2">{value}</Typography>;
};
