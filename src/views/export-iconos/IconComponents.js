// En un archivo llamado IconComponents.js
import React from 'react';
import ExcelIcon from '../../imagenes/icons/excel.png';
import ImagenIcon from '../../imagenes/icons/imagen.png';
import OtherFileIcon from '../../imagenes/icons/other.png';
import PowerPointIcon from '../../imagenes/icons/powerpoint.png';
import FileIcon from '../../imagenes/icons/video.png';
import winrar from '../../imagenes/icons/rar.png';
import WordIcon from '../../imagenes/icons/word.png';
import zip from '../../imagenes/icons/zip.png';
import music from '../../imagenes/icons/music.png';

export const IconForXlsx = () => {
  return <img src={ExcelIcon} alt="Icono de Excel" width="28" height="28" />;
};

export const IconForImagenes = () => {
  return <img src={ImagenIcon} alt="Icono de Imagen" width="28" height="28" />;
};

export const IconForOtherFile = () => {
  return <img src={OtherFileIcon} alt="Icono de Otro Tipo de Archivo" width="28" height="28" />;
};

export const IconForPptx = () => {
  return <img src={PowerPointIcon} alt="Icono de PowerPoint" width="28" height="28" />;
};

export const IconForVideo = () => {
  return <img src={FileIcon} alt="Icono de Video" width="28" height="28" />;
};

export const IconForWinrar = () => {
  return <img src={winrar} alt="Icono de Winrar" width="28" height="28" />;
};

export const IconForDocx = () => {
  return <img src={WordIcon} alt="Icono de Word" width="28" height="28" />;
};

export const IconForZip = () => {
  return <img src={zip} alt="Icono de ZIP" width="28" height="28" />;
};

export const IconForMusic = () => {
  return <img src={music} alt="Icono" width="28" height="28" />;
};