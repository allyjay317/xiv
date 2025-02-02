import styled from '@emotion/styled'
import { Color } from '../../utils/colorSchemes'
import { getSize } from './utils'



export function TextInput({onChange, value, size = "S", ...inputProps}: {
    onChange: (s: string) => void, 
    value: string,
    size?: 'S' | 'M' | 'L',
} & Partial<Omit<React.ComponentProps<"input">, "onChange" | "value" | "style" | "css" | "size">>){

    const Input = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 4px;
    margin: 0px 0px;
    border-radius: 8px;
    font-family: FFXIV;
    width: 100%;
    overflow: auto;
    filter: drop-shadow(2px 2px ${Color.fg1});
    min-width: 200px;
    font-size: ${getSize(size)}px;
    height: ${getSize(size)/10}rem;
    background: ${Color.bg1};
    border: 2px solid ${Color.fg1};
    color: ${Color.fg1};
`

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return <Input type='text' onChange={onInputChange} value={value} {...inputProps} />
}