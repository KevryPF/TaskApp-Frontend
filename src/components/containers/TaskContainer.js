import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { fetchTaskThunk } from "../../store/thunks";
import { TaskView } from "../views";

//Added this from https://stackoverflow.com/questions/69967745/react-router-v6-access-a-url-parameter 
//because react-router v6 doesn't have route props
const withRouter = WrappedComponent => props => {
  const params = useParams();
  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};

class TaskContainer extends Component {
  componentDidMount() {
    //getting task ID from url
    this.props.fetchTask(this.props.params.id);
  }

  render() {
    return (
      <TaskView 
        task={this.props.task}
      />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    task: state.task,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
  };
};

export default withRouter(connect(mapState, mapDispatch)(TaskContainer));