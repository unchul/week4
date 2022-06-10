import React from 'react';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
import { Grid } from '../elements';

import { useSelector } from 'react-redux';

import { firestore } from '../shared/firebase';

const PostDetail = (props) => {
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post_data = post_list[post_idx];

  const [post, setPost] = React.useState(post_data ? post_data : null); // post_data가 있으면 초기값 넣어주기

  React.useEffect(() => {
    if (post) {
      //post가 있으면 아래 코드가 실행될 필요가 없다.
      return;
    }

    // 아래 코드는 새로고침시 리덕스 데이터가 날아가서 날아가는 것을 방지하기 위해
    // 파이어스토어에서 가져오는 것
    const postDB = firestore.collection('post');
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc);
        console.log(doc.data());

        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf('user_') !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );

        setPost(post);
      });
  }, []);

  return (
    <React.Fragment>
      <Grid padding="100px 0">
        <Grid
          width="940px"
          min_width="485px"
          margin="auto"
          bg="#fff"
          border="1px solid rgb(219,219,219)"
          padding="20px"
        >
          {post && (
            <Post
              {...post}
              // 비로그인시에는 user_info가 없어서 먼저 있는지 체크하는 것을 넣어주고 uid를 비교
              is_me={user_info && post.user_info.user_id === user_info.uid}
            />
          )}
          <CommentWrite />
          <CommentList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PostDetail;
