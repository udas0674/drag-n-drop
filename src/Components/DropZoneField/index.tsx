import * as React from 'react';
import glamorous from 'glamorous';
import { DropTarget, DropTargetMonitor, ConnectDropTarget, DropTargetConnector } from 'react-dnd';
import { IField, IDropZone } from '../PlayGround/index';
import IFieldTypes from '../../FieldTypes';

export interface IDropZoneFieldProps {
	canDrop?: boolean;
	connectDropTarget?: ConnectDropTarget;
	id: number;
    name: string;
    description: string;
    fields: Array<IField>;
    accepts: Array<IFieldTypes>;
    fieldMovementHandler: Function;
    field: IField | null;
};

const canZoneAcceptField = (zone: IDropZoneFieldProps, field: IField) => !!(zone.accepts.filter((_field: IFieldTypes) => _field === field.type)).length;

const dropZoneFieldTarget = {
    canDrop(props: IDropZoneFieldProps, monitor: DropTargetMonitor) {
      const item: any = monitor.getItem();
      return canZoneAcceptField(props, item);
    },
  
    drop(props: IDropZoneFieldProps, monitor: DropTargetMonitor, DropZoneField: React.Component<IDropZoneFieldProps>) {
        if (monitor.didDrop()) {
            return;
        }
        const item: any = monitor.getItem();

        props.fieldMovementHandler(item, props);
      
        return { moved: true };
    }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
	return {
        connectDropTarget: connect.dropTarget(),
        // You can ask the monitor about the current drag state:
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
	};
};

class DropZoneField extends React.Component<IDropZoneFieldProps> {
	constructor(props: IDropZoneFieldProps) {
		super(props);
	}

	render() {
		return this.props.connectDropTarget(
            <span>
                <glamorous.Div>
                    { this.props.field ? this.props.field.name : 'drop'}
                </glamorous.Div>
            </span>
        );
	}
};

export default DropTarget((props: IDropZoneFieldProps) => props.accepts, dropZoneFieldTarget, collect)(DropZoneField);