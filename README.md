# Task Tracker CLI

A command-line interface (CLI) application for managing tasks. Store and manage your tasks with simple commands, including adding, listing, updating, marking status, and deleting tasks. Data is persisted in a `tasks.json` file.

## project URL: https://roadmap.sh/projects/task-tracker

## Features

- **Add tasks** with descriptions
- **List tasks** (all or filtered by status: `todo`, `done`, `in-progress`)
- **Update task descriptions**
- **Mark tasks** as `done` or `in-progress`
- **Delete tasks** by ID
- Automatic task ID assignment
- Persistent storage in JSON format

---

## Prerequisites

- Node.js (v18+ recommended)

---

## Installation

1. Clone/download the repository.
2. Ensure `task_cli.js` and `helper.js` are in the same directory.

---

## Usage

### General Syntax

```bash
node task_cli.js <command> [arguments]
```

### Commands

#### 1. Add a Task

```bash
node task_cli.js add "<description>"
```

Example:

```bash
node task_cli.js add "Complete project documentation"
```

#### 2. List Tasks

```bash
node task_cli.js list [status]
```

Valid status filters: `todo`, `done`, `in-progress`  
Examples:

```bash
node task_cli.js list             # Lists all tasks
node task_cli.js list done        # Lists done tasks
```

#### 3. Update a Task Description

```bash
node task_cli.js update <id> "<new_description>"
```

Example:

```bash
node task_cli.js update 3 "Revised project deadline"
```

#### 4. Mark Task Status

```bash
node task_cli.js mark <id> <done|in-progress>
```

Example:

```bash
node task_cli.js mark 2 done
```

#### 5. Delete a Task

```bash
node task_cli.js delete <id>
```

Example:

```bash
node task_cli.js delete 5
```

---

## Task Structure

Tasks are stored with the following properties:

```json
{
  "id": 1,
  "description": "Buy groceries",
  "status": "todo",
  "createdAt": "2023-09-15T12:34:56.789Z",
  "updateAt": "2023-09-15T12:34:56.789Z"
}
```

---

## Exit Codes

| Code | Meaning                   |
| ---- | ------------------------- |
| `1`  | Invalid command/arguments |
| `2`  | Task list is empty        |
| `3`  | Task ID not found         |

---

## Notes

- Data is saved to `tasks.json` automatically. Avoid manual edits to prevent corruption.
- Task IDs are auto-incremented and cannot be modified.
- Timestamps (`createdAt`, `updateAt`) are managed automatically.
