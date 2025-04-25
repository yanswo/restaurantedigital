import { useEffect, useState } from "react";
import api from "../services/api";

interface Restaurant {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  restaurant: Restaurant;
}

export default function Categories() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  async function fetchRestaurants() {
    try {
      const response = await api.get("/restaurants");
      setRestaurants(response.data);
    } catch (err) {
      alert("Erro ao buscar restaurantes");
    }
  }

  async function fetchCategories() {
    if (!selectedRestaurant) {
      return;
    }

    try {
      const response = await api.get(
        `/categories/restaurant/${selectedRestaurant}`
      );
      setCategories(response.data);
    } catch (err) {
      alert("Erro ao buscar categorias");
    }
  }

  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedRestaurant) {
      alert("Selecione um restaurante");
      return;
    }

    try {
      await api.post("/categories", {
        name,
        description,
        restaurantId: selectedRestaurant,
      });
      setName("");
      setDescription("");
      fetchCategories();
    } catch (err) {
      alert("Erro ao criar categoria");
    }
  }

  useEffect(() => {
    fetchRestaurants();
    fetchCategories();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Gerenciar Categorias</h2>

      <form onSubmit={handleCreateCategory} style={{ marginBottom: "2rem" }}>
        <select
          value={selectedRestaurant}
          onChange={(e) => setSelectedRestaurant(e.target.value)}
          required
        >
          <option value="">Selecione um restaurante</option>
          {restaurants.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Nome da categoria"
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
        {categories.map((category) => (
          <li key={category.id}>
            <strong>{category.name}</strong> — {category.restaurant.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
