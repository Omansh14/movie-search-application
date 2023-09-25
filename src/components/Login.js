import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled.div`
min-height: 100vh;
display: flex;
align-items: center;
justify-content: center;
background-color: #f7fafc;
border: 1px solid black;
box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);
`;

const LoginForm = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 24rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const Form = styled.form``;

const Label = styled.label`
  display: block;
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    border-color: #2563eb;
  }
`;

const Button = styled.button`
  background-color: #2563eb;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #1e40af;
  }
`;

const Text = styled.p`
  font-size: 0.875rem;
  color: #000;

  a {
    color: #2563eb;
    text-decoration: underline;
  }
`;

const StyledError = styled.div`
  color: red;
  margin-top: 1rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        navigate("/");
        setError(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(`${errorMessage}`);
      });
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Title>Login</Title>
        <Form>
          <div style={{ marginBottom: 12 }}>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" onClick={onLogin}>
              Login
            </Button>
          </div>
          {error && <StyledError>{error}</StyledError>}
        </Form>
        <Text>
          No account yet? <NavLink to="/signup">Sign up</NavLink>
        </Text>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
