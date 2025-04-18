import { Gift } from '../types';

export const initialGifts: Gift[] = [
  // Itens para Cozinha
  { id: 1, name: 'Geladeira', taken: false },
  { id: 2, name: 'Conjunto de panelas', taken: false },
  { id: 3, name: 'Jogo de talheres', taken: false },
  { id: 4, name: 'Jogo de pratos', taken: false },
  { id: 5, name: 'Jogo de jantar', taken: false },
  { id: 6, name: 'Jogo de sobremesa', taken: false },
  { id: 7, name: 'Conjunto de copos', taken: false },
  { id: 8, name: 'Liquidificador', taken: false },
  { id: 9, name: 'Batedeira', taken: false },
  { id: 10, name: 'Cafeteira elétrica', taken: false },
  { id: 11, name: 'Torradeira', taken: false },
  { id: 12, name: 'Micro-ondas', taken: false },
  { id: 13, name: 'Tábua de corte', taken: false },
  { id: 14, name: 'Conjunto de facas', taken: false },
  { id: 15, name: 'Armário de cozinha', taken: false },
  { id: 16, name: 'Fogão', taken: false },
  { id: 17, name: 'Airfryer', taken: false },
  { id: 18, name: 'Processador', taken: false },
  { id: 19, name: 'Forma de pudim', taken: false },
  { id: 20, name: 'Bomboniere', taken: false },

  // Itens para Quarto
  { id: 21, name: 'Jogo de cama (lençol, fronha, etc.)', taken: false },
  { id: 22, name: 'Edredom', taken: false },
  { id: 23, name: 'Travesseiros', taken: false },
  { id: 24, name: 'Cobertores', taken: false },
  { id: 25, name: 'Abajur', taken: false },
  { id: 26, name: 'Cortinas', taken: false },
  { id: 27, name: 'Cama', taken: false },
  { id: 28, name: 'Colchão', taken: false },
  { id: 29, name: 'Guarda-roupa', taken: false },
  { id: 30, name: 'Ar-condicionado', taken: false },
  { id: 31, name: 'Cadeira gamer', taken: false },

  // Itens para Banheiro
  { id: 32, name: 'Jogo de toalhas', taken: false },
  { id: 33, name: 'Tapete antiderrapante', taken: false },
  { id: 34, name: 'Kit de acessórios (porta-sabonete, escova de dente, etc.)', taken: false },
  { id: 35, name: 'Chapinha', taken: false },
  { id: 36, name: 'Secador de cabelo', taken: false },

  // Itens para Sala
  { id: 37, name: 'Almofadas decorativas', taken: false },
  { id: 38, name: 'Manta para sofá', taken: false },
  { id: 39, name: 'Porta-retratos', taken: false },
  { id: 40, name: 'Quadro decorativo', taken: false },
  { id: 41, name: 'Luminária de chão', taken: false },
  { id: 42, name: 'Sofá', taken: false },
  { id: 43, name: 'Tapete', taken: false },
  { id: 44, name: 'Painel ou Estante', taken: false },
  { id: 45, name: 'Mesa', taken: false },
  { id: 46, name: 'Caixa de som', taken: false },

  // Eletrodomésticos e Eletrônicos
  { id: 47, name: 'Televisão', taken: false },
  { id: 48, name: 'Ventilador', taken: false },
  { id: 49, name: 'Aspirador de pó', taken: false },
  { id: 50, name: 'Ferro de passar roupa', taken: false },
  { id: 51, name: 'Máquina de lavar roupas', taken: false },

  // Diversos
  { id: 52, name: 'Conjunto para churrasco', taken: false },
  { id: 53, name: 'Kit de ferramentas', taken: false },
  { id: 54, name: 'Jogo de taças', taken: false },
  { id: 55, name: 'Itens de decoração', taken: false },
  { id: 56, name: 'Vale-presentes', taken: false },
  { id: 57, name: 'Churrasqueira', taken: false },
  { id: 58, name: 'Rodo Retrátil', taken: false }
].sort((a, b) => a.name.localeCompare(b.name));