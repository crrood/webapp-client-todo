<template>
  <nav 
    class="grid grid-cols-8 gap-4 p-4 items-center align-middle bg-primary-light text-white" 
    role="navigation"
  >
    <div class="">
      <router-link class="" to="/">
        <img class="w-24 h-24" src="https://placebear.com/96/96">
      </router-link>
    </div>

    <div class="col-span-6 text-4xl">
      <router-link class="" to="/todo">
        Todo
      </router-link>
    </div>

    <button class="btn-warning text-l">
      <a href="/api/resetDB" class="">
        Reset DB
      </a>
    </button>
  </nav>
</template>