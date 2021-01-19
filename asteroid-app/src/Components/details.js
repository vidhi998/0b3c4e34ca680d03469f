import React, { Component, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { TextField, Button, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

const useStyles = makeStyles({
    root: {
      textAlign:'center',
      marginTop:'20%'
    },
    head:{
        fontSize:'28px',
        opacity:'0.5',
        marginBottom:'30px',
        borderBottom:'solid 1px #333333',
    },
    attr:{
        fontSize:'18px',
        fontWeight:'bold',
        textAlign:'left'

    },
    val:{
        fontSize:'18px',
        fontWeight:'bold',
        opacity:'0.5',
        marginLeft:'20px'
    },
    back:{
        // textAlign:'left',
        // float:'left',
        display:'block',
        marginBottom:'10px'
    },
  });

export default function AsteroidDetail (props)  {
    const [loading,setloading] = useState(true)
    useEffect(()=>{
        console.log("props:", props)
        if(props.location.asteroid_data){
            setloading(false);
        }
    })
    const classes = useStyles();
    const data = props.location.asteroid_data ? props.location.asteroid_data : {}
    const handleback=()=>{
        props.history.push({
            pathname:'/'
        })
    }
    return (
      <div className={classes.root}>
          {loading ? <CircularProgress/> :
            <div>
                <div className={classes.back_div}>
                    <Button onClick={handleback} className={classes.back}> Back</Button>
                    </div>
                <div>
                <div className={classes.head}>Asteroid Information Center</div>
                    <Typography className={classes.attr} component='span'>
                        Name  : 
                    </Typography>
                    <Typography className={classes.val} component='span'>
                       {data.name}
                    </Typography>
                    <br/>
                    <Typography className={classes.attr}   component='span'>
                    nasa_jpl_url  : 
                    </Typography>
                    <Typography  className={classes.val}  component='span'>
                    {data.url}
                    </Typography>
                    <br/>
                    <Typography className={classes.attr}   component='span'>
                    is_potentially_hazardous_asteroid  : 
                    </Typography>
                    <Typography  className={classes.val}  component='span'>
                    {data.is_hazardous ? 'Yes' : 'No'}
                    </Typography>
                </div>
            </div>
            }
      </div>
    );
  }

