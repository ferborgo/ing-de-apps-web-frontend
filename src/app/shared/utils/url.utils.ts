import { environment } from "src/environments/environment";

export class URLUtils {

  static armarURL(eventoID: string): string {
    return `${environment.FRONTEND_URL}/eventos/${eventoID}`;
  }

  static armarURLResultados(eventoID: string, codigoResultados: string): string {
    return `${environment.FRONTEND_URL}/eventos/${eventoID}/resultados/${codigoResultados}`;
  }
}
