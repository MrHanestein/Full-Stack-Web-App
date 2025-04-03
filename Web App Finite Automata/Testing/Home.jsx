// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  font-family: 'Segoe UI', sans-serif;
  background: #f0f2f5;
  padding: 20px;
  text-align: center;
`;

const ChapterList = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 600px;
  margin: 20px auto;
`;

const ChapterItem = styled.li`
  background: #4CAF50;
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
`;

const ChapterLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: block;
`;

const Home = () => {
    return (
        <HomeContainer>
            <h1>Automata Learning App</h1>
            <ChapterList>
                <ChapterItem>
                    <ChapterLink to="/chapter/1.1">Chapter 1.1: Finite Automata</ChapterLink>
                </ChapterItem>
                <ChapterItem>
                    <ChapterLink to="/chapter/1.2">Chapter 1.2: Nondeterminism</ChapterLink>
                </ChapterItem>
                <ChapterItem>
                    <ChapterLink to="/chapter/1.3">Chapter 1.3: Regular Expressions</ChapterLink>
                </ChapterItem>
                <ChapterItem>
                    <ChapterLink to="/chapter/1.4">Chapter 1.4: Nonregular Languages</ChapterLink>
                </ChapterItem>
            </ChapterList>
        </HomeContainer>
    );
};

export default Home;
