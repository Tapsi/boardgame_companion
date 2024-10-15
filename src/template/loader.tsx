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
import { isNumber, isObject, isString } from "./json";
import { Decks } from "../elements/Decks";

type MultipyCommand = { times: number, property: string, index: string }

export type TemplateData = object & { type?: string, $multiply?: MultipyCommand  };

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
  "DECK": Deck,
  "DECKS": Decks
};

export const renderComponent: TemplateRender = (data: TemplateData): ReactElement => {
  const type = data.type;
  if (!type) throw new Error("template type was not defined");
  if (typeof type !== "string") throw new Error("template type must be a string");
  
  const sanitizedType = type.toString().toUpperCase();
  const componentType = Object.keys(TemplateComponents).find((compKey) => sanitizedType === compKey)
  if (!componentType) throw new Error(`unknown template type ${type}`);

  if (data.$multiply) {
    isObject(data.$multiply);

    const times = isNumber(data.$multiply.times);
    const indexKey = isString(data.$multiply.index);
    const property = isString(data.$multiply.property);
    const rawPropertyData = Reflect.get(data, property);

    if (!rawPropertyData) throw new Error("unknown property which should be multiplied")
    
    const rawTemplate = JSON.stringify(rawPropertyData);
    const newPropertyData = []
    for (let i = 1; i <= times; i++) {
      const indexedRawTemplate = rawTemplate.replaceAll(`\$\{${indexKey}\}`, i.toString());
      newPropertyData.push(JSON.parse(indexedRawTemplate));
    }
    
    Reflect.set(data, property, newPropertyData);
    Reflect.set(data, "$multiply", undefined);
  }

  return TemplateComponents[componentType](renderComponent, data);
};
