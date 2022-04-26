import React, { useState } from 'react';

import { todolistAPI } from '../../api/todolistApi';
import { ReturnComponentType } from '../../types/ReturnComponentType';

export default {
  title: 'API/Tasks',
};

export const GetTasks = (): ReturnComponentType => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');

  const getTasks = (): void => {
    todolistAPI.getTasks(todolistId).then(res => {
      setState(res.data);
    });
  };

  return (
    <div>
      <div>
        {JSON.stringify(state)}
        <div>
          <input
            type="text"
            placeholder="todolistId"
            value={todolistId}
            onChange={e => setTodolistId(e.currentTarget.value)}
          />

          <button onClick={getTasks}>get tasks</button>
        </div>
      </div>
    </div>
  );
};

export const DeleteTask = (): ReturnComponentType => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>('');
  const [todolistId, setTodolistId] = useState<string>('');

  const deleteTask = () => {
    todolistAPI.deleteTask(todolistId, taskId).then(res => {
      setState(res.data);
    });
  };

  return (
    <div>
      <div>
        {JSON.stringify(state)}
        <div>
          <input
            type="text"
            placeholder="todolistId"
            value={todolistId}
            onChange={e => setTodolistId(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="taskId"
            value={taskId}
            onChange={e => setTaskId(e.currentTarget.value)}
          />
          <button onClick={deleteTask}>delete task</button>
        </div>
      </div>
    </div>
  );
};

export const CreateTask = (): ReturnComponentType => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [todolistId, setTodolistId] = useState<string>('');

  const createTaskTitle = (): void => {
    todolistAPI.createTask(todolistId, taskTitle).then(res => {
      setState(res.data);
    });
  };

  return (
    <div>
      <div>
        {JSON.stringify(state)}
        <div>
          <input
            type="text"
            placeholder="todolistId"
            value={todolistId}
            onChange={e => setTodolistId(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="task Title"
            value={taskTitle}
            onChange={e => setTaskTitle(e.currentTarget.value)}
          />
          <button onClick={createTaskTitle}>create task</button>
        </div>
      </div>
    </div>
  );
};

export const UpdateTask = (): ReturnComponentType => {
  const [state, setState] = useState<any>(null);
  const [title, setTaskTitle] = useState<string>('');
  const [description, setTaskDescription] = useState<string>('');
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  const [todolistId, setTodolistId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');

  const updateTask = (): void => {
    const model = {
      title,
      description,
      status,
      priority,
      startDate,
      deadline,
    };
    todolistAPI.updateTask(todolistId, taskId, model).then(res => {
      setState(res.data);
    });
  };

  return (
    <div>
      <div>
        {JSON.stringify(state)}
        <div>
          <input
            placeholder="taskId"
            value={taskId}
            onChange={e => setTaskId(e.currentTarget.value)}
          />
          <input
            placeholder="todolistId"
            value={todolistId}
            onChange={e => setTodolistId(e.currentTarget.value)}
          />
          <input
            placeholder="task Title"
            value={title}
            onChange={e => setTaskTitle(e.currentTarget.value)}
          />
          <input
            placeholder="Task Description"
            value={description}
            onChange={e => setTaskDescription(e.currentTarget.value)}
          />
          <input
            type="number"
            placeholder="status"
            value={status}
            onChange={e => setStatus(+e.currentTarget.value)}
          />
          <input
            type="number"
            placeholder="priority"
            value={priority}
            onChange={e => setPriority(+e.currentTarget.value)}
          />
          <input
            placeholder="startDate"
            value={startDate}
            onChange={e => setStartDate(e.currentTarget.value)}
          />
          <input
            placeholder="deadline"
            value={deadline}
            onChange={e => setDeadline(e.currentTarget.value)}
          />
          <button onClick={updateTask}>update task</button>
        </div>
      </div>
    </div>
  );
};
