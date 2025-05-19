
import React from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/pos';
import { useOrder } from '@/context/OrderContext';
import { motion } from 'framer-motion';
import { CupSoda } from 'lucide-react';

interface MenuItemProps {
  product: Product;
}

const MenuItem = ({ product }: MenuItemProps) => {
  const { addItem } = useOrder();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-coffee-800">{product.name}</h3>
        <div className="w-10 h-10 bg-cream-100 text-coffee-500 rounded-md flex items-center justify-center">
          <CupSoda size={20} />
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-coffee-600 font-medium">${product.price.toFixed(2)}</span>
        <Button 
          onClick={() => addItem(product)} 
          variant="outline"
          className="bg-coffee-500 hover:bg-coffee-600 text-white border-none hover:text-white"
        >
          Add
        </Button>
      </div>
    </motion.div>
  );
};

export default MenuItem;
