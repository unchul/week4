import React from 'react'
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { updateWordListFB } from '../redux/modules/word';

const Edit = () => {
    const word_list = useSelector(state => state.word.word_list)
    const newName = useRef('');
    const newMean = useRef('');
    const newEx = useRef('');
    const newAnal = useRef('');

    const dispatch = useDispatch();
    const nav = useNavigate();

    const { id } = useParams();

    const newWord = word_list.filter((a, i) => a.id === id)
    const [edit, setEdit] = useState(newWord[0])

    const onChange = () => {
        setEdit({
            id: edit.id,
            name: newName.current.value,
            mean: newMean.current.value,
            ex: newEx.current.value,
            anal: newAnal.current.value,
        })
    }

    function firebaseupdateWord() {
        dispatch(updateWordListFB({
            id: edit.id,
            name: newName.current.value,
            mean: newMean.current.value,
            ex: newEx.current.value,
            anal: newAnal.current.value,
        }))
        nav('/')
    };


    return (
        <AddContainer>
            <div>
                <h1>단어 수정하기</h1>
                <div onChange={onChange}>
                    <AddWordBox>
                        <AddTitle>단어</AddTitle>
                        <AddInput type='text' defaultValue={edit.name} ref={newName}></AddInput>
                    </AddWordBox>
                    <AddWordBox>
                        <AddTitle>의미</AddTitle>
                        <AddInput type='text' defaultValue={edit.mean} ref={newMean}></AddInput>
                    </AddWordBox>
                    <AddWordBox>
                        <AddTitle>예시</AddTitle>
                        <AddInput type='text' defaultValue={edit.ex} ref={newEx}></AddInput>
                    </AddWordBox>
                    <AddWordBox>
                        <AddTitle>해설</AddTitle>
                        <AddInput type='text' defaultValue={edit.anal} ref={newAnal}></AddInput>
                    </AddWordBox>
                    <Button onClick={firebaseupdateWord}>저장하기</Button>
                </div>
            </div>
        </AddContainer>
    )
}


const Button = styled.button`
    padding: 5px 20px;
    border-radius: 30px;
    border: 1px solid #dadafc;
    font-weight : bolder;
    position : flex;
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
    margin : 100px;
`;

export default Edit;