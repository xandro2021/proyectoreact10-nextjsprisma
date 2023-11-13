import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState('');

  const router = useRouter();

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
    const [categoria] = categorias.filter(categoriaStatement => categoriaStatement.id === id);
    setCategoriaActual(categoria);
    // Redireccionar al usuario a la pagina principal que muestra los productos de dicha categoria
    router.push('/');
  };

  const handleSetProducto = producto => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {

    if (pedido.some(productoState => productoState.id === producto.id)) {

      const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState);

      setPedido(pedidoActualizado);
      toast.success('Pedido Correctamente Modificado');
    }
    else {
      setPedido([...pedido, producto]);
      toast.success('Agregado al Pedido');
    }

    setModal(false);
  };

  const handleEditarCantidades = id => {
    const [productoActualizar] = pedido.filter(producto => producto.id === id);
    setProducto(productoActualizar);
    setModal(!modal);
  };

  const handleEliminarProducto = id => {
    const pedidoActualizado = pedido.filter(producto => producto.id !== id);
    setPedido(pedidoActualizado);
    toast.success('Pedido Correctamente Modificado');
  }

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
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
