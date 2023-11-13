import { useEffect, useCallback } from 'react';
import Layout from '../layout/Layout';
import useQuiosco from '../hooks/useQuiosco';
import { formatearDinero } from '../helpers';

const Total = () => {
  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

  // Se usa useCallback para evitar problemas con el useEffect que demanda su uso con el useCallback, o que la funcion este dentro del useEfffect
  // Se usa useCallback para que la funcion se ejecute unicamente cuando pedido cambie
  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === '';
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
      <p className="text-2xl my-10"> Confirmar tu Pedido a Continuación </p>

      <form
        onSubmit={colocarOrden}
      >
        <div>
          <label
            className="block uppercase text-slate-800 font-bold text-xl"
            htmlFor="nombre"
          >Nombre</label>

          <input
            id="nombre"
            type="text"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar: {''}
            <span className="font-bold">{formatearDinero(total)}</span>
          </p>
        </div>

        <div className="mt-5">
          <input
            type="submit"
            className={`${comprobarPedido()
              ? 'bg-indigo-100'
              : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'
              } w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
            value="Confirmar Pedido"
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
};

export default Total;
