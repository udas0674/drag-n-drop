import * as React from 'react';
import glamorous, { CSSProperties } from 'glamorous';
import { IField } from '../PlayGround/index';
import IFieldTypes from '../../FieldTypes';
import Field from '../Field/index';

interface IFieldsProps {
    fields: Array<IField>;
};


const Fields: React.SFC<IFieldsProps> = (props: IFieldsProps) => {
    return (
        <glamorous.Div textAlign='center'>
            {`Fields`} 
            <glamorous.Ul listStyle='none'>
                { props.fields.map((field: IField) => <glamorous.Li key={field.id} border='1px solid black' textAlign='center' margin='10'> <Field {...field}  /> </glamorous.Li>) } 
            </glamorous.Ul>
        </glamorous.Div>
    );
};

export { Fields as default, IFieldsProps };