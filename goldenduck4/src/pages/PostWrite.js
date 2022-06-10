import React from 'react';
import { Grid, Text, Button, Image, Input } from '../elements';
import Upload from '../shared/Upload';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  const { history } = props;

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = React.useState(_post ? _post.contents : '');
  const [style, setStyle] = React.useState('r1');

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log('포스트 정보가 없어요!');
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const clickRadio = (e) => {
    setStyle(e.target.id);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents, style));
  };

  const editPost = () => {
    dispatch(
      postActions.editPostFB(post_id, { contents: contents, style: style })
    );
  };

  if (!is_login) {
    return (
      <Grid padding="100px 0px" center>
        <Grid
          width="485px"
          min_width="485px"
          margin="auto"
          bg="#fff"
          border="1px solid rgb(219,219,219)"
          padding="20px"
        >
          <Text size="32px" bold font="Hardworking">
            앗! 잠깐!
          </Text>
          <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
          <Button
            _onClick={() => {
              history.replace('/login');
            }}
          >
            로그인하러 가기
          </Button>
        </Grid>
      </Grid>
    );
  }
  return (
    <React.Fragment>
      <Grid padding="100px 0" min_width="100%">
        <Grid
          width="940px"
          min_width="485px"
          margin="auto"
          bg="#fff"
          border="1px solid rgb(219,219,219)"
          padding="20px"
        >
          {is_edit ? (
            <Text bold font="DOSMyungjo" size="60px" is_center>
              게시글 수정
            </Text>
          ) : (
            <Text bold font="DOSMyungjo" size="60px" is_center>
              게시글 작성
            </Text>
          )}
          <Upload />

          <Grid margin="10px 0" min_width="100%">
            <Text size="20px" bold>
              미리보기
            </Text>
            <Grid margin="10px 0" min_width="100%">
              <input
                type="radio"
                id="r1"
                name="radio-box"
                onClick={clickRadio}
              />
              <label htmlFor="r1">오른쪽에 이미지, 왼쪽에 텍스트</label>
              <Grid
                padding="10px"
                min_width="100%"
                is_flex
                bg="rgb(230, 230, 230)"
                is_contents
              >
                <Grid min_width="50%" width="50%" padding="10px" bg="#fff">
                  <Text>{contents}</Text>
                </Grid>
                <Image
                  shape="rectangle"
                  src={preview ? preview : 'http://via.placeholder.com/400x300'}
                />
              </Grid>
            </Grid>
            <Grid margin="10px 0">
              <input
                type="radio"
                id="r2"
                name="radio-box"
                onClick={clickRadio}
              />
              <label htmlFor="r2">왼쪽에 이미지, 오른쪽에 텍스트</label>
              <Grid
                padding="10px"
                min_width="100%"
                is_flex
                bg="rgb(230, 230, 230)"
                is_contents
              >
                <Image
                  shape="rectangle"
                  src={preview ? preview : 'http://via.placeholder.com/400x300'}
                />
                <Grid min_width="50%" width="50%" padding="10px" bg="#fff">
                  <Text>{contents}</Text>
                </Grid>
              </Grid>
            </Grid>
            <Grid margin="10px 0">
              <input
                type="radio"
                id="r3"
                name="radio-box"
                onClick={clickRadio}
              />
              <label htmlFor="r3">하단에 이미지, 상단에 텍스트</label>
              <Grid
                padding="10px"
                min_width="100%"
                bg="rgb(230, 230, 230)"
                is_contents
              >
                <Grid padding="10px" height="auto" min_height="150px" bg="#fff">
                  <Text>{contents}</Text>
                </Grid>

                <Image
                  shape="rectangle"
                  src={preview ? preview : 'http://via.placeholder.com/400x300'}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid margin="30px 0">
            <Input
              _onChange={changeContents}
              label="게시글 내용"
              placeholder="게시글 작성"
              multiLine
            />
          </Grid>

          <Grid>
            {is_edit ? (
              <Button
                height="50px"
                size="30px"
                _onClick={editPost}
                is_disabled={contents === ''}
              >
                게시글 수정
              </Button>
            ) : (
              <Button
                height="50px"
                size="30px"
                _onClick={addPost}
                is_disabled={contents === ''}
              >
                게시글 작성
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
