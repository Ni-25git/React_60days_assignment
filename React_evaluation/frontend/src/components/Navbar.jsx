import React from 'react';
import { Flex, Link as ChakraLink, Text, Button } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

const links = [
  {
    to: '/',
    label: 'HOME',
  },
  {
    to: '/productDetails',
    label: 'ProductDetails',
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { authDetails, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex align="center" justify="space-around" padding="4" background="gray.400">
      {links.map((link) => (
        <ChakraLink as={ReactRouterLink} to={link.to} key={link.to} color="gray.900">
          {link.label}
        </ChakraLink>
      ))}
      {authDetails?.isAuthenticated? (
        <>
          <Text>{authDetails?.email}</Text>
          <ChakraLink as={ReactRouterLink} to="/" color="gray.900">
            Home
          </ChakraLink>
          <Button variant="solid" colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <ChakraLink as={ReactRouterLink} to="/login" color="gray.900">
          LOGIN
        </ChakraLink>
      )}
    </Flex>
  );
};

export default Navbar;