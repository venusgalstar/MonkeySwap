import { FormEvent, ChangeEvent } from 'react'
import { ThemeUIStyleObject } from 'theme-ui'
import { isNumber } from 'utils/numbers'
import Input from './Input'

const NumericInput = ({
  onUserInput,
  value,
  disabled,
  style,
}: {
  onUserInput?: (input: string) => void
  value: string
  disabled?: boolean
  style?: ThemeUIStyleObject
}) => {
  return (
    <Input
      sx={{
        border: 'none',
        padding: '0px 0px',
        position: 'relative',
        width: '100%',
        display: 'inline-block',
        fontSize: '22px',
        ':focus': { outline: 'none' },
        ...style,
      }}
      disabled={disabled}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onUserInput && onUserInput(e.target.value)
      }}
      placeholder="0.0"
      pattern="^[0-9]*[.,]?[0-9]*$"
      onInput={(v: FormEvent<HTMLInputElement>) => {
        if (v.currentTarget.value.includes(',')) {
          v.currentTarget.value = v.currentTarget.value.replace(/,/g, '.')
        }
        if (v.currentTarget.value.includes('%')) {
          v.currentTarget.value = v.currentTarget.value.replace(/[^0-9]/g, '')
        }
        if (v.currentTarget.value === '.') {
          v.currentTarget.value = '0.'
        }
        v.currentTarget.value =
          !!v.currentTarget.value && isNumber(v.currentTarget.value) && parseFloat(v.currentTarget.value) >= 0
            ? v.currentTarget.value
            : v.currentTarget.value.slice(0, v.currentTarget.value.length - 1)
      }}
    />
  )
}

export default NumericInput
