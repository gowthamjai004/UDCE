import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function CollectionSelector({
  collections,
  collection,
  onCollectionChange,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel>Collection</InputLabel>

      <Select
        value={collection}
        label="Collection"
        onChange={onCollectionChange}
      >
        <MenuItem value="">
          <em>Select Collection</em>
        </MenuItem>

        {collections.map((col) => (
          <MenuItem key={col} value={col}>
            {col}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CollectionSelector;