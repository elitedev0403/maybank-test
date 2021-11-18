import { Grid } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import PlacesAutocomplete from 'react-places-autocomplete';

type AutoCompleteProps = {
    handleSelect: (address: string) => void;
    handleChange: (address: string) => void;
    currentAddr: string;
}

export const AutoComplete = (props: AutoCompleteProps) => {
    const { currentAddr, handleSelect, handleChange } = props;
    const classes = useStyles();

    return (
        <form onSubmit={() => handleSelect(currentAddr)}>
            <Grid item xs={12} className={classes.inputbox}>
                <PlacesAutocomplete
                    value={currentAddr}
                    onChange={handleChange}
                    onSelect={handleSelect}
                >
                    {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading
                    }) => (
                        <div>
                            <TextField
                                style={{ backgroundColor: 'white', width: '400px' }}
                                variant="outlined"
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input'
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer', padding: 10 }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer', padding: 10 };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style
                                            })}
                                            key={suggestion.placeId}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </Grid>
        </form>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    inputbox: {
        position: 'absolute',
        top: 50,
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        zIndex: 100,
    },
}));

export default React.memo(AutoComplete);