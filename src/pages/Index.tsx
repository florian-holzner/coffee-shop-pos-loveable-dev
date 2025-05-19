
import React, { useState } from 'react';
import { categories } from '@/data/menuItems';
import CategoryTabs from '@/components/CategoryTabs';
import OrderSummary from '@/components/OrderSummary';
import Receipt from '@/components/Receipt';
import { OrderProvider, useOrder } from '@/context/OrderContext';
import { Coffee } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Order } from '@/types/pos';

const POSContent = () => {
  const { state } = useOrder();
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const lastCompletedOrder = state.orderHistory[0];
    if (lastCompletedOrder && !receiptOpen) {
      setReceiptOrder(lastCompletedOrder);
      setReceiptOpen(true);
    }
  }, [state.orderHistory]);

  return (
    <>
      <div className="flex flex-col h-full">
        <header className="bg-coffee-800 text-white p-4 shadow-md">
          <div className="container flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coffee size={24} />
              <h1 className="text-xl font-bold">Brew Haven POS</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 container py-4 flex flex-col md:flex-row gap-4 h-full">
          {isMobile ? (
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <CategoryTabs categories={categories} />
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <OrderSummary />
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 bg-white rounded-lg shadow p-4">
                <CategoryTabs categories={categories} />
              </div>
              <div className="w-full md:w-96 lg:w-1/3">
                <OrderSummary />
              </div>
            </>
          )}
        </main>
      </div>

      <Receipt 
        order={receiptOrder} 
        open={receiptOpen}
        onClose={() => setReceiptOpen(false)}
      />
    </>
  );
};

const POSPage = () => {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-cream-100">
        <POSContent />
      </div>
    </OrderProvider>
  );
};

export default POSPage;
