import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useMemo, useState } from "react";
import { TemplateComponent, TemplateData, TemplateRender } from "../template/model";
import { getProperty, isArrayOf, isObject, isString, isTemplate } from "../template/json";

const isTabModel = (value: any) => {
  const obj = isObject(value);
  return {
    title: getProperty(obj, "title", isString),
    content: getProperty(obj, "content", isTemplate)
  }
} 

export const Tabs: TemplateComponent = (render: TemplateRender, data: TemplateData) => {
  const tabs = useMemo(() => getProperty(data, "tabs", isArrayOf(isTabModel)), [data]);
  const [activeTab, setActiveTab] = useState("1");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.title}
                value={(index + 1).toString()}
              />
            ))}
          </TabList>
        </Box>

        {tabs.map((tab, index) => (
          <TabPanel key={index} value={(index + 1).toString()}>
            {render(tab.content)}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};