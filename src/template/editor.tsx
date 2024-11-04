import { TemplateComponentType } from "./model";
import { useTemplateMode } from "./templateMode";

const removeFromTemplate = () => {

};

const addToTemplate = (type: TemplateComponentType) => {

};

export const useTemplateEditor = () => {
  const { inTemplateMode } = useTemplateMode();
  
  return { inTemplateMode, addToTemplate, removeFromTemplate }
};