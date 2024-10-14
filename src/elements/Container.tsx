import { Container as MuiContainer} from "@mui/material";
import { TemplateComponent, TemplateData, TemplateRender } from "../template/loader";
import { useMemo } from "react";
import { getProperty, isTemplate } from "../template/json";


export const Container: TemplateComponent = (render: TemplateRender, data: TemplateData) => {
  const content = useMemo(() => getProperty(data, "content", isTemplate), [data]);

  return (
    <MuiContainer>
      {render(content)}
    </MuiContainer>
  );
}