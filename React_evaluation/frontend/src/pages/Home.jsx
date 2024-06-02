import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Card, CardBody, CardFooter, Button, Select, useBreakpointValue, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState('ascending');
  const [category, setCategory] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products');
        setProducts(response.data.data); // Access the correct property
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const sortParam = searchParams.get('sort');
    const categoryParam = searchParams.get('category');
    if (sortParam) setSort(sortParam);
    if (categoryParam) setCategory(categoryParam);
  }, [searchParams]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setSearchParams({ sort: e.target.value, category });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSearchParams({ sort, category: e.target.value });
  };

  const filteredProducts = products.filter((product) => {
    if (category === 'all') return true;
    return product.category === category;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sort === 'ascending') return a.price - b.price;
    return b.price - a.price;
  });

  const cols = useBreakpointValue({
    base: 1,
    md: 2,
    lg: 3,
  });

  return (
    <Box p={4}>
      <Box mb={4}>
        <Select value={sort} onChange={handleSortChange} mb={2}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </Select>
        <Select value={category} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="home-decor">Home Decor</option>
        </Select>
      </Box>
      <Grid templateColumns={`repeat(${cols}, 1fr)`} gap={4}>
        {loading ? (
          <GridItem colSpan={cols}>
            <Card>
              <CardBody>Loading...</CardBody>
            </Card>
          </GridItem>
        ) : error ? (
          <GridItem colSpan={cols}>
            <Card>
              <CardBody>Error loading products</CardBody>
            </Card>
          </GridItem>
        ) : (
          sortedProducts.map((product) => (
            <GridItem key={product.id}>
              <Card>
                <CardBody>
                  <h2>{product.title}</h2>
                  <p>Category: {product.category}</p>
                  <p>Price: {product.price}</p>
                </CardBody>
                <CardFooter>
                  <Button as="a" href={`/products/${product.id}`} variant="solid" colorScheme="red">
                    More Details
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
