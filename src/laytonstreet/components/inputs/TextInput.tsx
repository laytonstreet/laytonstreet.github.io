import * as React from 'react';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';

type InputType = "text" | "number" | "textarea" | "password" | "email" | "file";

type TextInputProps = {
    id: string,
    type?: InputType,
    children?: string | React.Component | React.Component[],
    value?: string | number,
    placeholder?: string,
    onValueChange?: (value: string) => void
    readonly?: boolean
} & ({ onValueChange: (value: string) => void } | { readonly: true });

export default function TextInput({
    id,
    type = "text",
    children: caption,
    value: defaultValue,
    onValueChange,
    placeholder,
    readonly
}: TextInputProps) {
    const [value, setValue] = defaultValue ? React.useState<string>(defaultValue.toString()) : React.useState<string>();
    
    return (
        <FormGroup>
            {caption && <Label for={id}>{caption}</Label>}
            <Input id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                readOnly={readonly}
                onChange={onValueChange ? (e) => {
                    setValue(e.target.value);
                    onValueChange(e.target.value);
                } : undefined} />
        </FormGroup>
    );
}
