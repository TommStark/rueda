import {
  calcInstrumentReturn,
  calcMarketValue,
  calcCostBasis,
  calcGain,
  calcTotalReturnPct,
  calcQtyFromAmount,
} from '../financialCalculations';

describe('Financial Calculation Functions', () => {
  describe('calcInstrumentReturn', () => {
    it('should calculate positive return correctly', () => {
      expect(calcInstrumentReturn(110, 100)).toBe(10);
    });

    it('should calculate negative return correctly', () => {
      expect(calcInstrumentReturn(90, 100)).toBe(-10);
    });

    it('should return 0 when close price is 0', () => {
      expect(calcInstrumentReturn(100, 0)).toBe(0);
    });

    it('should handle same prices (0% return)', () => {
      expect(calcInstrumentReturn(100, 100)).toBe(0);
    });

    it('should handle decimal values', () => {
      expect(calcInstrumentReturn(105.5, 100)).toBe(5.5);
    });
  });

  describe('calcMarketValue', () => {
    it('should calculate market value correctly', () => {
      expect(calcMarketValue(10, 50)).toBe(500);
    });

    it('should return 0 when quantity is 0', () => {
      expect(calcMarketValue(0, 50)).toBe(0);
    });

    it('should return 0 when price is 0', () => {
      expect(calcMarketValue(10, 0)).toBe(0);
    });

    it('should handle decimal quantities and prices', () => {
      expect(calcMarketValue(2.5, 10.4)).toBe(26);
    });
  });

  describe('calcCostBasis', () => {
    it('should calculate cost basis correctly', () => {
      expect(calcCostBasis(10, 100)).toBe(1000);
    });

    it('should return 0 when quantity is 0', () => {
      expect(calcCostBasis(0, 100)).toBe(0);
    });

    it('should return 0 when avg price is 0', () => {
      expect(calcCostBasis(10, 0)).toBe(0);
    });

    it('should handle decimal quantities and prices', () => {
      expect(calcCostBasis(2.5, 10.4)).toBe(26);
    });

    it('should handle large values', () => {
      expect(calcCostBasis(1000, 123.45)).toBe(123450);
    });
  });

  describe('calcGain', () => {
    it('should calculate gain correctly', () => {
      expect(calcGain(10, 110, 100)).toBe(100);
    });

    it('should calculate loss correctly', () => {
      expect(calcGain(10, 90, 100)).toBe(-100);
    });

    it('should return 0 when quantity is 0', () => {
      expect(calcGain(0, 110, 100)).toBe(0);
    });

    it('should handle avg price of 0', () => {
      expect(calcGain(10, 100, 0)).toBe(1000);
    });

    it('should handle last price of 0', () => {
      expect(calcGain(10, 0, 100)).toBe(-1000);
    });

    it('should return 0 when prices are equal', () => {
      expect(calcGain(10, 100, 100)).toBe(0);
    });
  });

  describe('calcTotalReturnPct', () => {
    it('should calculate positive return percentage correctly', () => {
      expect(calcTotalReturnPct(10, 110, 100)).toBe(10);
    });

    it('should calculate negative return percentage correctly', () => {
      expect(calcTotalReturnPct(10, 90, 100)).toBe(-10);
    });

    it('should return 0 when avg price is 0', () => {
      expect(calcTotalReturnPct(10, 100, 0)).toBe(0);
    });

    it('should handle quantity of 0 (quantity does not affect percentage)', () => {
      expect(calcTotalReturnPct(0, 110, 100)).toBe(10);
    });

    it('should return 0 when prices are equal', () => {
      expect(calcTotalReturnPct(10, 100, 100)).toBe(0);
    });

    it('should handle 100% gain', () => {
      expect(calcTotalReturnPct(10, 200, 100)).toBe(100);
    });

    it('should handle total loss (-100%)', () => {
      expect(calcTotalReturnPct(10, 0, 100)).toBe(-100);
    });
  });

  describe('calcQtyFromAmount', () => {
    it('should calculate quantity correctly (floor)', () => {
      expect(calcQtyFromAmount(1000, 30)).toBe(33);
    });

    it('should floor the result', () => {
      expect(calcQtyFromAmount(100, 30)).toBe(3);
    });

    it('should return 0 when price is 0', () => {
      expect(calcQtyFromAmount(1000, 0)).toBe(0);
    });

    it('should return 0 when amount is 0', () => {
      expect(calcQtyFromAmount(0, 50)).toBe(0);
    });

    it('should handle exact division', () => {
      expect(calcQtyFromAmount(1000, 100)).toBe(10);
    });

    it('should handle amount less than price', () => {
      expect(calcQtyFromAmount(50, 100)).toBe(0);
    });

    it('should handle decimal prices', () => {
      expect(calcQtyFromAmount(1000, 33.33)).toBe(30);
    });

    it('should handle large amounts', () => {
      expect(calcQtyFromAmount(100000, 123.45)).toBe(810);
    });
  });
});
