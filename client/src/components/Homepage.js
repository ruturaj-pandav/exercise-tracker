import React, { Component } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import AllExercise from "./AllExercise";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      exercises: [],
    };
  }
  getExercises = async () => {
    let response = await axios.get("http://localhost:8000/all-exercises");
    if (response) {
      if (response.data.status === true) {
        this.setState({ exercises: response.data.ex });
      }
    } else {
      //
    }
  };

  componentDidMount() {
    this.getExercises();
  }
  render() {
    return (
      <>
        <Navbar />
        <div>
          <AllExercise  getExercises = {this.getExercises} exercises = {this.state. exercises}/>
        </div>
      </>
    );
  }
}
