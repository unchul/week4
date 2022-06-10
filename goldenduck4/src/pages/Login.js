import React from 'react';
import { Grid, Text, Input, Button } from '../elements';
import { setCookie, deleteCookie } from '../shared/Cookie';

import { actionCreators as userActions } from '../redux/modules/user'; // as : 별명 주는거
import { useDispatch } from 'react-redux';
import { emailCheck } from '../shared/common';

function Login(props) {
  const dispatch = useDispatch();
  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const changeId = (e) => {
    setId(e.target.value);
  };

  const changePwd = (e) => {
    setPwd(e.target.value);
  };

  const login = () => {
    if (id === '' || pwd === '') {
      window.alert('아이디 혹은 비밀번호가 공란입니다! 입력해주세요!');
      return;
    }

    if (!emailCheck(id)) {
      window.alert('이메일 형식이 맞지 않습니다!');
      return;
    }
    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid height="100vh" is_fixed min_width="100vw" bg="rgb(250,250,250)">
        <Grid
          border="1px solid rgb(219, 219, 219)"
          width="485px"
          margin="100px auto"
          bg="#FFE4FF"
          padding="20px"
        >
          <Text bold font="DOSMyungjo" size="60px" is_center>
            Log in
          </Text>
          <Input
            value={id}
            _onChange={changeId}
            placeholder="아이디를 입력하세요"
          />
          <Input
            value={pwd}
            _onChange={changePwd}
            type="password"
            placeholder="비밀번호를 입력하세요"
          />

          <Button
            _onClick={() => {
              login();
            }}
            // 버튼 활성화 체크
            is_disabled={id === '' || pwd === '' || !emailCheck(id)}
          >
            로그인
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Login;
