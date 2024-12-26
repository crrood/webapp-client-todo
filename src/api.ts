import axios, { type AxiosInstance } from "axios";
import type { Column, DeleteResponse, PutResponse, Todo } from "./Interfaces";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST + ":" + import.meta.env.VITE_SERVER_PORT + '/api/',
});

/**
 * Get a list of Todo objects from the server
 * @param done boolean to return todos marked as done
 * @param page page number of results to return
 * @returns Promise<Todo[]> list of todos
 */
export async function getTodoList(done: boolean = false, page: number = 0): Promise<Todo[]> {
  const config = {
    params: {
      done: done,
      page: page,
    }
  };
  try {
    console.log(axiosInstance.defaults.baseURL);
    const res = await axiosInstance.get('/todo', config);
    console.log(res);
    if (typeof res.data !== 'object') {
      throw new Error('Invalid response from server');
    }

    return res.data;
  }
  catch (error) {
    throw error;
  }
}

/**
 * Get a single Todo object from the server
 * @param id id of the Todo to query
 * @returns Todo object, or 404 error if not found
 */
export async function getTodo(id: string): Promise<Todo> {
  try {
    const res = await axiosInstance.get('/todo/' + id);
    if (typeof res.data !== 'object') {
      throw new Error('Invalid response from server');
    }

    return res.data;
  }
  catch (error) {
    throw error;
  }
}

/**
 * Create a new Todo object on the server
 * @param todo new Todo object to create
 * @returns the id of the created Todo object, or an error message if the
 * creation failed or the object already existed
 */
export async function createTodo(todo: Todo): Promise<string> {
  try {
    const res = await axiosInstance.put('/todo', todo);
    const data: PutResponse = res.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    if (data.updatedExisting) {
      throw new Error('Server error: updatedExisting is true');
    }
    if (typeof data.id !== 'string') {
      throw new Error('Server error: id is not a string or not present');
    }

    return data.id;
  }
  catch (error) {
    throw error;
  }
}

/**
 * Update an existing Todo object on the server. If the object doesn't already
 * exist, throws an error and deletes the newly created object.
 * @param todo existing Todo object to update
 * @returns id of the updated Todo object, or an error message if the update
 * failed or the object didn't already exist
 */
export async function updateTodo(todo: Todo): Promise<string> {
  try {
    const res = await axiosInstance.put('/todo', todo);
    const data: PutResponse = res.data;
    if (!data.success) {
      throw new Error(data.message);
    }
    if (!data.updatedExisting) {
      deleteTodo(res.data.id);
      throw new Error('Server error: updatedExisting is false');
    }
    if (typeof data.id !== 'string') {
      throw new Error('Server error: id is not a string or not present');
    }

    return data.id;
  }
  catch (error) {
    throw error;
  }
}

/**
 * Delete a Todo object from the server
 * @param id id of the Todo object to delete
 * @returns success boolean
 */
export async function deleteTodo(id: string): Promise<boolean> {
  try {
    const res = await axiosInstance.delete('/todo/' + id);
    const data: DeleteResponse = res.data;
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.success;
  }
  catch (error) {
    throw error;
  }
}

/**
 * Get a list of Column objects from the server
 * @returns Promise<Column[]> list of columns
 */
export async function getColumns(): Promise<Column[]> {
  try {
    const res = await axiosInstance.get('/columns');
    if (typeof res.data !== 'object') {
      throw new Error('Invalid response from server');
    }

    return res.data;
  }
  catch (error) {
    throw error;
  }
}