import React, { useState, useEffect } from "react";
import "./todo.css";

// get the localStorage data back
const getLocalData = () =>{
    const temp = JSON.parse(localStorage.getItem("TodoListItems"));
    if (temp){
        return temp;
    }
    else{
        return []
    }
     
}


const Todolist = () => {

    // add the items fucnction


    //edit the items


    // how to delete items section


    // adding localStorage
    const [inputData, setInputData] = useState("")
    const [todoItems, setTodoItems] = useState(getLocalData());
    const [editingItem,setEditingItem] = useState();
    const [togggleButt,setTogggleButt] = useState(false);
    // console.log(inputData);
    const addItem = () => {
        if (!inputData){
            alert("Enter data in input box");
            return;}
        else if (inputData && togggleButt){
            setTodoItems( todoItems.map((Curr)=>{
                if (Curr.id === editingItem.id )
                return {...Curr,data:inputData}
                return Curr;
            })
            )
            
            setInputData("");
            setTogggleButt(false);
            setEditingItem(null);
        }
    
        else{
        const newInputData = {
            id : new Date().getTime(),
            data : inputData
        }
        setInputData("");
        setTodoItems([newInputData,...todoItems])

        console.log(todoItems);
    }
};

    const deleteItem = (id) => {
        if (id === "all"){
            setTodoItems([]);
            return;
        }
        const newItems = todoItems.filter((curr)=>{
            if (id !== curr.id)
            return curr;
        })
        setTodoItems(newItems);
    }
    const editItem = (obj) =>{
        setInputData(obj.data);
        setTogggleButt(true);
        setEditingItem(obj);
        // deleteItem(obj.id);
    }
    useEffect(() => {
      localStorage.setItem("TodoListItems",JSON.stringify(todoItems))
    }, [todoItems])
    
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={process.env.PUBLIC_URL + '/images/new.jpeg'} alt="todologo" />
                        <figcaption>Add Your List Here and don't lose it even after refreshing ✌ </figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder="✍ Add Item"
                            className="form-control"
                            onChange={(event) => { setInputData(event.target.value) }}
                            value={inputData}
                        />
                        {togggleButt?<i className="far fa-edit add-btn" onClick={addItem}></i > 
                        :<i className="fa fa-plus add-btn" onClick={addItem}></i>
                    }

                    </div>
                    {/* show our items  */}
                    <div className="showItems">
                        {
                            todoItems.map((Curr, index) => {
                                return (
                                    <div className="eachItem" key={index} >
                                        <h3>{Curr.data}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={()=>editItem(Curr)}></i>
                                            {/* Delete */}
                                            <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(Curr.id)}></i>
                                        </div>
                                    </div>
                                );
                            }
                            )}
                    </div>

                    {/* rmeove all button  */}
                    <div className="showItems">
                        <button
                            className="btn effect04"
                            data-sm-link-text="Remove All"
                            onClick={()=>deleteItem("all")}
                        >
                            <span> CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todolist;