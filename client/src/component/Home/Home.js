import React from 'react'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { Container, Grid, Grow } from "@material-ui/core";
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { getPosts } from '../../actions/posts'
import useStyles from './styles';

const Home = () => {
    const [currentID, setCurrentID] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentID, dispatch])
    return (
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
    )
}

export default Home
