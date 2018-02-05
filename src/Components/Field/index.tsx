import * as React from 'react';
import glamorous from 'glamorous';
import IField from '../PlayGround/index';
import IFieldTypes from '../../FieldTypes';
import { DragSource, ConnectDragSource, DragSourceSpec, DragSourceConnector, DragSourceMonitor } from 'react-dnd';

export interface IFieldProps {
	isDragging?: boolean,
	connectDragSource?: ConnectDragSource,
	id: number,
	name: string,
	type: string
};

export const fieldSource = {
	beginDrag(props: IFieldProps) {
		const { id, name, type } = props;
		return { ...props };
	}
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
};

export interface IFieldItemProps {
	isDragging: boolean;
};

const FieldItem = glamorous.span<IFieldItemProps>({opacity: 1}, (props: IFieldItemProps) => ({
		opacity: props.isDragging ? 0.2 : 1
	})
);

class Field extends React.Component<IFieldProps> {
	constructor(props: IFieldProps) {
		super(props);
	}

	render() {
		const { isDragging, connectDragSource, id, name, type } = this.props;
		return this.props.connectDragSource(
			<div>
				<FieldItem isDragging={isDragging}>
					{ name }
				</FieldItem>
			</div>
		);
	}
};

// Export the wrapped component:
export default DragSource((props: IFieldProps) => props.type, fieldSource, collect)(Field);