import { useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom';

import { allTodos, addList, deleteList } from '../store/action';
import { useDispatch, useSelector } from 'react-redux';


export const Form = ({ txtText, txtValue, txtOnChange, btnOnClick_Save, btnText_Save, btnOnClick_Clear, btnText_Clear }) => {
    return (
        <>
            <div className="row">
                <div className="input-group mb-3">
                    <input type="text" className="form-control form-control-lg" placeholder={txtText} value={txtValue} onChange={txtOnChange} />
                </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-center">
                <button type="submit" className="btn btn-outline-success btn-lg rounded" onClick={btnOnClick_Save}>{btnText_Save}</button>

                {!btnText_Clear ? "" :
                    <button type="submit" className="btn btn-outline-warning btn-lg rounded" onClick={btnOnClick_Clear}>{btnText_Clear}</button>
                }
            </div>
        </>
    )
}

export const getLocalItem = () => {
    const list = localStorage.getItem('list');

    if (list) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
}

const List = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allTodos(getLocalItem()));
    }, []);

    const state = useSelector(state => state.list);
    // console.log("state ==>", state);

    // const [list, setList] = useState(getLocalItem());
    const [inputTitle, setInputTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(state));
    }, [state]);

    const inputList = () => {
        let id = new Date().getTime().toString();

        if (inputTitle !== "") {
            dispatch(addList(id, inputTitle)) && setInputTitle('');
            // alert('Item added');
        } else alert("Enter Value");
    }

    const clearAll = () => {
        dispatch({ type: "CLEAR_TODO" })
    }

    return (
        <>
            <section className="App-header">
                <div className="container border my-4">
                    <div className="col-6 mx-auto mt-3">
                        <Form
                            txtText="Enter List Title..."
                            txtValue={inputTitle}
                            txtOnChange={(e) => setInputTitle(e.target.value)}
                            btnText_Save="Add List"
                            btnOnClick_Save={inputList}
                            btnText_Clear="Clear All"
                            btnOnClick_Clear={clearAll}
                        />
                    </div>

                    <div className="col-10 mx-auto mt-5">
                        <table className="table table-bordered table-hover table-striped" id="todo-list">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center" scope="col">#</th>
                                    <th className="w-75" scope="col">List</th>
                                    <th className="text-center" scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-light">
                                {
                                    state?.map((item, i) => (
                                        <tr key={item.id}>
                                            <th className="text-center" scope="row">{++i}</th>
                                            <td>{item.title}</td>
                                            <td className="text-center">
                                                <NavLink className="btn btn-success btn-sm" to={item.id}>Open</NavLink> |
                                                <button className="btn btn-danger btn-sm mx-1" onClick={() => dispatch(deleteList(item.id))}>Delete</button>
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
                    <Outlet />
                </div>
            </section>
        </>
    )
}

export default List
