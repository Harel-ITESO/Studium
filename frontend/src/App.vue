<script setup lang="ts">
import { Button } from './components';
import { storeToRefs } from 'pinia';
import { useCounterStore } from './stores/counter';

const store = useCounterStore();
const { increment, decrement } = store;
const { count } = storeToRefs(store);
</script>
<template>
    <h1 class="text-8xl text-yellow-500">Studium Frontend</h1>
    <div class="flex items-center gap-10">
        <Button app-role="secondary" @click="decrement" icon="fa-solid fa-warning">Subtract</Button>
        <span>{{ count }}</span>
        <Button app-role="primary" @click="increment">Add</Button>
    </div>
</template>
