import { Value } from "../elements/Value";
import { Text } from "../elements/Text";
import { Tabs } from "../elements/Tabs";
import { Container } from "../elements/Container";
import { Column, Row } from "../elements/Stack";
import { Select } from "../elements/Select";
import { PlusMinus } from "../elements/PlusMinusValue";
import { Panel } from "../elements/Panel";
import { Deck } from "../elements/Deck";
import { Decks } from "../elements/Decks";
import { ReactElement } from "react";
import { MultipleTimes } from "../elements/MultipleTimes";

type MultipyCommand = { times: number, property: string, index: string }

export type TemplateData = object & { type?: string, $multiply?: MultipyCommand };

export type TemplateRender =  (data: TemplateData) => ReactElement;

export type TemplateComponent = (
  renderChildren: (data: TemplateData) => ReactElement,
  model: TemplateData
) => ReactElement;

export enum TemplateComponentType {
  TEXT,
  VALUE,
  TABS,
  CONTAINER,
  COLUMN,
  ROW,
  SELECT,
  PLUS_MINUS,
  PANEL,
  DECK,
  DECKS,
  MULTIPLE_TIMES
};

export const TemplateComponents: { [key: string]: TemplateComponent} = {
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
  "DECKS": Decks,
  "MULTIPLE_TIMES": MultipleTimes,
};