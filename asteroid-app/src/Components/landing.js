import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { TextField, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { API_KEY } from "../Constants/api_data";

const styles = {
  root: {
    textAlign: "center",
    marginTop:'20%'
  },
  head:{
    fontSize:'28px',
    color:'#000000',
    opacity:'0.5',
    marginBottom:'30px'
  },
  submit:{
      margin:'20px'
  }
};

class Landing extends Component {
  state = {
    text: "",
    randomasteroidId: null,
    loading: false,
  };
  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };
  handleSubmit = () => {
    if (this.state.text.length > 0) {
      const ASTEROID_ID = this.state.text;
      axios
        .get(
          `https://api.nasa.gov/neo/rest/v1/neo/${ASTEROID_ID}?api_key=${API_KEY}`
        )
        .then((response) => {
          console.log("res:", response);
          const asteroid_data = {
            name: response.data.name,
            url: response.data.nasa_jpl_url,
            is_hazardious: response.data.is_potentially_hazardous_asteroid,
          };
          this.props.history.push({
            pathname: "/details",
            asteroid_data: asteroid_data,
          });
        })
        .catch((err) => {
          // if(error.response.status)
          console.log("error", err.response);
          if (err.response.status === 404) {
            window.alert("Id not found!!");
          } else {
            console.log("error!!!");
            window.alert("Something went Wrong!!");
          }
        });
    }
  };
  handleRandom = () => {
    this.setState({
      loading: true,
    });
    axios
      .get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`)
      .then((res) => {
        console.log(
          res.data.near_earth_objects[19],
          res.data.near_earth_objects.length * Math.random()
        );
        const random_no = parseInt(
          res.data.near_earth_objects.length * Math.random()
        );

        const randomasteroidId = res.data.near_earth_objects[random_no].id;
        console.log("random asteroid:", randomasteroidId);
        axios
          .get(
            `https://api.nasa.gov/neo/rest/v1/neo/${randomasteroidId}?api_key=${API_KEY}`
          )
          .then((response) => {
            const asteroid_data = {
              name: response.data.name,
              url: response.data.nasa_jpl_url,
              is_hazardious: response.data.is_potentially_hazardous_asteroid,
            };
            this.props.history.push({
              pathname: "/details",
              asteroid_data: asteroid_data,
            });
          })
          .catch((err) => {
            console.log("error!!!", err);
            window.alert("Something went Wrong!!");
          });
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <>
          <div className={classes.root}>
              <div className={classes.head}>Asteroid Information Center</div>
            <TextField
            //   variant="filled"
              label="Enter Asteroid ID"
              helperText="Input Integers only"
              type="number"
              onChange={this.handleChange}
            />
            <br/>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              disabled={this.state.text.length < 1 ? true : false}
              className={classes.submit}
            >
              Submit
            </Button>
            <Button variant="contained" color="primary" onClick={this.handleRandom}>
            Random Asteroid
            </Button>
        {this.state.loading ? "...Generating" : ""}
          </div>
      </>
    );
  }
}
export default withStyles(styles)(Landing);
