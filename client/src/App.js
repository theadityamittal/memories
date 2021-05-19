import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppBar, Container, Grid, Typography, Grow } from "@material-ui/core";

import { getPosts } from './actions/posts.js'
import Form from './component/Form/Form';
import Posts from './component/Posts/Posts';
import useStyles from './styles';
import memories from './images/memories.png'

const App = () => {
  const [currentID, setCurrentID] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentID, dispatch])

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height='60'/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentID={setCurrentID}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentID={currentID} setCurrentID={setCurrentID}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;