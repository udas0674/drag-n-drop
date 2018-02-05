import * as React from 'react';
import glamorous, { CSSProperties } from 'glamorous';
import { IField, IDropZone } from '../PlayGround/index';
import DropZone from '../DropZone/index';
import Fields from '../Fields/index';
import IFieldTypes from '../../FieldTypes';

interface IZoneProps {
    fields: Array<IField>;
    dropZones: Array<IDropZone>;
    fieldMovementHandler: Function;
};

const Container = glamorous.div({ display: 'flex' });

const Zones: React.StatelessComponent<IZoneProps> = (props: IZoneProps) => {
    return (
        <Container>
            <glamorous.Div minWidth={200} border="1px solid pink" margin={`${20}px`}>
                <Fields fields = { props.fields } />
            </glamorous.Div>
            {
                props.dropZones.map((dropZone: IDropZone) => {
                    return (
                        <glamorous.Div key={dropZone.id} minWidth={200} border="1px solid brown" margin={`${20}px`}>
                            <DropZone {...dropZone} fieldMovementHandler={props.fieldMovementHandler} />
                        </glamorous.Div>  
                    );
                })
            }
        </Container>
    );
};

export { Zones as default, IZoneProps };