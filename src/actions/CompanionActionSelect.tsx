import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useInstanceData } from "../InstanceData";

export default function CompanionActionSelect(props: {
  name: string;
  target: string;
  options: string[];
}) {
  const { name, target, options } = props;
  const {value, update} = useInstanceData(target);

  const handleChange = (event: SelectChangeEvent) => {
    update(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value}
        label={name}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.replace(" ", "_")}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
