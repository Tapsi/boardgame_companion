import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import { useMemo } from "react";
import { TemplateComponent, TemplateData, TemplateRender } from "../template/loader";
import { getProperty, isString, isTemplate } from "../template/json";


export const Panel: TemplateComponent = (render: TemplateRender, data: TemplateData) => {
  const children = useMemo(() => getProperty(data, "content", isTemplate), [data]);
  const title = useMemo(() => getProperty(data, "title", isString), [data]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          { title }
        </Typography>

        {render(children)}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};