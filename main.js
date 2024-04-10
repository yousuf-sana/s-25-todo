import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let condition = true;
while (condition) {
    let ans = await inquirer.prompt([
        {
            name: "select",
            message: "select an operator",
            type: "list",
            choices: ["add", "update", "view", "delete", "exit"],
        }
    ]);
    if (ans.select === "add") {
        let addTodo = await inquirer.prompt({
            name: "todo",
            message: "would you like to add in list?",
            type: "input",
            validate: function (input) {
                if (input.trim() == "") {
                    return " kindly add any task.";
                }
                return true;
            }
        });
        if (addTodo.todo.trim() !== "") {
            todos.push(addTodo.todo);
            todos.forEach(todo => console.log(todo));
        }
    }
    if (ans.select === "update") {
        let updateTodo = await inquirer.prompt({
            name: "todo",
            message: "update items in the  list",
            type: "list",
            choices: todos.map(item => item)
        });
        let addTodo = await inquirer.prompt({
            name: "todo",
            message: "would you like to add in the list?",
            type: "input",
        });
        let newTodo = todos.filter(val => val !== updateTodo.todo);
        todos = [...newTodo, addTodo.todo];
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "view") {
        console.log(chalk.green.bgBlueBright("***** TO DO LIST *****"));
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "delete") {
        let deleteTodo = await inquirer.prompt({
            name: "todo",
            message: "select item to delete",
            type: "list",
            choices: todos.map(item => item)
        });
        let newTodo = todos.filter(val => val !== deleteTodo.todo);
        todos = [...newTodo];
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "exit") {
        console.log(" Bye Bye...");
        condition = false;
    }
}
