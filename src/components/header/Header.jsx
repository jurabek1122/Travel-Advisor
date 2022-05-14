import { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import { Autocomplete } from '@react-google-maps/api';
import { BiSearchAlt2 } from 'react-icons/bi';
import useStyles from './styles';


const Header = ({ setCordinates }) => {

    const classes = useStyles();
    const [autocomplete, seAutocomplete] =useState(null)

    const onLoad = (autoC) => seAutocomplete(autoC)

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCordinates({ lat, lng})
    }

    return(
         <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <BiSearchAlt2 />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
    );
}

export default Header;