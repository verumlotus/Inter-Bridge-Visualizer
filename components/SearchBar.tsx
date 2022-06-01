import { Autocomplete, TextField } from "@mui/material";

export default function SearchBar(props) {
    const {options = [], label = "Search here...", onSubmitFn} = props;
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={label} />}
            onChange={(event, value) => onSubmitFn(value)}
        />
    );
}