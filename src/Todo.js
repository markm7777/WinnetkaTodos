import React from 'react';
import './App.css';
import {useState} from 'react';

function Todo() {
  const [task, setTask] = useState('');
  const [todoList, setTodoListItems] = useState([]);
  const [completedList, setCompletedItems] = useState([]);  

  const handleInput = (e) => {
    setTask(e.currentTarget.value);
  } 

  const handleAdd = () => {
    setTodoListItems([...todoList,task])
    setTask('');
  }

  const handleDeletePending = (id) => {
    const newList = todoList.filter((item, i) => i !== id);
    setTodoListItems(newList);
  }

  const handleDeleteCompleted = (id) => {
    const newList = completedList.filter((item, i) => i !== id);
    setCompletedItems(newList);
  }

  const handleCompleted = (id) => {
    setCompletedItems([...completedList,todoList[id]])
    const newList = todoList.filter((item, i) => i !== id);
    setTodoListItems(newList);
  }

  const handleUndo = (id) => {
    setTodoListItems([...todoList,completedList[id]])
    const newList = completedList.filter((item, i) => i !== id);
    setCompletedItems(newList);
  }

  const handleMoveup = (id) => {
    if (id !== 0) {  
      let temp = todoList[id];
      todoList[id] = todoList[id - 1]; 
      todoList[id - 1] = temp;
      setTodoListItems([...todoList])
    }
  }

  const handleMoveDown = (id) => {
    if (id !== todoList.length - 1) {
      let temp = todoList[id];
      todoList[id] = todoList[id + 1]; 
      todoList[id + 1] = temp;
      setTodoListItems([...todoList])
    }
  }

  const handleClearAllTodos = () => {
    setTodoListItems([]);
  }

  const handleClearAllCompleted = () => {
    setCompletedItems([]);
  }

  return (
    <div id='mainDiv'>
      <div id='header'>
        <div id='titleDiv'>
          <p>Things 
          <span style={{color: '#00ff00'}}> 'Todo' </span> 
            in Winnetka!</p>
        </div>
        <div id='addDiv'> 
          <input id='addInput' value={task} onChange={handleInput}></input>
          <button id='addButton' onClick={handleAdd}>Add</button>
        </div>
      </div> 
      <div id='mainContent'>

        <div id='listDiv'> 
          <div id='todoList'>
            <div id='todoListTitle'>Pending Tasks</div>
            <ul>
              {todoList.map((item, i) => {
                return (
                  <div id='liDiv' key={i}>
                    <div id='liDivButtons'>
                      <button id='upButton' onClick={() => handleMoveup(i)}>&#9650;</button>
                      <button id='downButton' onClick={() => handleMoveDown(i)}>&#9660;</button>
                    </div>  
                    <div id='liDivTask'>
                      <li>{item}</li>
                    </div>
                    <div id='liDivButtons'>
                      <button id='doneButton' onClick={() => handleCompleted(i)}>Done</button>
                      <button id='deleteButton' onClick={() => handleDeletePending(i)}>X</button>
                    </div>  
                  </div>)}
                )
              }
            </ul>
            <p className='taskCount'>{todoList.length} Task(s)</p>
          </div>
          <div id='doneList'>
            <div id='todoListTitle'>Completed Tasks</div>
            <ul>
              {completedList.map((item, i) => {
                return (
                  <div id='liDiv' key={i}>
                    <div id='liDivTask'>
                      <li>{item}</li>
                    </div>
                    <div id='liDivButtons'>
                      <button id='doneButton' onClick={() => handleUndo(i)}>Undo</button>
                      <button id='deleteButton' onClick={() => handleDeleteCompleted(i)}>X</button>
                    </div>  
                  </div>)}
                )
              }
            </ul>
            <p className='taskCount'>{completedList.length} Task(s)</p>
          </div>
        </div>
      </div> 
      <div id='footer'>
        <div id='footerButtons'>
          <button className='clearButton' onClick={handleClearAllTodos}>Clear All</button>
          <p id='copyright'>Winnetka Webworks, Inc. &#169; 2020</p>
          <button className='clearButton' onClick={handleClearAllCompleted}>Clear All</button>
        </div>
      </div> 
    </div>
  );
}

export default Todo;
