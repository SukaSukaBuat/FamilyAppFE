import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import ms from '@vee-validate/i18n/dist/locale/ms_MY.json'

configure({
  generateMessage: localize({
    ms
  })
})
