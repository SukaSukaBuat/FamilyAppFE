<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <Card class="w-full max-w-md p-6">
            <template #title>
                <h2 class="text-2xl font-bold mb-4">Log Masuk</h2>
            </template>
            <template #content>
                <form @submit.prevent="onLogin">
                    <div class="p-field mb-4">
                        <label for="email" class="block mb-2">Emel</label>
                        <InputText id="email" type="email" v-model="email" v-bind="emailProps" class="w-full" />
                        <small class="p-error">{{ loginForm.errors.email }}</small>
                    </div>
                    <div class="p-field mb-4">
                        <label for="password" class="block mb-2">Kata Laluan</label>
                        <Password id="password" v-model="password" v-bind="passwordProps" class="w-full"
                            :feedback="false" />
                        <small class="p-error">{{ loginForm.errors.password }}</small>
                    </div>
                    <Button type="submit" label="Log Masuk" class="w-full mb-4" />
                    <div class="flex justify-center mb-4">
                        Lupa kata laluan? <router-link to="/reset-password-request"
                            class="text-blue-500 hover:underline">Tetap semula
                            kata laluan</router-link>
                    </div>

                    <span class="flex justify-center mb-4">
                        Tiada akaun?
                    </span>
                    <router-link to="/signup" class="w-full mb-4">
                        <Button label="Daftar" class="w-full mb-4" />
                    </router-link>
                    <span class="flex justify-center mb-4">
                        Atau
                    </span>
                    <Button label="Log masuk dengan Google" icon="pi pi-google" class="w-full p-button-danger"
                        @click="loginWithGoogle" />
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useAxiosStore } from '@/stores/axios';
import { useForm } from 'vee-validate';
import '@/plugins/validationRules';
import { useUserStore } from '@/stores/user';

const toast = useToast();
const axiosStore = useAxiosStore();
const userStore = useUserStore();

const loginForm = reactive(useForm({
    validationSchema: {
        email: 'required|email',
        password: 'required'
    }
}));

const [email, emailProps] = loginForm.defineField('email');
const [password, passwordProps] = loginForm.defineField('password');

async function onLogin() {
    const validation = await loginForm.validate();
    if (validation.valid) {
        const loader = axiosStore.loading.show();
        try {
            const response = await axiosStore.post('auth/signin', loginForm.values);
            if (response.status === 200) {
                toast.add({ severity: 'success', summary: 'Berjaya', detail: 'Log masuk berjaya', life: 3000 });
                userStore.authToken = response.data.token;
                router.push({ name: 'Home' });
            }
        }
        catch (error) {
            console.error('Error during login:', error);
        }
        finally {
            loader.hide();
        }
    }
}

const loginWithGoogle = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const scope = import.meta.env.VITE_GOOGLE_SCOPE;
    const responseType = 'code';
    const state = 'random_state_string'; // Optional, for CSRF protection

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;

    window.location.href = authUrl;
};

const route = useRoute();
const router = useRouter();
onMounted(() => {
    const code = route.query.code;

    if (code) {
        const loader = axiosStore.loading.show();
        axiosStore.put('auth/oauth/google?code=' + code)
            .then(response => {
                if (response.status === 200) {
                    toast.add({ severity: 'success', summary: 'Berjaya', detail: 'Log masuk berjaya' });
                }
                else if (response.status === 201) {
                    toast.add({ severity: 'info', summary: 'Perhatian', detail: 'Anda telah berjaya mendaftar ke dalam sistem, sila tunggu emel pengesahan dari pihak pentadbir.' });
                }
            })
            .catch(error => {
                console.error('Error during Google authentication:', error);
            })
            .finally(() => {
                loader.hide();
            });
    }
    router.replace({ query: {} })
});
</script>

<style scoped>
/* Additional styles if needed */
</style>