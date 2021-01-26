export class URLUtils {

  static armarURL(eventoID: string): string {
    return `http://localhost:4200/eventos/${eventoID}`;
  }

  static armarURLResultados(eventoID: string, codigoResultados: string): string {
    return `http://localhost:4200/eventos/${eventoID}/resultados/${codigoResultados}`;
  }
}
