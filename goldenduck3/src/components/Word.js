import React from 'react'
import styled from 'styled-components';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteWordListFB, loadWordListFB } from '../redux/modules/word';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

const Word = () => {
    // useEffect(function, deps)
    // function : 실행하고자 하는 함수
    // deps : 배열 형태. function을 실행시킬 조건.
    // deps에 특정값을 넣게 되면 컴포넌트가 mount 될 때, 지정한 값이 업데이트될 때 useEffect를 실행합니다.
    useEffect(() => {
        dispatch(loadWordListFB());
    }, []);

    const word_list = useSelector(state => state.word.word_list)

    const nav = useNavigate();
    const dispatch = useDispatch();

    return (
        <Contents>
            {word_list && word_list.map((a, i) => {
                return (<Card key={i}>
                    <Wordwrap>
                        <div style={{ fontsize: '10px', float: 'left' }}>단어</div>
                        <div style={{ fontSize: '48px' }}>{a.name}</div>
                        <div style={{ fontsize: '10px', float: 'left' }}>의미</div>
                        <div style={{ fontSize: '20px' }}>{a.mean}</div>
                        <div style={{ fontsize: '10px', float: 'left' }}>해설</div>
                        <div style={{ fontSize: '20px', color: 'gold' }}>{a.anal}</div>
                        <div style={{ fontsize: '10px', float: 'left' }}>예시</div>
                        <div style={{ fontSize: '20px', color: 'blue' }}>{a.ex}</div>


                    </Wordwrap>
                    <IconWrap>
                        <BorderColorOutlinedIcon onClick={() => nav(`/${a.id}/edit`)} />
                        <DeleteOutlineOutlinedIcon onClick={() => { dispatch(deleteWordListFB(word_list[i].id)); dispatch(loadWordListFB()) }} />
                    </IconWrap>
                    {/* <Button onClick={() => {dispatch(deleteWordListFB(word_list[i].id)); dispatch(loadWordListFB())}}>삭제</Button>
                    <Button onClick={() => nav(`/${a.id}/edit`)}>수정</Button> */}
                </Card>)
            }
            )}
        </Contents>
    )
}

const Contents = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: auto;
`;

const Card = styled.div`
    display : block;
    border : 2px solid rgb(10, 112, 41);
    border-radius : 10px;
    width : 250px;
    margin : 10px;
`;

const Wordwrap = styled.div`
    float : left;
    margin : 10px 20px;
`;

const IconWrap = styled.div`
    float : right;
    margin : 15px 10px;
    padding : 0px 5px;
    border-radius : 30px;
    cursor: pointer;
`;

export default Word;