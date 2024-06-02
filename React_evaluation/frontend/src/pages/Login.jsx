import React, { useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { authDetails, login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/login',
        data: {
          email,
          password,
        },
      });
      if (res?.data?.token) {
        login(res.data.token, email);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container maxW={'400px'}>
        <VStack spacing={4}>
          <Heading>Login Page</Heading>
          <Input
            placeholder='enter your email'
            size='md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='password'
            size='md'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant='solid' colorScheme='red' onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </Container>
    </>
  );
};

export default Login;