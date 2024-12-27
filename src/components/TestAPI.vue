<template>
  <div>
    <div class="p-4 font-bold text-2xl text-white">Test API</div>
    <hr>
    <div
      id="results"
      class="p-4 bg-gray-100 text-black font-mono text-wrap"
    >
      Page loading
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '@/Interfaces';
import * as API from '@/api';
import { onMounted } from 'vue';

var resultsEl: HTMLElement;

onMounted(async () => {
  if (document.getElementById('results')) {
    resultsEl = document.getElementById('results') as HTMLElement;
  }
  else {
    console.log('results element not found');
  }
  append('Loaded');
  runTests();
});

function append(data: any = "--------------------") {
  resultsEl.innerText += "\n" + data;
}

async function runTests() {
  const testData: Todo = {
    name: "Test Todo",
    done: "false",
    status: "Todo",
    urgency: "Medium",
    impact: "Medium",
    effort: "Medium",
    notes: "",
  }
  append('Running tests');
  append();

  try {
    // Insert a new todo
    append('Inserting todo')
    append(JSON.stringify(testData));
    const insertedId: string = await API.createTodo(testData);
    append('Inserted ID: ' + insertedId);
    append();

    // Get the todo collection
    append('Getting todo collection');
    const todoCollection: Todo[] = await API.getTodoList();
    append('Todo collection: ' + JSON.stringify(todoCollection));

    // Check that the inserted Todo is present in the collection
    let todoWithIdPresent: boolean = false;
    todoCollection.forEach((todo: Todo) => {
      if (todo._id?.$oid === insertedId) {
        todoWithIdPresent = true;
        const insertedData: Todo = todo;
        delete insertedData._id;
        if (JSON.stringify(insertedData) != JSON.stringify(testData)) {
          append('Inserted data: ' + JSON.stringify(testData));
          throw new Error('Inserted data does not match retrieved data');
        }
      }
    });
    if (!todoWithIdPresent) {
      throw new Error('Inserted ID not found in collection');
    }

    // Update the inserted todo
    append();
    append('Updating todo');
    const updatedData: Todo = {
      _id: { $oid: insertedId },
      name: "Updated Todo",
      done: "true",
      status: "Todo",
      urgency: "Medium",
      impact: "Medium",
      effort: "Medium",
      notes: "",
    }
    append(JSON.stringify(updatedData));
    await API.updateTodo(updatedData);

    // Get the updated todo
    append();
    append('Getting updated todo');
    const updatedTodo: Todo = await API.getTodo(insertedId);
    append('Updated data (client): ' + JSON.stringify(updatedData));
    append('Updated todo (server): ' + JSON.stringify(updatedTodo));
    if (JSON.stringify(updatedTodo) != JSON.stringify(updatedData)) {
      throw new Error('Updated data does not match retrieved data');
    }

    // Delete the inserted todo
    append();
    append('Deleting todo');
    await API.deleteTodo(insertedId);
    try {
      await API.getTodo(insertedId);
      throw new Error('Todo not deleted');
    } catch (error) {
      append('Todo deleted');
    }

  } catch (error) {
    append(error);
    throw error;
  }
}

</script>