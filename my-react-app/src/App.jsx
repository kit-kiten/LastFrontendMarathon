import './App.css'
import React from "react";

const serverUrl =  'https://api.genderize.io'

function showResult(result){
  const resultOutput = document.querySelector('.result')
  resultOutput.textContent = result
}

class Main extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <input onChange={this.props.onСhangeInputState} className={"main-input"} placeholder="Enter name:" />
    )
  }
}

class Button extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
        <button className={"btn"}>Check sex by name</button>
    )
  }
}

class TextOutput extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <p className={"result"}>Here will be result...</p>
    )
  }
}

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {inputName: ''}
    this.submitOnServer = this.submitOnServer.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  submitOnServer(e){
    e.preventDefault()
    const firstName = this.state.inputName

    const fullUrl = `${serverUrl}?name=${firstName}`
    fetch(fullUrl)
        .then(response => response.json())
        .then(result => showResult(`${firstName} - ${result.gender}`))
  }

  handleChange(e){
    this.setState({
      inputName: e.target.value
    })
  }

  render() {
    return(
        <form onSubmit={this.submitOnServer} className={"wrapper"}>
          <Main onСhangeInputState={this.handleChange} />
          <Button/>
          <TextOutput/>
        </form>
    )
  }
}

export default App
