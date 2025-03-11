import React, { useState, useEffect } from "react";
import { getTasks, completeTask, createTask, createUser, createdUsers, eliminateUser } from "../Services/API";

export default function Home() {
    // State for inputs
    const [users, setUsers] = useState([]); // List of users
    const [textInput, setInputText] = useState({ text: "" }); // For creating a user
    const [taskInput, setTaskInput] = useState({ text: "" }); // For fetching tasks
    const [userInput, setUserInput] = useState({ text: "" }); // For specifying the user who needs a new task
    const [createInput, setCreateInput] = useState({ text: "" }); // Name of the new task
    const [completeUserTask, setCompleteUserTask] = useState({ text: "" }); // For specifying the user who needs to complete a task
    const [completeInput, setCompleteInput] = useState({ text: "" }); // Name of the task to complete
    const [eliminateUserState, setEliminateUserState] = useState("");

    // Fetch users automatically when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await createdUsers(0, 100);
    
            if (usersData) {
                console.log("Users fetched:", usersData); // Inspect the data
                setUsers(usersData); // Update the state
            } else {
                console.error("Error fetching users");
            }
        };
        fetchUsers();
    }, []);

    // Function to create a user
    const handleClick = async () => {
        try {
            await createUser(textInput.text);
            setInputText({ text: "" }); // Clear the input after creating the user

            // Refresh the list of users after creating a new one
            const updatedUsers = await createdUsers(0, 100);
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    // Function to eliminate a user
    const handleEliminateUser = async () => {
        try {
            const success = await eliminateUser(eliminateUserState);
            if (success) {
                // Refresh the list of users after eliminating one
                const updatedUsers = await createdUsers(0, 100);
                setUsers(updatedUsers);
                setEliminateUserState(""); // Clear the selected user
            }
        } catch (error) {
            console.error("Error eliminating user:", error);
        }
    };

    return (
        <div className="text-center">
            {/* Input and button to create a user */}
            <div>
                <label>
                    <input
                        value={textInput.text}
                        placeholder="ENTER USERNAME"
                        onChange={(event) => {
                            setInputText({
                                ...textInput,
                                text: event.target.value,
                            });
                        }}
                    />
                </label>

                {/* Create User Button */}
                <button onClick={handleClick} className="btn btn-primary m-2">
                    Create user
                </button>
            </div>

            {/* Dropdown to select a user */}
            <div>
                <label>
                    <select
                        value={eliminateUserState}
                        onChange={(event) => setEliminateUserState(event.target.value)}
                    >
                        <option value="">Select a user to eliminate</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Eliminate User Button */}
                <button onClick={handleEliminateUser} className="btn btn-danger m-2">
                    Eliminate user  
                </button>
            </div>

            {/* Input and button to fetch tasks */}
            <div>
                <label>
                    <select
                        value={taskInput.text}
                        onChange={(event) => {
                            setTaskInput({
                                ...taskInput,
                                text: event.target.value,
                            });
                        }}
                    >
                        <option value="">SELECT USER</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Obtain tasks button */}
                <button
                    onClick={() => getTasks(taskInput.text)}
                    className="btn btn-info m-2"
                >
                    Obtain tasks
                </button>
            </div>

            {/* Input and button to create a task */}
            <div>
                <label>
                    <select
                        value={userInput.text}
                        onChange={(event) => {
                            setUserInput({
                                ...userInput,
                                text: event.target.value,
                            });
                        }}
                    >
                        <option value="">SELECT USER</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <input
                        value={createInput.text}
                        className="m-2"
                        placeholder="ENTER TASK NAME"
                        onChange={(event) => {
                            setCreateInput({
                                ...createInput,
                                text: event.target.value,
                            });
                        }}
                    />
                </label>

                <button
                    onClick={() => createTask(userInput.text, createInput.text)}
                    className="btn btn-dark m-2"
                >
                    Create task
                </button>
            </div>

            {/* Input and button to complete a task */}
            <div>
                <label>
                    <select
                        value={completeUserTask.text}
                        onChange={(event) => {
                            setCompleteUserTask({
                                ...completeUserTask,
                                text: event.target.value,
                            });
                        }}
                    >
                        <option value="" className="m-2">SELECT USER</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <input
                        value={completeInput.text}
                        className="m-2"
                        placeholder="ID TO COMPLETE"
                        onChange={(event) => {
                            setCompleteInput({ ...completeInput, text: event.target.value });
                        }}
                    />
                </label>

                <button
                    onClick={async () => {
                        if (!completeUserTask.text || !completeInput.text) {
                            console.error("Please select a user and enter the task ID");
                            return;
                        }
                        const tasks = await getTasks(completeUserTask.text);
                        if (!tasks || tasks.length === 0) {
                            console.error("No tasks found for this user");
                            return;
                        }
                        const task = tasks.find((t) => t.id === parseInt(completeInput.text));
                        if (!task) {
                            console.error("Task not found with the provided ID");
                            alert("Task not found with the provided ID"); // Show an alert to the user
                            return;
                        }
                        await completeTask(completeUserTask.text, task.id);
                    }}
                    className="btn btn-success m-2"
                >
                    Complete task
                </button>
            </div>
        </div>
    );
}
