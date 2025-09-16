import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const Home = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Carregar dados do localStorage (exemplo)
    const saved = localStorage.getItem("usuarios");
    if (saved) setUsuarios(JSON.parse(saved));
  }, []);

  // Dados para gráfico de barras (usuários por bairro)
  const bairros = [...new Set(usuarios.map((u) => u.bairro))];
  const usuariosPorBairro = bairros.map(
    (b) => usuarios.filter((u) => u.bairro === b).length
  );

  const barData = {
    labels: bairros.length ? bairros : ["Nenhum bairro"],
    datasets: [
      {
        label: "Usuários por Bairro",
        data: usuariosPorBairro.length ? usuariosPorBairro : [0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Masculino", "Feminino", "Outro"], // só exemplo
    datasets: [
      {
        label: "Distribuição de Usuários",
        data: [8, 10, 2],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Dashboard</h2>

        {/* Cards simples */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-white bg-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Usuários</h5>
                <p className="card-text">{usuarios.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Novos Usuários</h5>
                <p className="card-text">3</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-warning mb-3">
              <div className="card-body">
                <h5 className="card-title">Mensagens</h5>
                <p className="card-text">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="row">
          <div className="col-md-6">
            <h5>Usuários por Bairro</h5>
            <Bar data={barData} />
          </div>
          <div className="col-md-6">
            <h5>Distribuição de Usuários</h5>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
