import React, { Fragment, useState, useEffect, Component } from 'react';
import { LoadFiles } from './LoadFiles';
import fondo from '../imagenes/fondotodos.png';
import { eventoService } from '../services/evento.service';
import { storage } from "../storage.js";
import Cookies from 'universal-cookie';
const cookies = new Cookies();



class Categorias extends Component {

  componentDidMount() {

    //---------------------------------
    // Obtén la cadena de consulta de la URL
    const queryString = window.location.search;

    // Parsea la cadena de consulta para obtener los parámetros
    const urlParams = new URLSearchParams(queryString);

    // Obtiene el valor del parámetro 'path'
    const security = urlParams.get('path');
    //console.log("Valor de security: ", security);
    //--------------------------------

    this.buscaValor(security).then(_valor => {

      const _Usuario= storage.GetStorage("Sgm_cUsuario");

      if (!_Usuario) {

       // console.log(_valor);

        if (_valor == true) {

          //console.log("entro redireccionamiento");
          window.location.href = "./gestcon";
        }

      }

      // Puedes hacer más cosas con los datos aquí si es necesario
    }).catch(error => {
      console.error('Error en la solicitud a la API:', error);
    });

    //---------------------------------
  };

  buscaValor = async (parametro) => {

    let _valor = false;

    //const [_directorio, setDatos] = useState([]);

    try {
      const _directorio = await eventoService.obtenerDirectorios();

      _valor = await this.buscarSecurityPorParametro(_directorio, parametro);

      //  setDatos(directorio);
      //console.log('valor de _valor encontrado : ', _valor);

    } catch (error) {
      console.error('Error al cargar datos:', error);
    }

    return _valor;
    //return buscarSecurityPorParametro(_directorio, parametro)
  }

  buscarSecurityPorParametro = async (json, parametro) => {
    // Función recursiva para buscar en el JSON
    const buscarEnJSON = (json, parametro) => {
      for (let i = 0; i < json.length; i++) {
        const elemento = json[i];

        // Verificar si el parámetro coincide con el campo "path"
        if (elemento.path === parametro) {
          return elemento.security;
        }

        // Si hay hijos, buscar recursivamente en ellos
        if (elemento.tabChildren && elemento.tabChildren.length > 0) {
          const resultadoHijo = buscarEnJSON(elemento.tabChildren, parametro);
          if (resultadoHijo !== null) {
            return resultadoHijo;
          }
        }
      }

      // Si no se encuentra el parámetro, retornar null
      return null;
    };
    // Llamar a la función recursiva con el JSON y el parámetro
    return buscarEnJSON(json, parametro);
  };

  render() {

    const fondoStyle = {
      backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${fondo})`, // Opacidad agregada con rgba
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      // Otras propiedades de estilo según tus necesidades
    };


    return (

      <div style={fondoStyle}>
        <LoadFiles pCategory={this.props.pCategory} />
      </div>

    );
  }
};

export default Categorias;
