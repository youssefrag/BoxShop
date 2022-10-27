import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const values = [1, 2, 3, 4, 5];

export const SelectQuantity = (props) => {
  const { quantity, setQuantity } = props;

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, width: 60 }}>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={quantity}
          onChange={handleQuantityChange}
          input={<OutlinedInput label="" />}
        >
          {values.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
