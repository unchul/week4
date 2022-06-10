import React from 'react';
import { Grid, Image, Button, Text } from '../elements';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { history } from '../redux/configureStore';

// 로그인 유지 세션 확인
import { apiKey } from '../shared/firebase';

const Header = React.memo((props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  // 세션 확인
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_login && is_session) {
    return (
      <HeaderBox>
        <Grid
          is_flex
          width="100vw"
          min_width="100vw"
          padding="10px 0 10px 30px"
          bg="#7DDCC4"
          border="3px solid rgb(220,156,52)"
        >
          <Text
            bold
            font="DOSMyungjo"
            size="50px"
            color="#DC9C34"
            _onClick={() => {
              history.push('/');
            }}
          >
            GoldenDuck
          </Text>

          <Grid is_flex min_width="225px" margin="0 20px">
            <Button width="70px">내 정보</Button>
            <Button width="70px">알림</Button>
            <Button
              width="70px"
              _onClick={() => {
                dispatch(userActions.logoutFB());
              }}
            >
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </HeaderBox>
    );
  } else {
    return (
      <HeaderBox>
        <Grid
          is_flex
          width="100vw"
          min_width="100vw"
          padding="10px 0 10px 30px"
          bg="#7DDCC4"
          border="3px solid rgb(220,156,52)"
        >
          <Text
            bold
            font="DOSMyungjo"
            size="50px"
            color="#DC9C34"
            _onClick={() => {
              history.push('/');
            }}
          >
            GoldenDuck
          </Text>
          <Grid is_flex min_width="150px" margin="0 20px">
            <Button
              width="70px"
              _onClick={() => {
                history.push('/login');
              }}
            >
              로그인
            </Button>
            <Button
              width="70px"
              _onClick={() => {
                history.push('/signup');
              }}
            >
              회원가입
            </Button>
          </Grid>
        </Grid>
      </HeaderBox>
    );
  }
});

const HeaderBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
export default Header;
