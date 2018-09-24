import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import * as actions from "../../store/actions/movie";
import { updateObject, checkValidity } from "../../shared/utility";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addForm: {
        title: {
          elementConfig: {
            type: "text",
            placeholder: "Title"
          },
          validation: {
            required: true
          },
          value: '',
          valid: false,
          touched: false
        },
        release_year: {
          elementConfig: {
            type: "text",
            placeholder: "Release year"
          },
          validation: {
            isNumeric: true,
            maxLength: 4,
            minLength: 4,
            required: true
          },
          value: '',
          valid: false,
          touched: false
        },
        format: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Format"
          },
          validation: {
            maxLength: 10,
            required: true
          },
          value: '',
          valid: false,
          touched: false
        },
        stars: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Stars"
          },
          validation: {
            required: true,
            withoutNumbers: true
          },
          value: '',
          valid: false,
          touched: false
        }
      },
      formIsValid: false
    };
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.addForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.addForm[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedAddForm = updateObject(this.state.addForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedAddForm) {
      formIsValid = updatedAddForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      addForm: updatedAddForm,
      formIsValid: formIsValid
    });
  };

  addMovieHandler = event => {
    event.preventDefault();
    let data = new FormData(event.target);

    fetch("/api/add", {
      method: "POST",
      body: data,
      credentials: "same-origin"
    })
      .then(data => {
        if(!data.error){
          let form = {...this.state.addForm}
          for(let item in form){
            form[item].value =''
          }
          this.setState({addForm: form});
        }

        console.log(data);
      })
      .catch(e => console.log(e));
    this.props.initMovies();

  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.addForm) {
      formElementsArray.push({
        id: key,
        config: this.state.addForm[key]
      });
    }
    let form = (
      <form onSubmit={event => this.addMovieHandler(event)}>
        {formElementsArray.map(formElement => (
          <input
            className={
              !formElement.config.valid && formElement.config.touched
                ? "invalid"
                : null
            }
            key={formElement.id}
            name={formElement.id}
            type={formElement.config.elementConfig.type}
            value={formElement.config.value}
            placeholder={formElement.config.elementConfig.placeholder}
            required={formElement.config.validation.required}
            onChange={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <button type="submit"  disabled={!this.state.formIsValid}>Add</button>
      </form>
    );
    return (
      <div className="home__sidebar">
        <h4>Add movie:</h4>
        {form}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initMovies: () => dispatch(actions.initMovies()),
    sortMovies: () => dispatch(actions.sortMovies())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SideBar)
);
