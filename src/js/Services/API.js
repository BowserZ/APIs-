/* Create user with POST request */
export async function createUser(userName) {
    const URL = `https://playground.4geeks.com/todo/users/${userName}/`;
    const response = await fetch(URL, { method: "POST" });
    if (!response.ok) {
        console.error("An error has occurred while trying to create user:", response.statusText);
        return false;
    }
    console.log("User created successfully");
    return true;
}

/* Eliminate user with Elimate request */
export async function eliminateUser(userName) {
    const URL = `https://playground.4geeks.com/todo/users/${userName}`;
    const response = await fetch(URL, { method: "DELETE" });
    if (!response.ok) {
        console.error("An error occurred while trying to eliminate:", response.statusText);
        return false;
    }
    console.log("User eliminated!");
    return true;
}

/* Get all created users with Get request*/
export async function createdUsers(min, max) {
    const URL = `https://playground.4geeks.com/todo/users?offset=${min}&limit=${max}`;
    const response = await fetch(URL, { method: "GET" });
    if (!response.ok) {
        console.error("Error fetching users:", response.statusText);
        return [];
    }
    const contenido = await response.json();
    console.log("Response from createdUsers:", contenido);
    return contenido.users || [];
}

/* Get all tasks for a specific user with a get request*/
export async function getTasks(userName) {
    const URL = `https://playground.4geeks.com/todo/users/${userName}`;
    const response = await fetch(URL, { method: "GET" });
    if (!response.ok) {
        console.error("Error fetching tasks:", response.statusText);
        return [];
    }
    const contenido = await response.json();
    console.log("Response from getTasks:", contenido);
    return contenido.todos || contenido;
}

/* Create a new task for a user with a post request*/
export async function createTask(userName, taskTitle) {
    const task = {
        label: taskTitle,
        is_done: false,
    };
    const URL = `https://playground.4geeks.com/todo/todos/${userName}`;
    const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        console.error("Error creating task:", response.statusText);
        return false;
    }
    console.log("Task created successfully");
    return true;
}

/* Complete a specific task for a user */
// changes is_done: false to true
export async function completeTask(userName, taskId) {
    const URL = `https://playground.4geeks.com/todo/todos/${taskId}/`; // Usar taskId directamente en la URL
    const response = await fetch(URL, {
        method: "PUT",
        body: JSON.stringify({ is_done: true }), // No es necesario pasar el userName aquí
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        console.error("Error updating task:", response.statusText);
        return false;
    }
    console.log(`Task with ID ${taskId} for user ${userName} marked as completed!`);
    return true;
}
