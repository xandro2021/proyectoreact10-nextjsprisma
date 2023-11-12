import { useRouter } from 'next/router';

const pasos = [
  { paso: 1, nombre: 'Menú', url: '/' },
  { paso: 2, nombre: 'Resumen', url: '/resumen' },
  { paso: 3, nombre: 'Datos y Total', url: '/total' },
]

const Pasos = () => {
  const router = useRouter();

  const calcularProgreso = () => {
    switch (router.pathname) {
      case '/': return 2;
      case '/resumen': return 50;
      default: return 100;
    }
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        {pasos.map(paso => (
          <button
            key={paso.paso}
            className="text-2xl font-bold"
            onClick={() => {
              router.push(paso.url);
            }}
          >
            {paso.nombre}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 mb-10">
        <div style={{ width: `${calcularProgreso()}%` }} className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"> </div>
      </div>

    </>
  );
};

export default Pasos;
