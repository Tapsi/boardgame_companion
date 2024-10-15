import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import {
  TemplateComponent,
  TemplateData,
  TemplateRender,
} from "../template/loader";
import {
  getProperty,
  isString,
  isTemplate,
  isUndefined,
  or,
} from "../template/json";

export const Panel: TemplateComponent = (
  render: TemplateRender,
  data: TemplateData
) => {
  const children = useMemo(
    () => getProperty(data, "content", isTemplate),
    [data]
  );
  const title = useMemo(() => getProperty(data, "title", isString), [data]);

  return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>

          {render(children)}
        </CardContent>

        <Divider />

        <CardActions>
        </CardActions>
      </Card>
  );
};
