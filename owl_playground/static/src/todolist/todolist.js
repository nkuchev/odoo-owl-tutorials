/** @odoo-module **/


import { Component, useRef, onMounted } from "@odoo/owl";
import { Todo } from "../todo/todo";
import { useAutofocus } from "../utils";


export class TodoList extends Component {
    static template = "owl_playground.TodoList";
    static components = { Todo };
    static props = {
        todos: {
            type: Array,
            // TODO: FIXME
            // element: Todo,
        },
        addTodoCallback: Function,
        toggleTodoCallback: Function,
        removeTodoCallback: Function,
    };
    setup() {
        useAutofocus("todo_input");
        // onMounted(() => {
        //   useAutofocus("todo_input");
        // });
    };
    _onAddTodo(ev) {
        if (ev.keyCode === 13 && ev.target.value !== "") {
            this.props.addTodoCallback(ev.target.value);
            ev.target.value = "";
        }
    };
    _onToggleTodo(todoId) {
        this.props.toggleTodoCallback(todoId);
    };

    _onRemoveTodo(todoId) {
        this.props.removeTodoCallback(todoId);
    };
}
