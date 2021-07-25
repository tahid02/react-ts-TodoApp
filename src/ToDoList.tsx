import { useState } from "react";

interface ICurrentToDo {
    task:string;
    id:number
}
const ToDoList = () => {
    const [toDo,setToDo] = useState<string>("");

    const [isEdit,setIsEdit] = useState<boolean>(false);
    const [editIndex,setEditIndex] = useState<number>(2);
    const [toDoList,setToDoList] = useState<ICurrentToDo[]>([]);

    const handleChange = (e:string) => {
        setToDo(e);
    }

    const handleAddOrUpdateToDo = () => {
        if (isEdit) { 
            // when user click update button to update edited toDo
            const copiedList = [...toDoList]
            copiedList[editIndex].task = toDo;
            setToDoList(copiedList);
            setIsEdit(false)
        }
        else if (!isEdit) {
            setToDoList([...toDoList,{
                task:toDo,
                id:Math.floor(Math.random()*100) 
            }])
        }

    }

    const handleEditToDo = (work:ICurrentToDo) => { // when user click on edit button of a TODO task
        
        setToDo(work.task) // task will show in input field
        setIsEdit(true)
        const toDoIndex = toDoList.findIndex(todo => todo.id === work.id) // getting the index of the task , user want to edit
        setEditIndex(toDoIndex)
    }

    const handleDeleteToDo = (id:number) => {
       const filteredToDoList = toDoList.filter(filterToDo => filterToDo.id !== id)
        setToDoList(filteredToDoList)
    }

    return (
        <div>
            <input type="text" onChange={(e)=>handleChange(e.target.value)} value={toDo}/>
            <button onClick={handleAddOrUpdateToDo} > {isEdit ? 'Update' : 'Add'} </button>
            {
                toDoList.length && toDoList.map(work =><div>
                    <span> {work.task} </span>
                     <button onClick={()=>handleEditToDo(work)}>edit </button>
                    <button onClick={()=>handleDeleteToDo(work.id)}>delete </button>                            
                </div>)
            }
        </div>
    );
};

export default ToDoList;