// import { getLocalItem } from '../views/ListRedux';

export const allTodos = (localStorageData) => {
    return {
        type: "ALL_TODOS",
        payload: localStorageData
    }
};

export const addList = (id, listTitle) => {
    // console.log("action hit addList ==>", id, listTitle)
    return {
        type: "ADD_LIST",
        payload: {
            id: id,
            title: listTitle,
            todos: []
        }
    }
};

export const deleteList = (id) => {
    // console.log("action hit deleteList ==>", id)
    return {
        type: "DELETE_LIST",
        id
    }
};

export const addTodo = (id, todo) => {
    // console.log("action hit addTodo ==>", id, todo)
    return {
        type: "ADD_TODO",
        payload: {
            listId: id,
            todo
        }
    }
};

export const updateTodo = (listid, todoindex) => {
    return {
        type: "UPDATE_TODO",
        payload: {
            listid,
            todoindex
        }
    }
};

// export const deleteTodo = () => {
//     return {
//         type: "DELETE_TODO"
//     }
// };

// export const removeAllTodos = () => {
//     return {
//         type: "REMOVE_ALL_TODOS"
//     }
// };