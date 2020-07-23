import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import * as React from 'react';

type RadioOptionProps = {
    value: string,
    children: React.ReactElement | string
};

export function RadioOption(props: RadioOptionProps) {
    return <></>;
}

type RadioProps = {
    name: string,
    caption: string,
    children: React.ReactElement<RadioOptionProps>[],
    onValueChange: (value: string) => void,
    value?: string
};

export function Radio({ name, caption, children, onValueChange, value: defaultValue }: RadioProps) {
    const [value, setValue] = defaultValue ? React.useState<string>(defaultValue) : React.useState<string>();

    const toOptionElement = (option: React.ReactElement<RadioOptionProps>) => (
        <FormGroup check>
            <Label check>
                <Input type="radio"
                    name={name}
                    {...option.props}
                    checked={value == option.props.value}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setValue(e.target.value);
                            onValueChange(e.target.value);
                        }
                    }} />
                {' '}
                {option.props.children}
            </Label>
        </FormGroup>
    );

    return (
        <FormGroup onChange={(e) => onValueChange((e.target as any).value)}>
            {caption && <Label>{caption}</Label>}
            {children.map(toOptionElement)}
        </FormGroup>
    );
}
