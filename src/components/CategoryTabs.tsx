
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/types/pos';
import MenuItem from '@/components/MenuItem';

interface CategoryTabsProps {
  categories: Category[];
}

const CategoryTabs = ({ categories }: CategoryTabsProps) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '');
  
  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="w-full">
      <div className="mb-6">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full max-w-xs bg-cream-50 border-coffee-200">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-coffee-200">
            {categories.map((category) => (
              <SelectItem 
                key={category.id} 
                value={category.id}
                className="hover:bg-coffee-50 focus:bg-coffee-100"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {currentCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentCategory.items.map((product) => (
            <MenuItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryTabs;
