import React, { useEffect, useState } from 'react'
import { Styler } from '../../components/Styler/Styler';
import {  CircularProgress } from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';
import Titulo from '../../components/common/Titulo/Titulo';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Mapa from '../../components/Mapa/Mapa';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { NumberPicker } from 'react-widgets';

const Main = ({usuario}) => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const [lineas, setLineas] = useState([]);
  const [lineasFiltradas, setLineasFiltradas] = useState([]);
  const [sentido, setSentido] = useState([1]);
  const [numLinea, setNumLinea] = useState([1]);
 

  const getLogs = async () => {
    setLineas([])
    setLineasFiltradas([])
  


    // const response = await axios.get("http://localhost:8000/lineas");
    const response = await axios.get("http://localhost:8000/lineas");
    setCargando(false);
    setLineas(response.data)
    setLineasFiltradas(lineas)
  }

  useEffect(() => {
    getLogs()
  }, [cargando]);

  /******************************** FILTROS ********************************/

  const setDefault = () =>{
    setLineasFiltradas(lineas);
    
  };

  const handleSearchByName = (value) => {
    filterDataByName(value);
  };

  const handleSearchBySentidoAndLinea = () =>{
    
    filterBySentidoAndLinea();
  };


  const handleSearchByDireccion = (value) => {
    filterDataByAddress(value);
  };
  

  const filterDataByName = async (value) => {
  
    if (value !== ""){
     const result = await  axios.get("http://localhost:8000/lineas/" + value);   
     
     //axios.post("http://localhost:8000/logs/" + usuario.token.credential + "/filtrar?name = " + value );
           
     setLineasFiltradas(result.data);
     console.log(value);
    }else{
      setDefault();
      console.log("value es vacio");
    }
  };

  const filterDataByAddress = async (value) => {
  
    if (value !== ""){
      const result = await  axios.get("http://localhost:8000/lineas/direccion" + value);      
      setLineasFiltradas(result.data);
      console.log(value);
    }else{
      setDefault();
      console.log("value es vacio")
    }
  };
  const filterBySentidoAndLinea = async() =>{

    console.log(sentido);
    console.log(numLinea);
    
    const result = await  axios.get("http://localhost:8000/lineas/" + sentido + "/"+ numLinea);   
    setLineasFiltradas(result.data);
  
    
  };

  
  /******************************** CARGANDO ********************************/
  if (cargando) {
    return (
      <div align="center" style={Styler.loading}>
        <CircularProgress />
      </div>);
    /******************************** MOSTRAR FILTROS Y MAPA ********************************/
  } else {
    return (
      <div class="page" style={Styler.page}>
        <Container maxWidth="xl" sx={{ mb: 3 }}>
          <Titulo titulo="Bienvenido a EMTInfo" />

          <h3>Buscar por nombre de parada</h3>
          <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
            
            <Grid item md={3}>
              <SearchBar
                style={Styler.pads}
                placeholder="Buscar por nombre de parada"
                onChange={(event) => handleSearchByName(event.target.value)}
                searchBarWidth='720px'
              />

            </Grid>
          </Grid>
          <h3>Buscar por linea y sentido</h3>
          <Grid container spacing={2} sx={{ border: 1 }}>

            <Grid item md={3}>
              <h3>Linea:</h3>
              <NumberPicker
               
               onChange={value => setNumLinea(value)}
               defaultValue={0} step={1} min ={1} max={5} />


              <h3>Sentido:</h3>
              <NumberPicker
              onChange={value => setSentido(value)}
              defaultValue={0} step={1} min ={1} max={2} />


              <Grid sx={{ p: 2 }}>
                <Button variant="contained"
                 onClick ={() =>{
                  handleSearchBySentidoAndLinea()
                }}>Filtrar</Button>
              </Grid>

              
                   
              <Grid sx={{ p: 2 }}>
                <Button variant="contained"
                 onClick ={() =>{
                  setDefault();
                }}>Todas las lineas y sentidos</Button>
              </Grid>
              
            </Grid>
          </Grid>

          <h3>Buscar por nombre dirección</h3>
          <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
            
            <Grid item md={3}>
              <SearchBar
                style={Styler.pads}
                placeholder="Buscar por dirección"
                onChange={(event) => handleSearchByDireccion(event.target.value)}
                searchBarWidth='720px'
              />

            </Grid>
          </Grid>



          <Container maxWidth="xl" sx={{ mb: 3 }}>
            <Titulo titulo="Mapa de lineas" />

            <Mapa lineas={lineasFiltradas} />

          </Container>
        </Container>
      </div >
    )
  }
}

export default Main

/*

 const handleSearch = (value) => {
    filterData(value);
  };

  const filterData = (value) => {
    console.log(value)
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") {
      setLineasFiltradas(lineas);
      console.log("lowercasedValue es vacio")
    } else {
      setArticulosFiltrados([])
      articulosCopia.forEach(element => {
        if (element.descripcion.toLowerCase().includes(lowercasedValue)) {
          articulosFiltrados.push(element)
        }
      });
      setArticulos(articulosFiltrados)
    };
  };


          <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
            <Grid item md={3}>
              <SearchBar
                style={Styler.pads}
                placeholder="Buscar por descripción"
                onChange={(event) => handleSearch(event.target.value)}
                searchBarWidth='720px'
              />

            </Grid>
          </Grid>




 const filterData = (value) => {
    setValues(value)
    console.log(value)

    // const lowercasedValue = value.toLowerCase().trim();

    if (lowercasedValue === "") {
      setArticulos(articulosCopia);
      console.log("lowercasedValue es vacio")
    } else {
      setArticulosFiltrados([])
      articulosCopia.forEach(element => {
        if (element.descripcion.toLowerCase().includes(lowercasedValue)) {
          articulosFiltrados.push(element)
        }
      });
      setArticulos(articulosFiltrados)
    };
  };

 <TextField
            type="number"
            placeholder='Numero Línea'
            fullWidth label="Linea" {...register('numeroLinea')}
            error={errors.numeroLinea ? true : false}
            helperText={errors.precio?.message}
            name='numeroLinea' required
            onChange={(event) => handleChange({ ...values, precio: event.target.value })}
          />


*/