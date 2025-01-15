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
  const query = { "data.done": done.toString() };
  const queryString = encodeURIComponent(JSON.stringify(query));
  const config = {
    params: {
      query: queryString,
      page: page,
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance.get('/todo', config)
      .then(res => {
        if (typeof res.data !== 'object') {
          reject('Invalid response from server');
        }
        else {
          resolve(res.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * Get a single Todo object from the server
 * @param id id of the Todo to query
 * @returns Todo object, or 404 error if not found
 */
export async function getTodo(id: string): Promise<Todo> {
  return new Promise((resolve, reject) => {
    axiosInstance.get('/todo/' + id)
      .then(res => {
        if (typeof res.data !== 'object') {
          reject('Invalid response from server');
        }
        else {
          resolve(res.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * Create a new Todo object on the server
 * @param todo new Todo object to create
 * @returns the id of the created Todo object, or an error message if the
 * creation failed or the object already existed
 */
export async function createTodo(todo: Todo): Promise<string> {
  return new Promise((resolve, reject) => {
    axiosInstance.put('/todo', todo)
      .then(res => {
        const data: PutResponse = res.data;
        if (!data.success) {
          reject(data.message);
        }
        else if (data.updatedExisting) {
          reject('Server error: updatedExisting is true');
        }
        else if (typeof data.id !== 'string') {
          reject('Server error: id is not a string or not present');
        }
        else {
          resolve(data.id);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * Update an existing Todo object on the server. If the object doesn't already
 * exist, throws an error and deletes the newly created object.
 * @param todo existing Todo object to update
 * @returns id of the updated Todo object, or an error message if the update
 * failed or the object didn't already exist
 */
export async function updateTodo(todo: Todo): Promise<string> {
  return new Promise((resolve, reject) => {
    axiosInstance.put('/todo', todo)
      .then(res => {
        const data: PutResponse = res.data;
        if (!data.success) {
          reject(data.message);
        }
        else if (!data.updatedExisting) {
          deleteTodo(res.data.id);
          reject('Server error: updatedExisting is false');
        }
        else if (typeof data.id !== 'string') {
          reject('Server error: id is not a string or not present');
        }
        else {
          resolve(data.id);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * Delete a Todo object from the server
 * @param id id of the Todo object to delete
 * @returns success boolean
 */
export async function deleteTodo(data: string | Todo): Promise<boolean> {
  let id: string;
  if (typeof data === 'string') {
    id = data;
  }
  else if (typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, '_id') && data._id?.$oid) {
    id = data._id?.$oid;
  }
  else {
    return false;
  }

  return new Promise((resolve, reject) => {
    axiosInstance.delete('/todo/' + id)
      .then(res => {
        const data: DeleteResponse = res.data;
        if (!data.success) {
          reject(data.message);
        }
        else {
          resolve(data.success);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * Get a list of Column objects from the server
 * @returns Promise<Column[]> list of columns
 */
export async function getColumns(): Promise<Column[]> {
  return new Promise((resolve, reject) => {
    axiosInstance.get('/columns')
      .then(res => {
        if (typeof res.data !== 'object') {
          reject('Invalid response from server');
        }
        else {
          resolve(res.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}