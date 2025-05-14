import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function App() {
  const [sliders, setSliders] = useState({
    G: { precio: 0, cantidad: 0 },
    B1: 0,
    B2: 0,
    B3: 0,
    B4: 0,
    B5: 0
  });

  const modificarData = (base, factorPrecio, factorCantidad = 0) =>
    base.map(p => ({
      cantidad: p.cantidad + factorCantidad,
      precio: p.precio + factorPrecio
    }));

  const casos = {
    G: {
      titulo: 'A - Movimientos a lo largo de curvas de demanda y oferta',
      baseDataDemanda: [
        { cantidad: 1, precio: 10 },
        { cantidad: 2, precio: 8 },
        { cantidad: 3, precio: 6 },
        { cantidad: 4, precio: 4 },
        { cantidad: 5, precio: 2 }
      ],
      baseDataOferta: [
        { cantidad: 1, precio: 2 },
        { cantidad: 2, precio: 4 },
        { cantidad: 3, precio: 6 },
        { cantidad: 4, precio: 8 },
        { cantidad: 5, precio: 10 }
      ],
      strokeDemanda: '#FF0000',
      strokeOferta: '#0000FF',
      explicacion: `Punto A: Movimiento a lo largo de las curvas\n\nMovimiento a lo largo de la curva de demanda\nSe produce cuando varía el precio del propio bien, manteniéndose constantes los demás factores. Este movimiento refleja la ley de la demanda:\n• Si el precio aumenta, la cantidad demandada disminuye.\n• Si el precio disminuye, la cantidad demandada aumenta.\n\nDesplazamiento de la curva de demanda\nOcurre cuando cambia algún factor distinto al precio:\n• Ingreso (Y): Aumento desplaza la curva a la derecha.\n• Gustos (Pf): Mayor preferencia incrementa la demanda.\n• Precio de bienes relacionados:\n  - Sustitutivos (PBS): Si su precio sube, aumenta la demanda.\n  - Complementarios (PBC): Si su precio sube, disminuye la demanda.\n\nMovimiento a lo largo de la curva de oferta\n• Si el precio aumenta, la cantidad ofrecida aumenta.\n• Si el precio disminuye, la cantidad ofrecida disminuye.\n\nDesplazamiento de la curva de oferta\n• Precio de factores de producción (PFP): Aumentos reducen la oferta.\n• Tecnología productiva (TP): Mejoras desplazan la oferta a la derecha.\n• Costos de oportunidad (CO): Mayor rentabilidad en otro bien reduce la oferta.\n\nPrecio de Equilibrio\nPunto donde cantidad demandada = cantidad ofrecida.\n• Exceso de oferta: Precio mayor al de equilibrio.\n• Escasez de demanda: Precio menor al de equilibrio.`
    },
    B1: {
      titulo: 'B1 - Helada que arruina la cosecha de naranjas (Oferta ↓)',
      baseData: [
        { cantidad: 1, precio: 7 },
        { cantidad: 2, precio: 6 },
        { cantidad: 3, precio: 5 },
        { cantidad: 4, precio: 4 }
      ],
      stroke: '#008B8B',
      explicacion: `Una helada reduce la oferta de naranjas. La curva se desplaza a la izquierda, elevando el precio y reduciendo la cantidad. El nuevo precio de equilibrio es más alto y la cantidad menor.`
    },
    B2: {
      titulo: 'B2 - Aumento de la preferencia por jugo de naranja (Demanda ↑)',
      baseData: [
        { cantidad: 1, precio: 6 },
        { cantidad: 2, precio: 8 },
        { cantidad: 3, precio: 10 },
        { cantidad: 4, precio: 12 }
      ],
      stroke: '#8A2BE2',
      explicacion: `La mejora en las preferencias hacia el jugo incrementa la demanda, desplazando la curva a la derecha. El precio y la cantidad de equilibrio aumentan.`
    },
    B3: {
      titulo: 'B3 - Tecnología mejora producción de heladeras (Oferta ↑)',
      baseData: [
        { cantidad: 1, precio: 8 },
        { cantidad: 2, precio: 6 },
        { cantidad: 3, precio: 4 },
        { cantidad: 4, precio: 2 }
      ],
      stroke: '#228B22',
      explicacion: `La tecnología permite producir más heladeras con menos recursos. La oferta aumenta y el precio baja. Se venden más unidades.`
    },
    B4: {
      titulo: 'B4 - Disminución en costos de insumos en artículos de pesca (Oferta ↑)',
      baseData: [
        { cantidad: 1, precio: 9 },
        { cantidad: 2, precio: 7 },
        { cantidad: 3, precio: 5 },
        { cantidad: 4, precio: 3 }
      ],
      stroke: '#FF8C00',
      explicacion: `Bajan los insumos. La oferta aumenta, el precio cae y se incrementa la cantidad vendida.`
    },
    B5: {
      titulo: 'B5 - Caída del 35% en salarios de consumidores (Demanda ↓)',
      baseData: [
        { cantidad: 1, precio: 12 },
        { cantidad: 2, precio: 10 },
        { cantidad: 3, precio: 8 },
        { cantidad: 4, precio: 6 }
      ],
      stroke: '#A52A2A',
      explicacion: `La caída de salarios reduce la demanda. La curva se desplaza a la izquierda. El precio y la cantidad de equilibrio disminuyen. Si la demanda es elástica, el ajuste será más pronunciado.`
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">ECONOMIA POLITICA - Actividad Grupal Evaluable A2</h1>
      <h2 className="text-center text-gray-600 mb-4">Actividad 2 · Profesora: Gladys Zuccatti</h2>
      <h3 className="text-center text-gray-600 mb-10 text-sm italic">Alumnos: Victor Mildenberger · Horacio Lanfranchi · Sebastián Sánchez Buggiani · Yanina V. Gillig Osre</h3>

      {/* Punto A */}
      <h2 className="text-xl font-semibold text-green-700 mb-4">Punto A: Movimiento a lo largo de las curvas</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">
        <div className="p-4 border rounded-lg shadow-sm bg-yellow-100">
          <h2 className="text-lg font-semibold text-center mb-2">{casos.G.titulo}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={casos.G.baseDataDemanda}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cantidad" label={{ value: 'Cantidad', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Precio', angle: -90, position: 'insideLeft' }} domain={[0, 14]} />
              <Tooltip />
              <Legend />
              <Line data={casos.G.baseDataDemanda} type="monotone" dataKey="precio" stroke={casos.G.strokeDemanda} name="Demanda" />
              <Line data={casos.G.baseDataOferta} type="monotone" dataKey="precio" stroke={casos.G.strokeOferta} name="Oferta" />
            </LineChart>
          </ResponsiveContainer>
          <p className="mt-4 text-sm whitespace-pre-line">{casos.G.explicacion}</p>
        </div>
      </div>

      {/* Punto B */}
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Punto B: Desplazamientos de curvas por factores externos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(casos).filter(([k]) => k !== 'G').map(([clave, caso]) => (
          <div key={clave} className="p-4 border rounded-lg shadow-sm bg-yellow-100">
            <h2 className="text-lg font-semibold text-center mb-2">{caso.titulo}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={modificarData(caso.baseData, sliders[clave])}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cantidad" label={{ value: 'Cantidad', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Precio', angle: -90, position: 'insideLeft' }} domain={[0, 14]} />
                <Tooltip />
                <Legend />
                <Line dataKey="precio" stroke={caso.stroke} type="monotone" name="Curva" />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm whitespace-pre-line">{caso.explicacion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}