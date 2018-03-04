import c from 'classnames'
import React from 'react'

interface NameValuePair {
  name: string
  value: string
}

interface Props {
  className?: string
  name: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: NameValuePair
  ) => any
  placeholder?: string
  type: HTMLInputElement['type']
}

const TextInput: React.SFC<Props> = ({
  className,
  name,
  onChange,
  placeholder,
  type,
}) => (
  <input
    type={type}
    className={c('text-input', className)}
    placeholder={placeholder}
    name={name}
    onChange={e => {
      onChange(e, { name, value: e.target.value })
    }}
  />
)

export { TextInput }
