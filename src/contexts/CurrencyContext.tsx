import React, { createContext, useContext, useState } from 'react';

export type Currency = 'USD' | 'AED' | 'SAR' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
}

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  AED: 'د.إ',
  SAR: '﷼',
  EUR: '€',
};

const currencyRates: Record<Currency, number> = {
  USD: 1,
  AED: 3.67,
  SAR: 3.75,
  EUR: 0.92,
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = (price: number): string => {
    const convertedPrice = price * currencyRates[currency];
    const symbol = currencySymbols[currency];
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
