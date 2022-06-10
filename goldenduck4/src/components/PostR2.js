import React from 'react';

import { Grid, Image, Text, Button } from '../elements';
import { history } from '../redux/configureStore';

import { actionCreators } from '../redux/modules/post';

import { firestore } from '../shared/firebase';

const PostR1 = (props) => {
  console.log(props.user_info.user_id);
  return (
    <React.Fragment>
      {/* 게시글 작성자 정보, 작성일, 수정 버튼 */}
      <Grid is_flex width="1fr">
        <Grid is_flex>
          <Image shape="circle" src={props.src} width="35px" height="35px" />
          <Text bold font="Cafe24Ohsquareair">
            {props.user_info.user_name}
          </Text>
        </Grid>
        <Grid is_flex>
          <Grid is_flex min_width="80px">
            {props.is_me && (
              <Button
                width="auto"
                margin="10px"
                _onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              >
                수정
              </Button>
            )}
            {props.is_me && (
              <Button
                width="auto"
                margin="10px"
                _onClick={() => {
                  // 삭제
                  const id = props.id;
                  const postDB = firestore.collection('post');
                  postDB
                    .doc(id)
                    .delete()
                    .then((doc) => {
                      // 새로고침
                      window.location.replace('/');
                    });
                  alert('삭제 완료');
                }}
              >
                삭제
              </Button>
            )}
          </Grid>
          <Grid margin="0 0 0 10px">
            <Text bold font="Cafe24Ohsquareair">
              {props.insert_dt}
            </Text>
          </Grid>
        </Grid>
      </Grid>

      {/* 게시한 이미지, 글, 댓글 */}
      <Grid is_flex min_width="100%">
        <Image
          shape="rectangle"
          src={props.image_url}
          _onClick={() => {
            history.push(`/post/${props.id}`);
          }}
        />
        <Grid padding="16px" min_width="50%" width="50%">
          <Text bold font="Cafe24Ohsquareair">
            {props.contents}
          </Text>
        </Grid>
      </Grid>
      <Grid padding="16px">
        <Text bold font="Cafe24Ohsquareair">
          댓글 {props.comment_cnt}개
        </Text>
      </Grid>
    </React.Fragment>
  );
};

PostR1.defaultProps = {
  user_info: {
    user_name: 'guest',
    user_profile:
      'http://storage.enuri.info/pic_upload/knowbox2/201909/0920148702019092563a27187-c035-40ef-9d20-10bbb9c08e1f.jpeg',
  },
  image_url:
    'http://storage.enuri.info/pic_upload/knowbox2/201909/0920148702019092563a27187-c035-40ef-9d20-10bbb9c08e1f.jpeg',
  contents: '뚱랑이',
  comment_cnt: 0,
  insert_dt: '2022-01-01 00:00:00',
  is_me: false,
};

export default PostR1;
