import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState("");
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [editName, setEditName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3333/restaurants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRestaurants(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Erro ao carregar restaurantes: " + error.response.data.error);
        setIsLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleCreateRestaurant = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3333/restaurants",
        { name: newRestaurant },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRestaurants([...restaurants, response.data]);
      setNewRestaurant("");
      setError(null);
    } catch (error) {
      setError("Erro ao criar restaurante: " + error.response.data.error);
    }
  };

  const handleEditRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant.id);
    setEditName(restaurant.name);
    setError(null);
  };

  const handleUpdateRestaurant = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3333/restaurants/${editingRestaurant}`,
        { name: editName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRestaurants(
        restaurants.map((restaurant) =>
          restaurant.id === editingRestaurant ? response.data : restaurant
        )
      );
      setEditingRestaurant(null);
      setEditName("");
      setError(null);
    } catch (error) {
      setError("Erro ao atualizar restaurante: " + error.response.data.error);
    }
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3333/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRestaurants(
        restaurants.filter((restaurant) => restaurant.id !== restaurantId)
      );
      setError(null);
    } catch (error) {
      setError(
        "Erro ao excluir restaurante: " +
          (error.response?.data?.error || error.message)
      );
    }
  };
  const handleManageCategories = (restaurantId) => {
    navigate(`/restaurants/${restaurantId}/categories`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gerenciamento de Restaurantes</h1>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <>
          <ul className={styles.restaurantList}>
            {restaurants.map((restaurant) => (
              <li key={restaurant.id} className={styles.restaurantItem}>
                <div className={styles.restaurantName}>{restaurant.name}</div>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    onClick={() => handleManageCategories(restaurant.id)}
                  >
                    Gerenciar Categorias
                  </button>
                  <button
                    className={`${styles.button} ${styles.buttonWarning}`}
                    onClick={() => handleEditRestaurant(restaurant)}
                  >
                    Editar
                  </button>
                  <button
                    className={`${styles.button} ${styles.buttonDanger}`}
                    onClick={() => handleDeleteRestaurant(restaurant.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {editingRestaurant ? (
            <div className={styles.formContainer}>
              <h2 className={styles.subtitle}>Editar Restaurante</h2>
              <input
                type="text"
                className={styles.inputField}
                placeholder="Nome do Restaurante"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <div className={styles.formActions}>
                <button
                  className={`${styles.button} ${styles.buttonSuccess}`}
                  onClick={handleUpdateRestaurant}
                >
                  Salvar Alterações
                </button>
                <button
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  onClick={() => setEditingRestaurant(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.formContainer}>
              <h2 className={styles.subtitle}>Criar Novo Restaurante</h2>
              <input
                type="text"
                className={styles.inputField}
                placeholder="Nome do Restaurante"
                value={newRestaurant}
                onChange={(e) => setNewRestaurant(e.target.value)}
              />
              <button
                className={`${styles.button} ${styles.buttonSuccess}`}
                onClick={handleCreateRestaurant}
              >
                Criar Novo Restaurante
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
