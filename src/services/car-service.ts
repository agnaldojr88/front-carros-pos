import api from "./api";

export const listarCarrosPaginado = async (page = 0, size = 10) => {
  const response = await api.get('/carros', {
    headers: {
      page: page.toString(),
      size: size.toString(),
    },
  });

  const { content, totalElements } = response.data;
  return {
    content,
    totalElements,
  };
};


export const buscarCarrosPorCriterios = (modelo?: string, fabricante?: string, pais?: string) =>
  api
    .get('/carros/search', { headers: { modelo, fabricante, pais } })
    .then((res) => res.data);

export const buscarCarroPorId = (id: number) =>
  api.get(`/carros/${id}`).then((res) => res.data);

export const criarCarro = (carro: any) =>
  api.post('/carros', carro).then((res) => res.data);

export const atualizarCarro = (id: number, carroAtualizado: any) =>
  api.put(`/carros/${id}`, carroAtualizado).then((res) => res.data);

export const deletarCarro = (id: number) =>
  api.delete(`/carros/${id}`).then((res) => res.data);

export const exportarCarros = async () => {
  const response = await api.get('/carros/export-cars', { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "carros.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
  

export default {
  listarCarrosPaginado,
  buscarCarrosPorCriterios,
  buscarCarroPorId,
  criarCarro,
  atualizarCarro,
  deletarCarro,
  exportarCarros,
};
