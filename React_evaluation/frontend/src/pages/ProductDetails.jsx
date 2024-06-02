import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Spinner,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import axios from 'axios';

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `https://api.example.com/products/${match.params.id}`
        );
        setProduct(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [match.params.id]);

  const handleAddToCart = () => {
    onOpen();
  };

  const handleConfirm = () => {
    onClose();
    alert('Item added to cart');
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Box>
      <Card>
        <CardHeader>
          <Flex justifyContent='space-between' alignItems='center'>
            <Text fontSize='xl'>{product.name}</Text>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{product.description}</Text>
          <Text>Price: ${product.price}</Text>
        </CardBody>
        <CardFooter>
          <Text>Category: {product.category}</Text>
        </CardFooter>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={null}
        onClose={onClose}
      >
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Add to Cart
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to add this item to cart?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme='red' onClick={handleConfirm} ml={3}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default ProductDetails;