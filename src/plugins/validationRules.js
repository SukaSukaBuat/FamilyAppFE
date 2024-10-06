import { defineRule, configure } from 'vee-validate'
import { setLocale, localize } from '@vee-validate/i18n'
import { required, email, min, max, regex, confirmed } from '@vee-validate/rules'

import en from '@vee-validate/i18n/dist/locale/en.json'
import ms_MY from '@vee-validate/i18n/dist/locale/ms_MY.json'

configure({
  generateMessage: localize({ en, ms_MY })
})
configure({
  generateMessage: localize({
    ms_MY: {
      names: {
        email: 'Alamat emel',
        password: 'Kata laluan',
        confirmPassword: 'Sahkan kata laluan'
      }
    }
  })
})

setLocale('ms_MY')
// Define custom rules
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('regex', regex)
defineRule('confirmed', confirmed)

// Custom password rule
defineRule('password', (value) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*])[A-Za-z\d!@#$%&*]{8,20}$/
  if (!passwordRegex.test(value)) {
    return 'Kata laluan mesti mengandungi sekurang-kurangnya satu huruf kecil, satu huruf besar, satu nombor, dan satu simbol khas (!@#$%&*).'
  }
  return true
})
