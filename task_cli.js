// Get positional arguments from the command line
import { readFileData, writeToFile } from "./helper.js";

const args = process.argv.slice(2);

if (args.length > 3) {
  console.log(
    "Usage: node task_cli.js <add, list, update, mark, delete> <id/data> <data>"
  );
  process.exit(1);
}

const command = args[0];

switch (command) {
  case "add":
    if (args.length > 2 || !args[1]) {
      console.log(
        "Invalid inputs for add.\n Usage: node task_cli.js add <description>"
      );
      process.exit(1);
    }

    let taskId;
    let tasks = await readFileData("tasks.json");
    if (tasks === "" || tasks === "[]") {
      tasks = [];
      taskId = 1;
    } else {
      tasks = JSON.parse(tasks);
      const currentLastId = tasks[tasks.length - 1].id;
      taskId = currentLastId + 1;
    }

    let task = {
      id: taskId,
      description: args[1],
      status: "todo",
      createdAt: new Date(Date.now()),
      updateAt: new Date(Date.now()),
    };

    tasks.push(task);

    await writeToFile("tasks.json", JSON.stringify(tasks));
    console.log("Task added successfully");
    console.log("Task: ", task);
    break;

  case "list":
    if (args.length > 2) {
      console.log(
        "Invalid inputs for list.\n Usage: node task_cli.js list <done, todo, in-progress>"
      );
      process.exit(1);
    }

    let allTasks = await readFileData("tasks.json");
    if (allTasks === "" || allTasks === "[]") {
      console.log("Task list is empty");
      process.exit(2);
    }
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

  case "update":
    if (!parseInt(args[1]) || !args[2]) {
      console.log(
        "Invalid inputs for update.\n Usage: node task_cli.js update <id> <description>"
      );
      process.exit(1);
    }

    let currentTasks = await readFileData("tasks.json");
    if (currentTasks === "" || currentTasks === "[]") {
      console.log("Task list is empty");
      process.exit(2);
    }
    currentTasks = JSON.parse(currentTasks);

    const dataIndex = currentTasks.findIndex(
      (task) => task.id === parseInt(args[1])
    );

    if (dataIndex === -1) {
      console.log(`Task with id:${args[1]} deos not exists`);
      process.exit(3);
    }

    currentTasks[dataIndex] = {
      ...currentTasks[dataIndex],
      description: args[2],
      updateAt: new Date(Date.now()),
    };

    await writeToFile("tasks.json", JSON.stringify(currentTasks));
    console.log(`Task ${args[1]} updated successfully`);
    console.log("Tasks\n", currentTasks[dataIndex]);
    break;

  case "mark":
    if (!parseInt(args[1])) {
      console.log(
        "Invalid inputs for mark.\n Usage: node task_cli.js mark <id> <done, in-progress>"
      );
      process.exit(1);
    }

    if (args[2] === "done" || args[2] == "in-progress") {
      let currentTask = await readFileData("tasks.json");
      if (currentTask === "" || currentTask === "[]") {
        console.log("Task list is empty");
        process.exit(2);
      }
      currentTask = JSON.parse(currentTask);

      const dataIndex = currentTask.findIndex(
        (task) => task.id === parseInt(args[1])
      );

      if (dataIndex === -1) {
        console.log(`Task with id:${args[1]} deos not exists`);
        process.exit(3);
      }

      currentTask[dataIndex] = {
        ...currentTask[dataIndex],
        status: args[2],
        updateAt: new Date(Date.now()),
      };

      await writeToFile("tasks.json", JSON.stringify(currentTask));
      console.log(`Task ${args[1]} updated successfully`);
      console.log("Task\n", currentTask[dataIndex]);
    } else {
      console.log(
        "Invalid inputs for mark.\n Usage: node task_cli.js mark <id> <done, in-progress>"
      );
    }

    break;

  case "delete":
    if (args.length > 2 || !parseInt(args[1])) {
      console.log(
        "Invalid inputs for delete.\n Usage: node task_cli.js delete <id>"
      );
      process.exit(1);
    }

    let currentTaskData = await readFileData("tasks.json");
    if (currentTaskData === "" || currentTaskData === "[]") {
      console.log("Task list is empty");
      process.exit(2);
    }
    currentTaskData = JSON.parse(currentTaskData);

    const deleteDataAtIndex = currentTaskData.findIndex(
      (task) => task.id === parseInt(args[1])
    );

    if (deleteDataAtIndex === -1) {
      console.log(`Task with id:${args[1]} does not exist`);
      process.exit(3);
    }

    currentTaskData.splice(deleteDataAtIndex, 1);

    await writeToFile("tasks.json", JSON.stringify(currentTaskData));
    console.log(`Task with id:${args[1]} deleted successfully`);

    break;

  default:
    console.log("Invalid command type <add, list, update, mark, delete>");
    break;
}
