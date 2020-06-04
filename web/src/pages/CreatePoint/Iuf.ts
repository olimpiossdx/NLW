export default interface IUF {
  id: string,
  sigla: string,
  nome: string,
  regiao: {
    id: string,
    sigla: string,
    nome: string
  },
}