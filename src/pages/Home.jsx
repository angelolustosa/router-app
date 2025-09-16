import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const Home = () => {
  const [usuarios, setUsuarios] = useState([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("usuarios");
    if (saved) setUsuarios(JSON.parse(saved));
  }, []);

  // Cards
  const totalUsuarios = usuarios.length;
  const novosUsuarios = usuarios.slice(-5).length;
  const totalMensagens = 5; // exemplo fixo

  // Gráfico: Usuários por Bairro
  const bairros = [...new Set(usuarios.map((u) => u.bairro))];
  const usuariosPorBairro = bairros.map(
    (b) => usuarios.filter((u) => u.bairro === b).length
  );
  const barData = {
    labels: bairros,
    datasets: [{ label: "Usuários por Bairro", data: usuariosPorBairro, backgroundColor: "rgba(75,192,192,0.6)" }],
  };

  // Gráfico: Distribuição por Sexo
  const sexos = [...new Set(usuarios.map((u) => u.sexo))];
  const usuariosPorSexo = sexos.map((s) => usuarios.filter((u) => u.sexo === s).length);
  const pieData = { labels: sexos, datasets: [{ data: usuariosPorSexo, backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"] }] };

  // Gráfico: Idade dos usuários
  const lineData = {
    labels: usuarios.map(u => u.nome),
    datasets: [{
      label: "Idade dos Usuários",
      data: usuarios.map(u => u.idade),
      fill: false,
      borderColor: "rgba(153,102,255,1)"
    }]
  };

  // Gráfico: Tipo de usuário
  const tipos = [...new Set(usuarios.map(u => u.tipo))];
  const usuariosPorTipo = tipos.map(t => usuarios.filter(u => u.tipo === t).length);
  const doughnutData = { labels: tipos, datasets: [{ data: usuariosPorTipo, backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }] };

  // Gráfico: Usuários por Cidade (horizontal)
  const cidades = [...new Set(usuarios.map(u => u.cidade))];
  const usuariosPorCidade = cidades.map(c => usuarios.filter(u => u.cidade === c).length);
  const horizontalBarData = {
    labels: cidades,
    datasets: [{ label: "Usuários por Cidade", data: usuariosPorCidade, backgroundColor: "rgba(255,159,64,0.6)" }]
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Dashboard</h2>

        {/* Cards justificados */}
        <div className="d-flex justify-content-between mb-4 flex-wrap gap-3">
          <div className="card text-white bg-primary flex-fill">
            <div className="card-body">
              <h5 className="card-title">Usuários</h5>
              <p className="card-text">{totalUsuarios}</p>
            </div>
          </div>
          <div className="card text-white bg-success flex-fill">
            <div className="card-body">
              <h5 className="card-title">Novos Usuários</h5>
              <p className="card-text">{novosUsuarios}</p>
            </div>
          </div>
          <div className="card text-white bg-warning flex-fill">
            <div className="card-body">
              <h5 className="card-title">Mensagens</h5>
              <p className="card-text">{totalMensagens}</p>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="row">
          <div className="col-md-6 mb-4">
            <h5>Usuários por Bairro</h5>
            <Bar data={barData} />
          </div>
          <div className="col-md-6 mb-4">
            <h5>Distribuição por Sexo</h5>
            <Pie data={pieData} />
          </div>
          <div className="col-md-6 mb-4">
            <h5>Idade dos Usuários</h5>
            <Line data={lineData} />
          </div>
          <div className="col-md-6 mb-4">
            <h5>Tipo de Usuário</h5>
            <Doughnut data={doughnutData} />
          </div>
          <div className="col-md-12 mb-4">
            <h5>Usuários por Cidade</h5>
            <Bar data={horizontalBarData} options={{ indexAxis: 'y' }} />
          </div>
        </div>
      </div>
    </>
  );
};
