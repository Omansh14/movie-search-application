import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import styled from "styled-components";

const StyledSignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7fafc;
  border: 1px solid black;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);
`;

const StyledFormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 24rem;
`;

const StyledHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled.label`
  display: block;
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    border-color: #4299e1;
  }
`;

const StyledButton = styled.button`
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

const StyledError = styled.div`
  color: red;
  margin-top: 1rem;
`;

const StyledLink = styled.p`
  margin-top: 1rem;
  a {
    color: #4299e1;
  }
`;

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      // Update the user's profile with the username
      await updateProfile(userCredential.user, {
        displayName: userName,
      });
  
      // Successful signup
      const user = userCredential.user;
      setError(""); // Clear any previous errors
      navigate("/login");
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  return (
    <StyledSignupContainer>
      <StyledFormContainer>
        <StyledHeading>Sign Up</StyledHeading>
        <form>
        <div style={{ marginBottom: 12 }}>
            <StyledLabel htmlFor="username">Username</StyledLabel>
            <StyledInput
              type="text"
              label="Your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <StyledInput
              type="email"
              label="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="johndoe123@gmail.com"
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput
              type="password"
              label="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Abc@123"
            />
          </div>

          <StyledButton type="submit" onClick={onSubmit}>
            Sign up
          </StyledButton>

          {error && <StyledError>{error}</StyledError>}
        </form>

        <StyledLink>
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </StyledLink>
      </StyledFormContainer>
    </StyledSignupContainer>
  );
};

export default Signup;
