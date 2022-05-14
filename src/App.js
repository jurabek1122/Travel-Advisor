import { useState, useEffect } from 'react';
import Header from './components/header/Header';
import List from './components/list/List';
import Map from './components/map/Map';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlaceData } from './api';


function App() {

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [cordinates, setCordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({  coords: { latitude, longitude} }) => {
      setCordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces)
  }, [rating])

  useEffect(() => {
    if(bounds.sw && bounds.ne ) {
      setIsLoading(true)
      getPlaceData(type, bounds)
            .then((data) => {
              setPlaces(data)
              setFilteredPlaces([])
              setIsLoading(false)
            })
      console.log(bounds)
    }
    
  }, [type, bounds])
  console.log(places)


  return (
    <div>
      <CssBaseline />
      <Header
        setCordinates={setCordinates}
      />
      <Grid container spacing={3} style={{width: '100%'}}>
        <Grid item xs={12} md={4} >
          <List 
            places={filteredPlaces.length ? filteredPlaces : places} 
            isLoading={isLoading}
            childClicked={childClicked}
            type={type}
            setType={setType}
            reting={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCordinates={setCordinates} 
            cordinates={cordinates} 
            setBounds={setBounds} 
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
