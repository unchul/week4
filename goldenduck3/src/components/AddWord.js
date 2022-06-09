import React from 'react'
import styled from 'styled-components';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addWordListFB } from '../redux/modules/word';

const AddWord = () => {
    const addname = useRef('');
    const addmean = useRef('');
    const addex = useRef('');
    const addanal = useRef('');

    const dispatch = useDispatch();
    const nav = useNavigate();

    function firebaseAddWord() {
        dispatch(addWordListFB({
            name: addname.current.value,
            mean: addmean.current.value,
            anal: addanal.current.value,
            ex: addex.current.value,
        }))
        nav('/')
    };


    return (
        <AddContainer>
            <div>
                <h1>단어 추가하기</h1>
                <div>
                    <AddWordBox>
                        <AddTitle>단어</AddTitle>
                        <AddInput type='text' ref={addname}></AddInput>
                    </AddWordBox>
                    <AddWordBox>
                        <AddTitle>의미</AddTitle>
                        <AddInput type='text' ref={addmean}></AddInput>
                    </AddWordBox>
                    <AddWordBox>
                        <AddTitle>해설</AddTitle>
                        <AddInput type='text' ref={addanal}></AddInput>
                    </AddWordBox>
                    <AddWordBox>
                        <AddTitle>예시</AddTitle>
                        <AddInput type='text' ref={addex}></AddInput>
                    </AddWordBox>

                    <Button onClick={firebaseAddWord}>저장하기</Button>
                </div>
            </div>
        </AddContainer>
    )
}


const Button = styled.button`
    padding: 5px 20px;
    border-radius: 30px;
    border: 1px solid #dadafc;
    font-weight: bolder;
    position: flex;
    margin-top: 10px;
    cursor : pointer;
`;

const AddWordBox = styled.div`
    margin : 10px;
`;

const AddTitle = styled.div`
    margin : 5px;

`;

const AddInput = styled.input`
    width : 200px;
`;

const AddContainer = styled.div`
    position: center;
    margin: 50px;
    max-width: 300px;
    padding: 20px;
    display : block;
    border : 2px solid rgb(10, 112, 41);
    border-radius : 10px;
    
`;

export default AddWord;