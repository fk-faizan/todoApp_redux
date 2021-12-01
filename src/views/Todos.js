import { useEffect, useState } from 'react'
import { Form } from './List'

import { Link, useParams } from 'react-router-dom';

import { addTodo, updateTodo } from '../store/action';
import { useDispatch, useSelector } from 'react-redux';

const Todos = () => {

    const { listid } = useParams();
    // console.log("listid -->", listid);

    const dispatch = useDispatch();

    const state = useSelector(state => state.list);

    const [target, setTarget] = useState("");

    useEffect(() => {
        let findList = state.find(item => item.id === listid);
        setTarget(findList);
    }, [listid, state])

    // Input for Todo
    const [todo, setTodo] = useState("");

    const inputTodo = () => {
        if (todo !== "") {
            dispatch(addTodo(listid, todo)) && setTodo("")
        } else alert("Input Todo Value")
    }

    return (
        <div className="my-3">
            <div className="col-6 mx-auto">
                <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                    <h1>ToDo's 🚀 - {target?.title}</h1>
                    <Link to="/" className="btn btn-info px-4 text-light rounded">Cancle</Link>
                </div>
                <Form
                    txtText="Add Todo..."
                    txtValue={todo}
                    txtOnChange={(e) => setTodo(e.target.value)}
                    btnText_Save="Add Todo"
                    btnOnClick_Save={inputTodo}
                />
            </div>

            <div className="col-6 mx-auto mt-2">
                <table className="table table-bordered table-hover table-striped" id="todo-list">
                    <thead className="table-success">
                        <tr>
                            <th className="text-center" scope="col">#</th>
                            <th className="w-75" scope="col">Todos</th>
                            <th className="text-center" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        {
                            target?.todos?.map((item, i) => (
                                <tr key={i}>
                                    <th className="text-center" scope="row">{++i}</th>
                                    <td>{item.todo}</td> {/*condition for stylind*/}
                                    {/* <td className={!item.completed ? 'hello' : 'normal'}>{item.todo}</td> */}
                                    <td className="text-center">
                                        {
                                            !item.completed ?
                                                <button className="btn btn-warning text-light btn-sm mx-1" onClick={() => alert("Not Working")}>Not Completed</button>
                                                : <button className="btn btn-success btn-sm mx-1" onClick={() => alert("Not Working")}>Completed</button>
                                        }
                                        {/* <button className="btn btn-success btn-sm mx-1"><BsCheck className="fs-6" /></button> | */}
                                        {/* <button className="btn btn-warning btn-sm text-dark mx-1"><BsPencil className="fs-6" /></button> | */}
                                        {/* <button className="btn btn-danger btn-sm mx-1"><BsFillTrashFill className="fs-6" /></button> */}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Todos
