<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <Card class="w-full max-w-md p-6">
            <template #title>
                <h2 class="text-2xl font-bold mb-4">Daftar Masuk</h2>
            </template>
            <template #content>
                <form @submit.prevent="onSubmit">
                    <div class="p-field mb-4">
                        <label for="email" class="block mb-2">Emel</label>
                        <InputText id="email" type="email" v-bind="emailProps" v-model="email" class="w-full"
                            :class="{ 'p-invalid': signUpForm.errors.email }" />
                        <small class="p-error">{{ signUpForm.errors.email }}</small>
                    </div>
                    <div class="p-field mb-4">
                        <label for="password" class="block mb-2">Kata Laluan</label>
                        <Password id="password" v-bind="passwordProps" v-model="password" class="w-full"
                            :class="{ 'p-invalid': signUpForm.errors.password }" />
                        <small class="p-error">{{ signUpForm.errors.password }}</small>
                    </div>
                    <div class="p-field mb-4">
                        <label for="confirmPassword" class="block mb-2">Sahkan Kata Laluan</label>
                        <Password id="confirmPassword" v-model="confirmPassword" v-bind="confirmPasswordProps"
                            class="w-full" :class="{ 'p-invalid': signUpForm.errors.confirmPassword }" />
                        <small class="p-error">{{ signUpForm.errors.confirmPassword }}</small>
                    </div>
                    <div class="p-field mb-4">
                        <label for="remarks" class="block mb-2">Kata Alu-Aluan</label>
                        <Textarea id="remarks" v-model="remarks" v-bind="remarksProps" class="w-full" />
                    </div>
                    <Button type="submit" label="Daftar Sekarang" class="w-full mb-4" />
                    <div class="flex justify-center mb-4">
                        Sudah mempunyai akaun?
                    </div>
                    <router-link to="/" class="text-blue-500 hover:underline">
                        <Button label="Log Masuk" class="w-full mb-4" />
                    </router-link>
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useForm } from 'vee-validate';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import '@/plugins/validationRules';
import { useToast } from 'primevue/usetoast';
import { useAxiosStore } from '@/stores/axios';

const toast = useToast();
const axiosStore = useAxiosStore();
const emailRules = 'required|email';
const passwordRules = 'required|password';
const confirmPasswordRules = 'required|confirmed:@password';

const signUpForm = reactive(useForm({
    validationSchema: {
        email: emailRules,
        password: passwordRules,
        confirmPassword: confirmPasswordRules
    },
}));

const [email, emailProps] = signUpForm.defineField('email');
const [password, passwordProps] = signUpForm.defineField('password');
const [confirmPassword, confirmPasswordProps] = signUpForm.defineField('confirmPassword');
const [remarks, remarksProps] = signUpForm.defineField('remarks');

async function onSubmit() {
    var validation = await signUpForm.validate();
    if (validation.valid) {
        const loader = axiosStore.loading.show();
        try {
            var response = await axiosStore.post('auth/signup', signUpForm.values);
            if (response.status === 200) {
                toast.add({ severity: 'success', summary: 'Berjaya', detail: 'Pendaftaran berjaya. Anda akan menerima emel untuk mengesahkan emel anda.' });
            }
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