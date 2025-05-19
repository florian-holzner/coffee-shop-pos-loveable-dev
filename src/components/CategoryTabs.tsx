
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category } from '@/types/pos';
import MenuItem from '@/components/MenuItem';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CategoryTabsProps {
  categories: Category[];
}

const CategoryTabs = ({ categories }: CategoryTabsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Tabs defaultValue={categories[0].id} className="w-full">
      <TabsList className={cn(
        "flex w-full overflow-x-auto scrollbar-none bg-cream-50 p-1",
        isMobile ? "justify-start" : "justify-center"
      )}>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-coffee-500 data-[state=active]:text-white"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
        <TabsContent 
          key={category.id} 
          value={category.id}
          className="mt-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.items.map((product) => (
              <MenuItem key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
