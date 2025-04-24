// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import api from "../services/api";

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/orders/${user?.id}`);
        setOrders(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (user?.role === "ADMIN") {
      fetchOrders();
    } else {
      navigate("/login");
    }
  }, [user, history]);

  return (
    <div className="dashboard-container">
      <h1>Dashboard - Bem-vindo, {user?.name}</h1>
      <h2>Pedidos Recentes</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>
              Pedido {order.id} - Status: {order.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
