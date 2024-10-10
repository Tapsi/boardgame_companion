import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab  } from "@mui/material";
import React, { ReactElement, useState } from "react";

export default function CompanionTabs(props: { model: {
  title: string;
  content: ReactElement;
}[] }) {
  const { model } = props;
  const [activeTab, setActiveTab] = useState('1');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {model.map((tab, index) => (
              <Tab key={index} label={tab.title} value={(index + 1).toString()} />
            ))}
          </TabList>
        </Box>

        {model.map((tab, index) => (
          <TabPanel key={index} value={(index + 1).toString()}>
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}