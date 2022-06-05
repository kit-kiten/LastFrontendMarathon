import './App.css'
import React from "react";

const serverUrl =  'https://api.genderize.io'

function Main(props) {
  return(
      <input onChange={props.onСhangeInputState} value={props.value} className={"main-input"} placeholder="Enter name:" />
  )
}

function Button() {
  return(
      <button className={"btn"}>Check sex by name</button>
  )
}

function TextOutput(props) {
  return(
      <p className={"result"}>{props.value}</p>
  )
}

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
                    inputName: '',
                    result: 'Here will be result...'
                 }
    this.submitOnServer = this.submitOnServer.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async submitOnServer(e){
    e.preventDefault()
    const firstName = this.state.inputName

    const fullUrl = `${serverUrl}?name=${firstName}`
    try {
      const response = await fetch(fullUrl)
      const responseToJson = await response.json()
      const gender = await responseToJson.gender

      this.setState({
        inputName: '',
        result: `${firstName}: ${gender}`
      })
    } catch (err){
      console.log(err)
    }
  }

  handleChange(e){
    this.setState({
      inputName: e.target.value
    })
  }

  render() {
    return(
        <form onSubmit={this.submitOnServer} className={"wrapper"}>
          <Main onСhangeInputState={this.handleChange} value={this.state.inputName} />
          <Button/>
          <TextOutput value={this.state.result}/>
        </form>
    )
  }
}

export default App
