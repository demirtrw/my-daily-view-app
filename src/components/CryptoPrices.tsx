
import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface CryptoPrice {
  symbol: string;
  price: number;
  previousPrice?: number;
  trend?: 'up' | 'down' | 'neutral';
}

const CryptoPrices = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const cryptos = ['BTC', 'ETH', 'XRP', 'SOL'];

  const fetchPrices = async () => {
    try {
      const promises = cryptos.map(crypto =>
        fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${crypto}USDT`)
          .then(res => res.json())
      );

      const results = await Promise.all(promises);
      
      const newPrices = results.map((result, index) => {
        const currentPrice = parseFloat(result.price);
        const previousPrice = prices[index]?.price;
        
        let trend: 'up' | 'down' | 'neutral' = 'neutral';
        if (previousPrice !== undefined) {
          if (currentPrice > previousPrice) trend = 'up';
          else if (currentPrice < previousPrice) trend = 'down';
        }

        return {
          symbol: cryptos[index],
          price: currentPrice,
          previousPrice,
          trend
        };
      });

      setPrices(newPrices);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      if (isLoading) {
        toast({
          title: "Error",
          description: "Failed to fetch crypto prices",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(4)}`;
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-700 dark:text-gray-300';
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-500" />;
      default: return null;
    }
  };

  return (
    <Card className="border-0 shadow-lg dark:bg-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
          Crypto Prices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          // Loading skeletons
          <>
            {cryptos.map((crypto) => (
              <div key={crypto} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-4 w-4" />
                </div>
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </>
        ) : (
          // Actual prices
          <>
            {prices.map((crypto) => (
              <div 
                key={crypto.symbol} 
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 min-w-[40px]">
                    {crypto.symbol}
                  </span>
                  {getTrendIcon(crypto.trend)}
                </div>
                <div className={`font-mono font-semibold transition-all duration-500 ${getTrendColor(crypto.trend)}`}>
                  {formatPrice(crypto.price)}
                </div>
              </div>
            ))}
          </>
        )}
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
          Updates every second • Powered by Binance
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoPrices;
