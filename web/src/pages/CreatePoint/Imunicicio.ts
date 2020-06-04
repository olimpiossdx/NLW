export default interface IMunicipios {
  id: string,
  nome: string,
  microrregiao: {
    id: string,
    nome: string,
    mesorregiao: {
      id: string,
      nome: string,
      UF: {
        id: string,
        sigla: string,
        nome: string,
        regiao: {
          id: string,
          sigla: string,
          nome: string
        }
      }
    }
  }
}