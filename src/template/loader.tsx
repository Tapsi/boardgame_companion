import { ReactElement } from "react";
import { Value } from "../elements/Value";
import { Text } from "../elements/Text";
import { Tabs } from "../elements/Tabs";
import { Container } from "../elements/Container";
import { Column, Row } from "../elements/Stack";
import { Select } from "../elements/Select";
import { PlusMinus } from "../elements/PlusMinusValue";
import { Panel } from "../elements/Panel";
import { Deck } from "../elements/Deck";

export type TemplateData = object & { type?: string };

export type TemplateRender =  (data: TemplateData) => ReactElement;

export type TemplateComponent = (
  renderChildren: (data: TemplateData) => ReactElement,
  model: TemplateData
) => ReactElement;

const TemplateComponents: { [key: string]: TemplateComponent} = {
  "TEXT": Text,
  "VALUE": Value,
  "TABS": Tabs,
  "CONTAINER": Container,
  "COLUMN": Column,
  "ROW": Row,
  "SELECT": Select,
  "PLUS_MINUS": PlusMinus,
  "PANEL": Panel,
  "DECK": Deck
};

export const renderComponent: TemplateRender = (data: TemplateData): ReactElement => {
  const type = data.type;
  if (!type) throw new Error("template type was not defined");
  if (typeof type !== "string") throw new Error("template type must be a string");
  
  const sanitizedType = type.toString().toUpperCase();
  const componentType = Object.keys(TemplateComponents).find((compKey) => sanitizedType === compKey)
  if (!componentType) throw new Error(`unknown template type ${type}`);

  return TemplateComponents[componentType](renderComponent, data);
};
