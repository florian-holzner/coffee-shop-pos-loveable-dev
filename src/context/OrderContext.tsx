
import React, { createContext, useContext, useReducer } from 'react';
import { Product } from '../types/pos';
import { toast } from '@/components/ui/sonner';
import { orderReducer, initialState, OrderState, OrderAction } from './orderReducer';

interface OrderContextType {
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
  addItem: (product: Product) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearOrder: () => void;
  completeOrder: () => void;
}

// Create the context
const OrderContext = createContext<OrderContextType>({
  state: initialState,
  dispatch: () => null,
  addItem: () => null,
  removeItem: () => null,
  updateQuantity: () => null,
  clearOrder: () => null,
  completeOrder: () => null,
});

// Provider component
export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast(`Added ${product.name} to order`);
  };

  const removeItem = (index: number) => {
    const itemName = state.currentOrder.items[index]?.product.name;
    dispatch({ type: 'REMOVE_ITEM', payload: index });
    if (itemName) {
      toast(`Removed ${itemName} from order`);
    }
  };

  const updateQuantity = (index: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
  };

  const clearOrder = () => {
    dispatch({ type: 'CLEAR_ORDER' });
    toast('Order cleared');
  };

  const completeOrder = () => {
    if (state.currentOrder.items.length === 0) {
      toast.error('Cannot complete an empty order');
      return;
    }
    
    dispatch({ type: 'COMPLETE_ORDER' });
    toast.success('Order completed!');
  };

  return (
    <OrderContext.Provider
      value={{ 
        state, 
        dispatch, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearOrder, 
        completeOrder 
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the context
export const useOrder = () => useContext(OrderContext);

// Re-export types that might be needed by consumers of this context
export type { OrderState, OrderAction } from './orderReducer';
