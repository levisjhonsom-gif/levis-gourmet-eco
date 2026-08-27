const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const dbRecetas = [
  { id: 1, nombre: "Tortilla de Sobras", ingredientes: ["huevo", "papas", "cebolla"], pasos: "Bate los huevos, mezcla con las papas cocinadas y dora en la sartén." },
  { id: 2, nombre: "Batido de Fruta Madura", ingredientes: ["banana", "leche", "fresa"], pasos: "Licúa toda la fruta con la leche y sirve frío." },
  { id: 3, nombre: "Arroz Chaufa de Verduras", ingredientes: ["arroz", "zanahoria", "huevo", "soya"], pasos: "Saltea las verduras picadas, añade el huevo revuelto y mezcla con el arroz frío." }
];

app.post('/api/buscar-recetas', (req, res) => {
  const { misIngredientes } = req.body;
  if (!misIngredientes || !Array.isArray(misIngredientes)) {
    return res.status(400).json({ error: "Envía una lista de ingredientes válida." });
  }

  const encontradas = dbRecetas.filter(receta =>
    receta.ingredientes.some(ing => misIngredientes.includes(ing.toLowerCase()))
  );

  res.json({ resultados: encontradas });
});

app.post('/api/guardar-receta', (req, res) => {
  const { nombre, ingredientes, pasos } = req.body;
  
  if (!nombre || !ingredientes || !pasos) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  const nuevaReceta = {
    id: dbRecetas.length + 1,
    nombre,
    ingredientes: ingredientes.split(',').map(i => i.trim().toLowerCase()),
    pasos
  };

  dbRecetas.push(nuevaReceta);
  res.json({ mensaje: "¡Receta guardada con éxito!", receta: nuevaReceta });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
