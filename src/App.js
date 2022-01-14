import logo from './logo.svg';
import './App.css';
import Popup from 'reactjs-popup';
import { useState, Component } from 'react'

function App() {
  const [counter, incr] = useState(0);
  const callback = () => incr(counter + 1);

  const [open, setOpen] = useState(false);
  const closeModal = () => {setOpen(false); addTask(callback) };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          TO DO APP
        </h1>
      <h2> MENU </h2>
      </header>
      <div>
        <button className="AddTask" onClick={() => setOpen(true)}> ADD TASK </button>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div>
      { Task("Make todo app", callback) }
      </div>
      <div>
        { getTasks(callback) }
      </div>
      <Popup closeOnDocumentClick open={open} onClose={closeModal} modal>
      {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Modal Title </div>
        <div className="content">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
      </Popup>

    </div>
  );
}

// () => showPopup(open, setOpen, callback)

function popup(open, setOpen, callback) {
  var showPopup = JSON.parse(localStorage.getItem("showPopup"));
  if (showPopup == undefined) showPopup = false;
 // return (showPopup ? <PopUp open={open} closeOnDocumentClick onClose={() => hidePopup(callback)} /> : null)
 return (<Popup closeOnDocumentClick open={open} onClose={() => hidePopup(callback)} /> )
}

// toggle={() => hidePopup(callback)}

function hidePopup(callback){ // TODO: Setopen(false)
  localStorage.setItem("showPopup", false);
  addTask(callback);
}
function showPopup(callback){
  localStorage.setItem("showPopup", true);
  callback();
}

function addTask(callback) {
  var storedNames = JSON.parse(localStorage.getItem("names"));
  if (storedNames == null) {
    storedNames = [];
  }
  storedNames.push("Some task");
  localStorage.setItem("names", JSON.stringify(storedNames));
  callback();
}

function removeTask(title, callback) {
  var storedNames = JSON.parse(localStorage.getItem("names"));
  if (storedNames == null) {
    storedNames = [];
    return;
  }
  storedNames = storedNames.filter(item => item !== title);
  localStorage.setItem("names", JSON.stringify(storedNames));
  callback();
}

function getTasks(callback) {
  var storedNames = JSON.parse(localStorage.getItem("names"));
  if (storedNames == null) {
    storedNames = [];
  }
  return (storedNames.map(title => Task(title, callback)));
}
function Task(title, callback) {
  return (
          <div className="Task">
              <div className="taskName">
                  { title }
              </div>
              <div className="description">
                  Description
              </div>
              <button className="done" onClick={() => removeTask(title, callback)}>Done</button>
          </div>
      )
  }

class PopUp extends Component {
  handleClick = () => {
   this.props.toggle();
  };
render() {
  return (
    <Popup trigger={<button onClick={this.handleClick}> Trigger</button>} modal>
    <div>Popup content here !!</div>
    <button onClick={this.handleClick}>Close</button>
  </Popup>
  );
 }
}

export default App;
