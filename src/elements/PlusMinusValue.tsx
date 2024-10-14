import { Button, ButtonGroup } from "@mui/material";
import { useInstanceValues } from "../model/InstanceData";
import { TemplateData, TemplateRender } from "../template/loader";
import { getProperty, isString } from "../template/json";
import { useMemo } from "react";

export const PlusMinus = (render: TemplateRender, data: TemplateData) => {
  const reference = useMemo(() => getProperty(data, "reference", isString), [data]);
  const {value, update} = useInstanceValues(reference);

  const handleIncrease = () => {
    update((Number(value) + 1).toString());
  };

  const handleDecrease = () => {
    update((Number(value) - 1).toString());
  };

  return (
    <ButtonGroup variant="text" aria-label="Small button group">
      <Button onClick={handleDecrease}>-</Button>
      <Button disabled>{value}</Button>
      <Button onClick={handleIncrease}>+</Button>
    </ButtonGroup>
  );
};