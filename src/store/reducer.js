const InitialState = {
    list: [],
};

// {
//     id: 0,
//     title: 'Hello World',
//     todos: [
//         {
//             todo: 'Todo 1',
//             completed: false
//         },
//         {
//             todo: 'Todo 2',
//             completed: false
//         }
//     ]
// },


const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'ALL_TODOS':
            const list = action.payload;
            return {
                list: list
            }
        case 'ADD_LIST':
            const { id, title, todos } = action.payload;
            // console.log(action.payload);
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: id,
                        title: title,
                        todos: todos
                    }
                ]
            }
        case 'DELETE_LIST':
            const newList = state.list.filter(item => item.id !== action.id);
            return {
                ...state,
                list: newList
            }
        case 'ADD_TODO':
            const { listId, todo } = action.payload;

            return {
                ...state,
                list: state.list.map(
                    item => item.id === listId ? { ...item, todos: [...item.todos, { todo: todo, completed: false }] }
                        : item
                )
            }
        case 'CLEAR_TODO':
            return ({
                list: []
            })
        default:
            return state;
    }
}

export default reducer;
