import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { atualizarCarro, criarCarro } from "../../services/car-service";
import './CarForm.css';
import { Carro } from "../../models/car";

interface CarFormProps {
  onCarAdded: () => void;
  initialData?: Carro | null;
}


const CarForm: React.FC<CarFormProps> = ({ onCarAdded, initialData }) => {
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState(0);
  const [cor, setCor] = useState("");
  const [cavalosDePotencia, setCavalosDePotencia] = useState(0);
  const [fabricante, setFabricante] = useState("");
  const [pais, setPais] = useState("");

  useEffect(() => {
    if(initialData) {
      setModelo(initialData.modelo);
      setAno(initialData.ano);
      setCor(initialData.cor);
      setCavalosDePotencia(initialData.cavalosDePotencia);
      setFabricante(initialData.fabricante);
      setPais(initialData.pais);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const carro = { modelo, ano, cor, cavalosDePotencia, fabricante, pais };

    try {
      if(initialData) {
        await atualizarCarro(initialData.id, carro);
      } else {
        await criarCarro(carro);
      }
      onCarAdded();
    } catch (error) {
      console.error("Erro ao cadastrar o carro:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label htmlFor="modelo">Modelo</label>
      <TextField
        id="modelo"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        fullWidth
        className="form-input"
        required
        variant="outlined"
      />

      <label htmlFor="ano">Ano</label>
      <TextField
        id="ano"
        type="number"
        value={ano}
        onChange={(e) => setAno(Number(e.target.value))}
        fullWidth
        className="form-input"
        required
        variant="outlined"
      />

      <label htmlFor="cor">Cor</label>
      <TextField
        id="cor"
        value={cor}
        onChange={(e) => setCor(e.target.value)}
        fullWidth
        className="form-input"
        required
        variant="outlined"
      />

      <label htmlFor="cavalosDePotencia">Cavalos de Potência</label>
      <TextField
        id="cavalosDePotencia"
        value={cavalosDePotencia}
        onChange={(e) => setCavalosDePotencia(Number(e.target.value))}
        fullWidth
        className="form-input"
        required
        variant="outlined"
      />

      <label htmlFor="fabricante">Fabricante</label>
      <TextField
        id="fabricante"
        value={fabricante}
        onChange={(e) => setFabricante(e.target.value)}
        fullWidth
        className="form-input"
        required
        variant="outlined"
      />

      <label htmlFor="pais">País</label>
      <TextField
        id="pais"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        fullWidth
        className="form-input"
        required
        variant="outlined"
      />

      <Button type="submit" className="form-button"  variant="contained"
          color="primary">
        {initialData ? "Atualizar" : "Cadastrar"}
      </Button>
    </form>
  );
};

export default CarForm;
