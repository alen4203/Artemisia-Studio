import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CurrencyCode = 'TWD' | 'USD' | 'CNY';

interface CurrencyContextType {
    currency: CurrencyCode;
    setCurrency: (code: CurrencyCode) => void;
    rates: Record<string, number>;
    convertPrice: (twdPrice: number) => { value: string; symbol: string; formatted: string };
    isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const SYMBOLS: Record<CurrencyCode, string> = {
    TWD: 'NT$',
    USD: '$',
    CNY: '¥',
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrencyState] = useState<CurrencyCode>('TWD');
    const [rates, setRates] = useState<Record<string, number>>({ TWD: 1 });
    const [isLoading, setIsLoading] = useState(true);

    // Initialize from localStorage if available
    useEffect(() => {
        const savedCurrency = localStorage.getItem('selectedCurrency') as CurrencyCode;
        if (savedCurrency && (['TWD', 'USD', 'CNY'] as CurrencyCode[]).includes(savedCurrency)) {
            setCurrencyState(savedCurrency);
        }
    }, []);

    const setCurrency = (code: CurrencyCode) => {
        setCurrencyState(code);
        localStorage.setItem('selectedCurrency', code);
    };

    useEffect(() => {
        const fetchRates = async () => {
            try {
                setIsLoading(true);
                // Using open.er-api.com which is a free public API (no key required for basic usage)
                const response = await fetch('https://open.er-api.com/v6/latest/TWD');
                const data = await response.json();

                if (data && data.rates) {
                    setRates(data.rates);
                }
            } catch (error) {
                console.error('Failed to fetch exchange rates:', error);
                // Fallback rates if API fails (approximate)
                setRates({
                    TWD: 1,
                    USD: 0.031,
                    CNY: 0.22,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchRates();
    }, []);

    const convertPrice = (twdPrice: number) => {
        const rate = rates[currency] || 1;
        const value = (twdPrice * rate).toFixed(currency === 'TWD' ? 0 : 2);
        const symbol = SYMBOLS[currency];

        return {
            value,
            symbol,
            formatted: `${symbol}${value}`,
        };
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, rates, convertPrice, isLoading }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
