// App.tsx
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
    G1: 0,
    G2: 0,
    B1: 0,
    B2: 0,
    B3: 0,
    B4: 0,
    B5: 0
  });

  const modificarData = (base, factor) =>
    base.map(p => ({ ...p, precio: p.precio + factor }));

  const casos = {
    G1: {
      titulo: 'G1 - Movimiento a lo largo de la curva de demanda',
      baseData: [
        { cantidad: 1, precio: 10 },
        { cantidad: 2, precio: 8 },
        { cantidad: 3, precio: 6 },
        { cantidad: 4, precio: 4 },
        { cantidad: 5, precio: 2 }
      ],
      stroke: '#FF0000',
      explicacion: `Movimiento a lo largo de la Curva de Demanda: Si el precio de un bien disminuye, los consumidores querrán comprar más, moviéndose hacia abajo y derecha en la curva. Si aumenta, comprarán menos, desplazándose hacia arriba y a la izquierda.`
    },
    G2: {
      titulo: 'G2 - Movimiento a lo largo de la curva de oferta',
      baseData: [
        { cantidad: 1, precio: 2 },
        { cantidad: 2, precio: 4 },
        { cantidad: 3, precio: 6 },
        { cantidad: 4, precio: 8 },
        { cantidad: 5, precio: 10 }
      ],
      stroke: '#0000FF',
      explicacion: `Movimiento a lo largo de la Curva de Oferta: Si el precio de un bien aumenta, los productores ofrecerán más. Si disminuye, ofrecerán menos. Refleja la relación directa entre precio y cantidad ofrecida.`
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
      explicacion: `Una helada reduce la oferta de naranjas. La curva de oferta se desplaza a la izquierda, el precio del jugo sube y la cantidad baja.`
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
      explicacion: `Mayor preferencia por jugo desplaza la curva de demanda a la derecha. Aumenta el precio y la cantidad de equilibrio.`
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
      explicacion: `Nueva tecnología reduce costos y aumenta la producción de heladeras. La oferta se desplaza a la derecha, bajando el precio y aumentando la cantidad.`
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
      explicacion: `Bajan los costos de materiales en artículos de pesca. La oferta crece, lo que reduce el precio y eleva la cantidad de equilibrio.`
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
      explicacion: `Una fuerte caída en los salarios reduce el poder adquisitivo general. La demanda total baja y desplaza la curva hacia la izquierda, provocando una caída del precio y de la cantidad de equilibrio.`
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">ECONOMIA POLITICA - Actividad Grupal Evaluable A2</h1>
      <h2 className="text-center text-gray-600 mb-4">Actividad 2 · Profesora: Gladys Zuccatti</h2>
      <h3 className="text-center text-gray-600 mb-10 text-sm italic">Alumnos: Victor Mildenberger · Horacio Lanfranchi · Sebastián Sánchez Buggiani · Yanina V. Gillig Osre</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(casos).map(([clave, caso]) => (
          <div key={clave} className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <h2 className="text-lg font-semibold text-center mb-2">{caso.titulo}</h2>
            <div className="mb-2">
              <label className="block text-sm text-gray-600">Ajustar precios:</label>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={sliders[clave]}
                onChange={e => setSliders({ ...sliders, [clave]: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-xs text-center text-gray-500">{sliders[clave] > 0 ? `+${sliders[clave]}` : sliders[clave]}</div>
            </div>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={modificarData(caso.baseData, sliders[clave])} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="cantidad" label={{ value: 'Cantidad (Q)', position: 'insideBottom', offset: -10 }} domain={[0, 6]} />
                  <YAxis label={{ value: 'Precio (P)', angle: -90, position: 'insideLeft' }} domain={[0, 14]} />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="precio"
                    stroke={caso.stroke}
                    name={caso.titulo}
                    dot={false}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-700">
              <strong>Explicación:</strong> {caso.explicacion}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}