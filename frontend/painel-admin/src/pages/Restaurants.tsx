import { useEffect, useState } from "react";
import api from "../services/api";

interface Restaurant {
  id: string;
  name: string;
  description: string;
}

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function fetchRestaurants() {
    try {
      const response = await api.get("/restaurants");
      setRestaurants(response.data);
    } catch (err) {
      alert("Erro ao buscar restaurantes");
    }
  }

  async function handleCreateRestaurant(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/restaurants", { name, description });
      setName("");
      setDescription("");
      fetchRestaurants();
    } catch (err) {
      alert("Erro ao criar restaurante");
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Gerenciar Restaurantes</h2>

      <form onSubmit={handleCreateRestaurant} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Nome do restaurante"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <ul>
        {restaurants.map((r) => (
          <li key={r.id}>
            <strong>{r.name}</strong> — {r.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
