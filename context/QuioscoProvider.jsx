import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const obtenerCategorias = async () => {
      const { data } = await axios('/api/categorias');
      setCategorias(data);
      // setCategoriaActual(data[0]); /*Alternativa al segund useEffect*/
    };

    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);


  const handleClickCategoria = id => {
    const [ categoria ] = categorias.filter(categoriaStatement => categoriaStatement.id === id );
    setCategoriaActual(categoria);
  };

  const handleSetProducto = producto => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
