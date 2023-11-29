import axios from 'axios';

const baseURL = 'URL_DO_SEU_BACKEND'; // Substituir pelo URL do backend

// Função para fazer uma requisição GET por ID
export function getPedidoById(id) {
  const url = `${baseURL}/${id}`;

  console.log(`Obtendo pedido pelo ID: ${id}`);

//   return axios.get(url)
//     .then(response => response.data)
//     .catch(error => {
//       console.error('Erro na requisição GET:', error);
//       throw error;
//     });
}

// Função para fazer uma requisição POST
export function savePedido(data) {
  const url = `${baseURL}/`;

//   return axios.post(url, data)
//     .then(response => response.data)
//     .catch(error => {
//       console.error('Erro na requisição POST:', error);
//       throw error;
//     });
}

module.exports = {
    getPedidoById
};