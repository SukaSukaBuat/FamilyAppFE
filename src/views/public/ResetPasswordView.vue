<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <Card class="w-full max-w-md p-6">
            <template #title>
                <h2 class="text-2xl font-bold mb-4">Reset Password</h2>
            </template>
            <template #content>
                <form @submit.prevent="onSubmit">
                    <div class="p-field mb-4">
                        <label for="password" class="block mb-2">Password</label>
                        <Password id="password" v-bind="passwordProps" v-model="password" class="w-full"
                            :class="{ 'p-invalid': resetPasswordForm.errors.password }" />
                        <small class="p-error">{{ resetPasswordForm.errors.password }}</small>
                    </div>
                    <div class="p-field mb-4">
                        <label for="confirmPassword" class="block mb-2">Confirm Password</label>
                        <Password id="confirmPassword" v-bind="confirmPasswordProps" v-model="confirmPassword"
                            class="w-full" :class="{ 'p-invalid': resetPasswordForm.errors.confirmPassword }" />
                        <small class="p-error">{{ resetPasswordForm.errors.confirmPassword }}</small>
                    </div>
                    <Button label="Reset Password" class="w-full mb-4" type="submit" />
                </form>
            </template>
        </Card>
        <Toast ref="toast" />
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useForm } from 'vee-validate';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useAxiosStore } from '@/stores/axios';
import '@/plugins/validationRules';

const toast = useToast();
const axiosStore = useAxiosStore();
const route = useRoute();
const router = useRouter();

const passwordRules = 'required|password';
const confirmPasswordRules = 'required|confirmed:@password';

const resetPasswordForm = reactive(useForm({
    validationSchema: {
        password: passwordRules,
        confirmPassword: confirmPasswordRules
    },
}));

const [password, passwordProps] = resetPasswordForm.defineField('password');
const [confirmPassword, confirmPasswordProps] = resetPasswordForm.defineField('confirmPassword');

const onSubmit = resetPasswordForm.handleSubmit(async (values) => {
    const loader = axiosStore.loading.show();
    const token = route.query.token;
    if (!token) {
        toast.add({ severity: 'error', summary: 'Ralat', detail: 'Token tidak dijumpai.', life: 3000 });
        return;
    }

    try {
        values.token = token;
        values.email = route.query.email;
        const response = await axiosStore.post('auth/reset-password', values);
        if (response.status === 200) {
            toast.add({ severity: 'success', summary: 'Berjaya', detail: 'Anda telah berjaya menetap semula kata laluan. Anda akan diarahkan ke laman log masuk.', life: 3000 });
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        }
    } catch (error) {
        console.error(error);
    }
    finally {
        loader.hide();
    }
});
</script>

<style scoped>
/* Additional styles if needed */
</style>