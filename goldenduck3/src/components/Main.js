import React from 'react'
import styled from 'styled-components';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';

import Word from './Word'

import { useNavigate } from 'react-router';

const Main = () => {
    const nav = useNavigate();

    function toAddPage() {
        nav('/add')
    }

    return (
        <WordContainer>
            <Header>나만의 사전</Header>

            <WordCard>
                <Word />
            </WordCard>

            <div onClick={() => { toAddPage() }} >
                <Add>
                    <Icon sx={{ fontSize: 50, color: green[500] }}>add_circle</Icon>
                </Add>

            </div>
        </WordContainer>
    )
}

const WordContainer = styled.div`
    margin: auto;
`;

const WordCard = styled.div`
    margin: 20px 220px;
`;

const Header = styled.div`
    position: sticky;
    top:10;
    left:0;
    padding: 10px;
    background: gold;
    font-size: 80px;
    width: 100vw;
    border-bottom: 1px solid #888;
`;

const Add = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 30px; 
    cursor: pointer;
`;

export default Main;