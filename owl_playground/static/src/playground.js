/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { TodoList } from "./todolist/todolist";
import { Card } from "./card/card";

export class Playground extends Component {
    static template = "owl_playground.playground";
    static components = { Counter, TodoList, Card };

    setup() {
        this.state = useState({
            todos: [],
            counter: 0,
        });
    }

    addTodo(description) {
        this.state.counter++;
        this.state.todos.push({
            id: this.state.counter,
            description,
            done: false,
        });
    }

    toggleTodo(todoId) {
        this.state.todos = this.state.todos.map(todo => todo.id === todoId ? { ...todo, done: !todo.done } : todo);
    }

    removeTodo(todoId) {
        const index = this.state.todos.findIndex((elem) => elem.id === todoId);
        if (index >= 0) {
            this.state.todos.splice(index, 1);
        }
    }
}
