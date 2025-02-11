// Get positional arguments from the command line
import { readFileData, writeToFile } from "./helper.js";

const args = process.argv.slice(2);

if (args.length > 3) {
  console.log(
    "Usage: node task_cli.js <command> <id/data> <data> (last argument for update use case)"
  );
  process.exit(1);
}

console.log(args);

const command = args[0];

switch (command) {
  case "add":
    if (args.length > 2) {
      console.log(
        "Invalid inputs for add.\n Usage: node task_cli.js add <task>"
      );
      process.exit(1);
    }

    let taskId;
    let tasks = await readFileData("tasks.json");
    if (tasks === "") {
      tasks = [];
      taskId = 1;
    } else {
      tasks = JSON.parse(tasks);
      const currentLastId = tasks[tasks.length - 1].id;
      taskId = currentLastId + 1;
    }

    console.log("Assigned Task Id: ", taskId);

    let task = {
      id: taskId,
      description: args[1],
      status: "todo",
      createdAt: new Date(Date.now()),
      updateAt: new Date(Date.now()),
    };

    tasks.push(task);

    await writeToFile("tasks.json", JSON.stringify(tasks));
    console.log("Tasks: ", tasks);
    break;

  case "list":
    if (args.length > 2) {
      console.log(
        "Invalid inputs for list.\n Usage: node task_cli.js list <done, todo, in-progress>"
      );
      process.exit(1);
    }

    let allTasks = await readFileData("tasks.json");
    allTasks = JSON.parse(allTasks);

    if (!args[1]) {
      console.log("All Tasks\n", allTasks);
    } else if (args[1] === "done") {
      const allDoneTasks = allTasks.filter((task) => task.status == "done");
      console.log("All Done Tasks\n", allDoneTasks);
    } else if (args[1] === "todo") {
      const allTodoTasks = allTasks.filter((task) => task.status == "todo");
      console.log("All Todo Tasks\n", allTodoTasks);
    } else if (args[1] === "in-progress") {
      const allTasksInProgress = allTasks.filter(
        (task) => task.status == "in-progress"
      );
      console.log("All Tasks in Progress\n", allTasksInProgress);
    } else {
      console.log(
        "Invalid inputs for list.\n Usage: node task_cli.js list <done, todo, in-progress>"
      );
    }
    break;

  default:
    console.log("Invalid command type");
    break;
}
