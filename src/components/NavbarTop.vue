<template>
  <nav 
    class="grid grid-cols-8 gap-4 p-2 bg-primary text-white" 
    role="navigation"
  >
    <div class="">
      <router-link class="" to="/">
        <img class="w-24 h-24" src="https://placebear.com/96/96">
      </router-link>
    </div>

    <div class="col-span-6 my-auto text-2xl">
      <router-link class="" to="/todo">
        Todo
      </router-link>
    </div>

    <button class="btn-warning my-auto text-xl">
      <a href="/api/resetDB" class="">
        Reset DB
      </a>
    </button>
  </nav>
</template>