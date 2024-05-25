import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Product from '../components/product';

const MarketPlace = () => {
  const [products, setProducts] = useState([]);

  async function getMarketPlace() {
    const res = await fetch('/api/product');
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    getMarketPlace();
  }, []);

  return (
    <Flex w="100%" h="100%" flexDirection="column" alignItems="center" justifyContent="center">
      <Text fontSize="2xl" marginLeft={60}>Green Store</Text>
      <Flex gap="10px" flexWrap="wrap" justifyContent="center">
        {products.length > 0
          ? products.map(p => (
              p.image && p.name && p.description && p.price ? (
                <Product
                  key={p._id}
                  img={p.image}
                  head={p.name}
                  text={p.description}
                  price={p.price}
                />
              ) : null
            ))
          : <Text>No products available</Text>}
      </Flex>
    </Flex>
  );
};

export default MarketPlace;

