import * as React from 'react';
import IFieldTypes from '../../FieldTypes';
import Zones from '../Zones/index';
import glamorous from 'glamorous';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

interface IPlayGroundProps { title: string };

interface IPlayGroundState {
    dropZones: Array<IDropZone>;
    fields: Array<IField>;
};

interface IField {
    id: number;
    name: string;
    type: string;
};

interface IDropZone {
    id: number;
    name: string;
    description: string;
    fields: Array<IField>;
    accepts: Array<IFieldTypes>;
    quantity: number;
};

const Header = glamorous.h1({ fontSize: '2em', textAlign: 'center' });

class PlayGround extends React.Component<IPlayGroundProps, IPlayGroundState> {
    constructor(props: IPlayGroundProps) {
        super(props);

        this.state = {
            dropZones: [{
                id: 1,
                name: 'accept 1 & 2',
                description: 'this dropzone accepts field of type one and type two',
                fields: [],
                accepts: [IFieldTypes.one, IFieldTypes.two],
                quantity: 2
            }, {
                id: 2,
                name: 'accept 1',
                description: 'this dropzone accepts field of type one',
                fields: [],
                accepts: [IFieldTypes.one],
                quantity: 3
            }],

            fields: [{
                id: 1,
                name: 'one',
                type: IFieldTypes.one
            }, {
                id: 2,
                name: 'two',
                type: IFieldTypes.two
            }, {
                id: 3,
                name: 'two',
                type: IFieldTypes.two
            }, {
                id: 4,
                name: 'one',
                type: IFieldTypes.two
            }]
        };

        this.fieldMovementHandler = this.fieldMovementHandler.bind(this);
    }

    fieldMovementHandler(field: IField, zone: IDropZone) {
        const dropZones: Array<IDropZone> = this.state.dropZones.map((_zone: IDropZone) => {
            if (_zone.id === zone.id) zone.fields.push(field);
            return _zone;
        });

        this.setState({ ...this.state, dropZones });
    }

    render() {
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <glamorous.Div>
                    <Header> { this.props.title } </Header>
                    <Zones 
                        fields = { this.state.fields }
                        dropZones = { this.state.dropZones }
                        fieldMovementHandler = { this.fieldMovementHandler }
                    />
                </glamorous.Div>
            </DragDropContextProvider>         
        );
    }
}

export { PlayGround as default, IPlayGroundProps, IField, IDropZone };
