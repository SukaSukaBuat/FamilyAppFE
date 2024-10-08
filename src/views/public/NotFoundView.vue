<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <Card class="w-full max-w-md p-6">
            <template #title>
                <h2 class="text-2xl font-bold mb-4">Laman tidak dijumpai</h2>
            </template>
            <template #content>
                <p>Laman yang anda cari tidak wujud.</p>
                <Button label="Ke Laman Utama" class="w-full mt-4" @click="goHome" />
            </template>
        </Card>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';

const router = useRouter();

const goHome = () => {
    router.push('/');
};
</script>

<style scoped>
/* Additional styles if needed */
</style>