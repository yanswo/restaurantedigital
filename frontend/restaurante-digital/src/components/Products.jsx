import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Products.module.css";

function Products() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3333/products/${categoryId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(
          "Erro ao carregar produtos: " +
            (error.response?.data?.error || error.message)
        );
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]);

  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3333/products`,
        {
          name: newProduct,
          description: "Descrição do produto",
          price: 0,
          categoryId,
          imageUrl: "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts([...products, response.data]);
      setNewProduct("");
      setError(null);
    } catch (error) {
      setError(
        "Erro ao criar produto: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product.id);
    setProductDetails({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setError(null);
  };

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3333/products/${editingProduct}`,
        {
          ...productDetails,
          categoryId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(
        products.map((product) =>
          product.id === editingProduct ? response.data : product
        )
      );
      setEditingProduct(null);
      setProductDetails({ name: "", description: "", price: 0, imageUrl: "" });
      setError(null);
    } catch (error) {
      setError(
        "Erro ao atualizar produto: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3333/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(
        orders.map((order) =>
          order.id === orderId
            ? { ...order, status: response.data.status }
            : order
        )
      );
    } catch (error) {
      alert("Erro ao atualizar status do pedido: " + error.response.data.error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3333/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product.id !== productId));
      setError(null);
    } catch (error) {
      setError(
        "Erro ao excluir produto: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Produtos da Categoria</h1>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <>
          <ul className={styles.productList}>
            {products.map((product) => (
              <li key={product.id} className={styles.productItem}>
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={styles.productImage}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x180?text=Sem+Imagem";
                    }}
                  />
                )}
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                  <p className={styles.productPrice}>
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.button} ${styles.buttonWarning}`}
                    onClick={() => handleEditProduct(product)}
                  >
                    Editar
                  </button>
                  <button
                    className={`${styles.button} ${styles.buttonDanger}`}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {orders.map((order) => (
            <li key={order.id}>
              <p>Pedido #{order.id}</p>
              <p>Status: {order.status}</p>
              <button
                onClick={() => handleUpdateStatus(order.id, "EM ANDAMENTO")}
              >
                Marcar como Em Andamento
              </button>
              <button onClick={() => handleUpdateStatus(order.id, "CONCLUIDO")}>
                Marcar como Concluído
              </button>
            </li>
          ))}

          {editingProduct ? (
            <div className={styles.formContainer}>
              <h2 className={styles.subtitle}>Editar Produto</h2>
              <div className={styles.formGrid}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Nome"
                  value={productDetails.name}
                  onChange={(e) =>
                    setProductDetails({
                      ...productDetails,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Descrição"
                  value={productDetails.description}
                  onChange={(e) =>
                    setProductDetails({
                      ...productDetails,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  className={styles.inputField}
                  placeholder="Preço"
                  value={productDetails.price}
                  onChange={(e) =>
                    setProductDetails({
                      ...productDetails,
                      price: parseFloat(e.target.value),
                    })
                  }
                  step="0.01"
                  min="0"
                />
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="URL da Imagem"
                  value={productDetails.imageUrl}
                  onChange={(e) =>
                    setProductDetails({
                      ...productDetails,
                      imageUrl: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formActions}>
                <button
                  className={`${styles.button} ${styles.buttonSuccess}`}
                  onClick={handleUpdateProduct}
                >
                  Salvar Alterações
                </button>
                <button
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  onClick={() => setEditingProduct(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.formContainer}>
              <h2 className={styles.subtitle}>Criar Novo Produto</h2>
              <input
                type="text"
                className={styles.inputField}
                placeholder="Nome do Produto"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
              />
              <button
                className={`${styles.button} ${styles.buttonSuccess}`}
                onClick={handleCreateProduct}
              >
                Criar Novo Produto
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
