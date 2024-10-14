import { TemplateData } from "./loader";

type TypeChecker<T> = (value: any) => T;

export const getProperty = <T,>(obj: object, property: string, asserter: TypeChecker<T>): T => {
  const value = Reflect.get(obj, property);
  return asserter(value);
}

export const isString = (value: any): string => {
  if (typeof value !== "string") {
    throw new Error(`must be a string`);
  }
  return value;
}

export const isObject = (value: any): object => {
  if (typeof value !== "object") {
    throw new Error(`must be an object`);
  }
  return value;
}

export const isTemplate = (value: any): TemplateData => {
  const obj = isObject(value);
  getProperty(obj, "type", isString);
  return value as TemplateData;
}

export const isArrayOf = <T,>(contentCheck: TypeChecker<T>): (value: any) => T[] => {
  return (value) => {
    if (!Array.isArray(value)) {
      throw new Error(`must be an array`);
    }
    if (!value.every(contentCheck)) {
      throw new Error(`must be an array of certain type`);
    }
    return value;
  }
}