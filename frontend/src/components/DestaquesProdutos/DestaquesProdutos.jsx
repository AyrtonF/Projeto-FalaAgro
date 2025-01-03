import React, { useEffect, useState } from "react";
import styles from "./DestaquesProdutos.module.css";
import leftButton from "../../assets/leftbutton.svg";
import rightButton from "../../assets/rightbutton.svg";
import vacaTeste from "../../assets/vaca.jpeg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

function DestaquesProdutos({ title }) {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const response = await axios.get(
          "http://localhost:3333/product/featered"
        );
        if (response.status >= 200 && response.status <= 300) {
          setProducts(response.data);
        }
      } catch (err) {
        const errorMsg =
          err.response?.data?.error ||
          err.message ||
          "Erro ao buscar produtos. Tente novamente.";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const containerAllProductsTranslate =
      document.getElementById("all-products");
    containerAllProductsTranslate.style.transform = `translateX(${value}%)`;
  }, [value]);

  const changeValuePlus = () => {
    setValue(value > -((products.length - 1) * 20) ? value - 20 : value);
  };

  const changeValueMinus = () => {
    setValue(value < 0 ? value + 20 : value);
  };

  return (
    <div className="carrossel">
      <h1>{title || "Produtos"}</h1>
      <div className={styles.containerDestaques}>
        <button
          onMouseDown={changeValueMinus}
          className={styles.buttonCarrossel}
        >
          <img src={leftButton} alt="Left" />
        </button>
        <div className={styles.carrosselItensAjust}>
          <div className={styles.containerAllProducts} id="all-products">
            {products.map((product, index) => (
              <div
                key={index}
                className={`${styles.containerProduto} card mb-4`}
              >
                <Link
                  to={`/PaginaProduto/${product.id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? `data:image/jpeg;base64,${product.images[0]}`
                        : vacaTeste
                    }
                    alt={product.name}
                    style={
                      product.images.length > 0
                        ? { maxWidth: "5em" }
                        : { maxWidth: "8em" }
                    }
                    className={`card-img-top ${styles.imgStyle}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text" style={{ textAlign: "center" }}>
                      {product.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button
          onMouseDown={changeValuePlus}
          className={styles.buttonCarrossel}
        >
          <img src={rightButton} alt="Right" />
        </button>
      </div>
    </div>
  );
}

export default DestaquesProdutos;
