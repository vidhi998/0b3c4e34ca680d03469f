import React, { Component, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { TextField, Button, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

const useStyles = makeStyles({
    root: {
      textAlign:'center',


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
    return (
      <div className={classes.root}>
          {loading ? <CircularProgress/> :
            <div>
                <Typography variant="h4" >
                    Name  : {data.name}
                </Typography>
                <Typography variant="h4" >
                nasa_jpl_url  : {data.name}
                </Typography>
                <Typography variant="h4" >
                is_potentially_hazardous_asteroid  : {data.is_hazardous ? 'Yes' : 'No'}
                </Typography>
            </div>
            }
      </div>
    );
  }

