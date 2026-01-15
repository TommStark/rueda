/**
 * Utilidades de cálculo financiero
 * Funciones puras para cálculos de portfolio y mercado
 */

/**
 * Calcula el rendimiento porcentual de un instrumento
 * @param last - Precio actual
 * @param close - Precio de cierre previo
 * @returns Porcentaje de rendimiento
 */
export function calcInstrumentReturn(last: number, close: number): number {
  if (close === 0) return 0;
  return ((last - close) / close) * 100;
}

/**
 * Calcula el valor de mercado de una posición
 * @param qty - Cantidad de acciones
 * @param last - Precio actual por acción
 * @returns Valor total de mercado
 */
export function calcMarketValue(qty: number, last: number): number {
  return qty * last;
}

/**
 * Calcula el costo base de una posición
 * @param qty - Cantidad de acciones
 * @param avg - Precio promedio de compra por acción
 * @returns Costo base total
 */
export function calcCostBasis(qty: number, avg: number): number {
  return qty * avg;
}

/**
 * Calcula la ganancia o pérdida de una posición
 * @param qty - Cantidad de acciones
 * @param last - Precio actual por acción
 * @param avg - Precio promedio de compra por acción
 * @returns Ganancia total (positiva) o pérdida (negativa)
 */
export function calcGain(qty: number, last: number, avg: number): number {
  return (last - avg) * qty;
}

/**
 * Calcula el rendimiento porcentual total de una posición
 * @param qty - Cantidad de acciones
 * @param last - Precio actual por acción
 * @param avg - Precio promedio de compra por acción
 * @returns Porcentaje de rendimiento
 */
export function calcTotalReturnPct(
  qty: number,
  last: number,
  avg: number
): number {
  if (avg === 0) return 0;
  return ((last - avg) / avg) * 100;
}

/**
 * Calcula la cantidad de acciones a partir de un monto en ARS
 * @param amount - Monto en ARS
 * @param last - Precio actual por acción
 * @returns Cantidad de acciones (redondeada hacia abajo a entero)
 */
export function calcQtyFromAmount(amount: number, last: number): number {
  if (last === 0) return 0;
  return Math.floor(amount / last);
}
