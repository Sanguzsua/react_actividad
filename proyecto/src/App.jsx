import React, { useMemo, useState } from "react";
import "./App.css";

// Importamos imágenes desde src/assets
import gomitasImg from "./assets/gomitas-trolli-dona-frutales-57g.jpg";
import chocolateImg from "./assets/BARRA-70-60G-FRONT_1080x.webp";
import bombonesImg from "./assets/Chocolatisimo-Cream-VALOR-MARCA-EXCLUSIVA-250-gr-3279257_a.webp";
import paletaImg from "./assets/paleta-tosh-fresa-2.webp";
import cintasImg from "./assets/CintaManzana-Melon-FINI-70-gr-3429901_a.webp";

const CATEGORIES = [
  { key: "all", label: "Todos" },
  { key: "gomitas", label: "Gomitas" },
  { key: "chocolate", label: "Chocolate" },
  { key: "bomba", label: "Bombones" },
  { key: "paleta", label: "Paletas" },
  { key: "acido", label: "Ácidos" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Gomitas Frutales",
    category: "gomitas",
    price: 1500,
    desc: "Mix de sabores tropicales",
    image: gomitasImg,
  },
  {
    id: 2,
    name: "Tableta de Chocolate 70%",
    category: "chocolate",
    price: 3500,
    desc: "Cacao fino de aroma",
    image: chocolateImg,
  },
  {
    id: 3,
    name: "Bombones Rellenos",
    category: "bomba",
    price: 4500,
    desc: "Centro cremoso de avellana",
    image: bombonesImg,
  },
  {
    id: 4,
    name: "Paleta de Fresa",
    category: "paleta",
    price: 2000,
    desc: "Clásica y deliciosa",
    image: paletaImg,
  },
  {
    id: 5,
    name: "Cintas Ácidas",
    category: "acido",
    price: 1500,
    desc: "Para los amantes del ácido",
    image: cintasImg,
  },
];

// Tarjeta de producto
function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="img" />
      <h3>{product.name}</h3>
      <p>{product.desc}</p>
      <strong>${product.price.toFixed(2)}</strong>
      <br />
      <button onClick={() => onAdd(product)}>Agregar al carrito</button>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    if (category === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === category);
  }, [category]);

  const addToCart = (product) => {
    setCart((prev) => {
      const qty = prev[product.id]?.qty || 0;
      return { ...prev, [product.id]: { product, qty: qty + 1 } };
    });
  };

  const total = Object.values(cart).reduce(
    (acc, it) => acc + it.product.price * it.qty,
    0
  );

  return (
    <div className="App">
      <h1>🍭 Dulcería SweetHub</h1>

      {/* Filtros */}
      <div className="filters">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={c.key === category ? "active" : ""}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Productos */}
      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>

      {/* Carrito */}
      <div className="cart">
        <h2>🛒 Carrito</h2>
        {Object.values(cart).length === 0 ? (
          <p>Vacío</p>
        ) : (
          <ul>
            {Object.values(cart).map(({ product, qty }) => (
              <li key={product.id}>
                {product.name} × {qty} = ${(
                  product.price * qty
                ).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}
