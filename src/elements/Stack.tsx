import { Box, Stack as MuiStack } from "@mui/material";
import { TemplateComponent, TemplateData, TemplateRender } from "../template/loader";
import { getProperty, isArrayOf, isTemplate } from "../template/json";
import { useMemo } from "react";


const Stack = (render: TemplateRender, data: TemplateData, direction: "column" | "row") => {
  const children = useMemo(() => getProperty(data, "content", isArrayOf(isTemplate)), [data]);

  return (
    <MuiStack direction={direction} spacing={2}>
      {children.map((template, index) => (
        <Box key={index} style={{ alignContent: "center"}}>{render(template)}</Box>
      ))}
    </MuiStack>
  );
};

export const Row: TemplateComponent = (render: TemplateRender, data: TemplateData) => {
  return Stack(render, data, "row");
};

export const Column: TemplateComponent = (render: TemplateRender, data: TemplateData) => {
  return Stack(render, data, "column");
};