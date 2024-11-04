import { TemplateData } from "./loader";

type TypeChecker<T> = (value: any) => T;

export const getProperty = <T,>(obj: object, property: string, asserter: TypeChecker<T>): T => {
  const value = Reflect.get(obj, property);
  return asserter(value);
}

export const or = <T,S>(a: TypeChecker<T>, b: TypeChecker<S>): (value: any) => T | S  => {
  return (value) => {
    try {
      return a(value)
    } catch (_) {
      return b(value)
    }
  }
}

export const isUndefined = (value: any): undefined => {
  if (typeof value !== "undefined") {
    throw new Error(`must be undefined`);
  }
  return value;
}

export const isBoolean = (value: any): boolean => {
  if (typeof value !== "boolean") {
    throw new Error(`must be a boolean`);
  }
  return value;
}

export const isNumber = (value: any): number => {
  if (typeof value !== "number") {
    throw new Error(`must be a number`);
  }
  return value;
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

export const replaceTagInObject = (id: string, targetValue: string, data: object) => {
  const stringified = JSON.stringify(data)
  const replaced = stringified.replaceAll(`\$\{${id}\}`, targetValue)
  return JSON.parse(replaced);
} 