import { create } from 'zustand';

export const useTodoStore = create((set) => ({
    todos: [],
    createTask: (title) => set((state) => ({
        todos: [...state.todos, { id: Date.now(), title, isCompleted: false }]
    })),
    deleteTask: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
    })),
    updateTask: (id, text) => 
        set((state) => ({
            todos: state.todos.map((todo) => todo.id === id ? {...todo, title: text } : todo
        ),
        })),
    
}));