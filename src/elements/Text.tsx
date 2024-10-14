import { Typography } from "@mui/material";
import { getProperty, isString } from "../template/json";
import { useMemo } from "react";
import { TemplateComponent, TemplateData, TemplateRender } from "../template/loader";

export const Text: TemplateComponent = (
  _: TemplateRender,
  data: TemplateData
) => {
  const text = useMemo(() => getProperty(data, "value", isString), [data]);

  return <Typography variant="body2">{text}</Typography>;
};
