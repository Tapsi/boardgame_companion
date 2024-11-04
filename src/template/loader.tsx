import { ReactElement, useEffect, useState } from "react";
import { isNumber, isObject, isString } from "./json";
import { ENTITY_STATUS, TemplateSchema, useTemplatesStore } from "../persistence/db";
import { TemplateComponents, TemplateData, TemplateRender } from "./model";

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


export const useTemplate = (id: string) => {
  const { update, get } = useTemplatesStore();
  const [ data, setData ] = useState<any|null>(null); 

  useEffect(() => {
    if (!data) {
      get(id)?.then(setData);
    }
  }, [id]);

  return {
    data,
    status: data === null ? ENTITY_STATUS.LOADING : ENTITY_STATUS.OK,
    update: (data: TemplateSchema) => {
      return update(data);
    }
  }
}