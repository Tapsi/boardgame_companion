import { useMemo } from "react";
import {
  TemplateComponent,
  TemplateData,
  TemplateRender,
} from "../template/model";
import { getProperty, isNumber, isObject, isString, replaceTagInObject } from "../template/json";

export const MultipleTimes: TemplateComponent = (
  render: TemplateRender,
  data: TemplateData
) => {
  const numberOfTimes = useMemo(
    () => getProperty(data, "times", isNumber),
    [data]
  );
  const iteratorTag = useMemo(
    () => getProperty(data, "iteratorTag", isString),
    [data]
  );
  const template = useMemo(
    () => getProperty(data, "template", isObject),
    [data]
  );

  const convertedTemplates = [];
  for (let i = 0; i < numberOfTimes; i++) {
    convertedTemplates.push(replaceTagInObject(iteratorTag, (i + 1).toString(), template));
  }

  return <>{convertedTemplates.map((template) => render(template))}</>;
};
