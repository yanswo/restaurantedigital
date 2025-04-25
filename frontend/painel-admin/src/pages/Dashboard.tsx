import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Painel Administrativo</h1>
      <nav>
        <ul>
          <li>
            <Link to="/restaurants">Gerenciar Restaurantes</Link>
          </li>
          <li>
            <Link to="/categories">Gerenciar Categorias</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
