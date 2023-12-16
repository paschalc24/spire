import express from 'express';
import cors from 'cors';
import Store from './store.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/posts', (req, res) => {
  const posts = Store.read();
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  const posts = Store.read();
  if (type === 'PostCreated') {
    const { id, title } = data;
    console.log(`${process.pid} Query Service: PostCreated ${id}`)
    posts[id] = { id, title, comments: []};
  }
  if (type === 'CommentVoted') {
    const { commentId, postId, votes} = data;
    console.log(`${process.pid} Query Service: CommentVoted postId: ${postId} commentId: ${commentId}`)
    posts[postId]['comments'][0]['votes'] = votes;
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    console.log(`${process.pid} Query Service: CommentCreated ${id}`)
    console.log(`post id = ${postId}`);
    const post = posts[postId];
    console.log(post);
    post.comments.push({ id, content, "status": "under_review", votes: 0});
  }
  
  if (type === 'CommentModerated') {
    const { id, content, postId, status } = data;
    console.log(`${process.pid} Query Service: CommentModerated ${id}`)
    console.log(`post id = ${postId}`);
    console.log(content, status);
    const post = posts[postId];
    const comments = post.comments;
    const commentIndex = comments.findIndex(e => e.id === id);
    if (status === 406) {
      posts[postId].comments[commentIndex].status = 406;
    }
    else {
      posts[postId].comments[commentIndex].status = 200;
    }
  }

  Store.write(posts);

  res.send({ status: 'OK' });
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
