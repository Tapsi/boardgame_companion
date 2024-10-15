import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useInstanceValues } from "../model/storageHooks";
import { TemplateData, TemplateRender } from "../template/loader";
import { getProperty, isString } from "../template/json";
import { useMemo } from "react";

export const PlusMinus = (render: TemplateRender, data: TemplateData) => {
  const reference = useMemo(
    () => getProperty(data, "reference", isString),
    [data]
  );
  const text = useMemo(() => getProperty(data, "value", isString), [data]);
  const { value, update } = useInstanceValues(reference);

  const handleIncrease = () => {
    update((Number(value) + 1).toString());
  };

  const handleDecrease = () => {
    update((Number(value) - 1).toString());
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="body1" style={{ textAlign: "center" }}>
          {text}
        </Typography>
      </CardContent>

      <Divider />

      <CardActions>
        <ButtonGroup variant="text" aria-label="Small button group">
          <Button onClick={handleDecrease}> - </Button>
          <Button disabled>{value}</Button>
          <Button onClick={handleIncrease}> + </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};
