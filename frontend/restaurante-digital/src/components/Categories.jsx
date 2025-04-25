import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Categories.module.css";

function Categories() {
  const { restaurantId } = useParams();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3333/categories/restaurant/${restaurantId}/categories`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Erro ao carregar categorias: " + error.response.data.error);
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [restaurantId]);

  const handleCreateCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3333/categories`,
        { name: newCategory, restaurantId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories([...categories, response.data]);
      setNewCategory("");
      setError(null);
    } catch (error) {
      setError("Erro ao criar categoria: " + error.response.data.error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setEditName(category.name);
    setError(null);
  };

  const handleUpdateCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3333/categories/${editingCategory}`,
        { name: editName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(
        categories.map((category) =>
          category.id === editingCategory ? response.data : category
        )
      );
      setEditingCategory(null);
      setEditName("");
      setError(null);
    } catch (error) {
      setError("Erro ao atualizar categoria: " + error.response.data.error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3333/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
      setError(null);
    } catch (error) {
      setError("Erro ao excluir categoria: " + error.response.data.error);
    }
  };

  const handleManageProducts = (categoryId) => {
    navigate(`/categories/${categoryId}/products`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Categorias do Restaurante</h1>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <>
          <ul className={styles.categoryList}>
            {categories.map((category) => (
              <li key={category.id} className={styles.categoryItem}>
                <div className={styles.categoryName}>{category.name}</div>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    onClick={() => handleManageProducts(category.id)}
                  >
                    Gerenciar Produtos
                  </button>
                  <button
                    className={`${styles.button} ${styles.buttonWarning}`}
                    onClick={() => handleEditCategory(category)}
                  >
                    Editar
                  </button>
                  <button
                    className={`${styles.button} ${styles.buttonDanger}`}
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {editingCategory ? (
            <div className={styles.formContainer}>
              <h2 className={styles.subtitle}>Editar Categoria</h2>
              <input
                type="text"
                className={styles.inputField}
                placeholder="Nome da Categoria"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <div className={styles.formActions}>
                <button
                  className={`${styles.button} ${styles.buttonSuccess}`}
                  onClick={handleUpdateCategory}
                >
                  Salvar Alterações
                </button>
                <button
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  onClick={() => setEditingCategory(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.formContainer}>
              <h2 className={styles.subtitle}>Criar Nova Categoria</h2>
              <input
                type="text"
                className={styles.inputField}
                placeholder="Nome da Categoria"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                className={`${styles.button} ${styles.buttonSuccess}`}
                onClick={handleCreateCategory}
              >
                Criar Nova Categoria
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Categories;
