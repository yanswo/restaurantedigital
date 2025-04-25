import { useEffect, useState } from "react";
import api from "../services/api";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
}

export default function Products() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Buscar categorias para o dropdown
  async function fetchCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (err) {
      alert("Erro ao buscar categorias");
    }
  }

  // Buscar produtos
  async function fetchProducts() {
    try {
      const response = await api.get(`/products/${selectedCategory}`);
      setProducts(response.data);
    } catch (err) {
      alert("Erro ao buscar produtos");
    }
  }

  // Cadastrar produto
  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedCategory) {
      alert("Selecione uma categoria");
      return;
    }

    try {
      await api.post("/products", {
        name,
        description,
        price,
        categoryId: selectedCategory,
      });
      setName("");
      setDescription("");
      setPrice(0);
      fetchProducts(); // atualiza lista de produtos
    } catch (err) {
      alert("Erro ao criar produto");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Gerenciar Produtos</h2>

      <form onSubmit={handleCreateProduct} style={{ marginBottom: "2rem" }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> — {product.category.name} - $
            {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
