<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <Card class="w-full max-w-md p-6">
            <template #title>
                <h2 class="text-2xl font-bold mb-4">Permintaan Tetap Semula Kata Laluan</h2>
            </template>
            <template #content>
                <form @submit.prevent="onSubmit">
                    <div class="p-field mb-4">
                        <label for="email" class="block mb-2">Emel</label>
                        <InputText id="email" type="email" v-bind="emailProps" v-model="email" class="w-full"
                            :class="{ 'p-invalid': resetPasswordForm.errors.email }" />
                        <small class="p-error">{{ resetPasswordForm.errors.email }}</small>
                    </div>
                    <Button label="Submit" class="w-full mb-4" type="submit" />
                </form>
                <div class="flex justify-center mb-4">
                    Ingin log masuk? Log masuk di <router-link to="/login" class="text-blue-500 hover:underline">
                        sini</router-link>
                </div>
            </template>
        </Card>
        <Toast ref="toast" />
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useForm } from 'vee-validate';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import '@/plugins/validationRules';
import { useToast } from 'primevue/usetoast';
import { useAxiosStore } from '@/stores/axios';

const toast = useToast();
const axiosStore = useAxiosStore();

const emailRules = 'required|email';

const resetPasswordForm = reactive(useForm({
    validationSchema: {
        email: emailRules,
    },
}));

const [email, emailProps] = resetPasswordForm.defineField('email');

async function onSubmit() {
    const validation = await resetPasswordForm.validate();
    if (validation.valid) {
        const loader = axiosStore.loading.show();
        try {
            const response = await axiosStore.get('auth/reset-password-request', { params: resetPasswordForm.values });
            if (response.status === 200) {
                toast.add({
                    severity: 'success', summary: 'Berjaya', detail: `Permohonan anda berjaya, sila periksa emel anda untuk pautan penetapan semula
             kata laluan.`, life: 3000
                });
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            loader.hide();
        }
    }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>