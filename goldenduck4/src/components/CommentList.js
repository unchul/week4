import React from 'react';
import { Grid, Image, Text } from '../elements';

const CommentList = () => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;
  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Image shape="circle" />
        <Text bold font="Cafe24Ohsquareair">
          {user_name}
        </Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Text margin="0px" bold font="Cafe24Ohsquareair">
          {contents}
        </Text>
        <Text margin="0px" bold font="Cafe24Ohsquareair">
          {insert_dt}
        </Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile: '',
  user_name: 'Duck',
  user_id: '',
  post_id: 1,
  contents: '귀여운 참새네요!',
  insert_dt: '2022-06-09 04:44:44',
};
