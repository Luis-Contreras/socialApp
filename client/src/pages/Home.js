import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import Title from "../components/Title";
import { AuthContext } from "../context/auth";
import PostForm from "../templates/PostForm";
import { FETCH_POSTS_QUERY } from "../graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data ? data.getPosts : null;

  return (
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column className="title">
          <Title label="Recent post" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading Post...</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
