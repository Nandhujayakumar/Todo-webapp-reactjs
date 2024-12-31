import { useState } from "react";
import "./style.css"

export default function App(){

  const [newItem, setnewitem] = useState("")
  const [todo, setTodo] = useState([])

  function handleSubmit(e){
    e.preventDefault()

    setTodo(currentTodo => {
      return [
        ...currentTodo, {
          id : crypto.randomUUID(), title: newItem , completed : false
        }
      ]
    })

    setnewitem("")

  }

  
  function toggleTodo(id, completed){
     setTodo(currentTodo => {
      return currentTodo.map(
        todo=> {
          if (todo.id == id) {
            return { ...todo, completed}
          }
          return todo
        }
      )
     })
  }

  function deleteTodo(id){
    setTodo(currentTodo => {
      return currentTodo.filter(todo => todo.id !== id)
    })
  }


  return(
    <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input type="text" id="item" value={newItem} onChange={e => setnewitem(e.target.value)}/>
      </div>
      <button className="btn">Add item</button>
    </form>

    <h1 className="header">ToDo List</h1>

    <ul className="list">
      {todo.length === 0  && "No Todos"}
      {todo.map(todo => {
        return <li key={todo.id}>
        <label>
          <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
            {todo.title}
        </label>
        <button className="btn btn-danger">Details</button>
        <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>delete Todo</button>
      </li>
      })}

    </ul>
    </>
  );
}