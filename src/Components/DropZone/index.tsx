import * as React from 'react';
import glamorous from 'glamorous';
import { IField, IDropZone } from '../PlayGround/index';
import DropZoneField from '../DropZoneField/index';
import IFieldTypes from '../../FieldTypes';

interface IDropZoneProps {
	id: number;
  name: string;
  description: string;
  fields: Array<IField>;
  accepts: Array<IFieldTypes>;
  quantity: number;
  fieldMovementHandler: Function;
};

class DropZone extends React.Component<IDropZoneProps> {
	constructor(props: IDropZoneProps) {
		super(props);
	}

	render() {
    const { name } = this.props;
    const dropFields = [];
    
    for(let i = 0; i < this.props.quantity; i++) {
      dropFields.push(
        <glamorous.Li key={i} border='1px dotted orange' textAlign='center' margin='10' color='grey'>
          <DropZoneField {...this.props} field = { this.props.fields[i] || null } />
        </glamorous.Li>
      );
    }

		return (
        <glamorous.Div textAlign='center'>
          {name}
          <glamorous.Ul listStyle='none'>
            {dropFields}
          </glamorous.Ul>
        </glamorous.Div>
    );
	}
};

export { DropZone as default, IDropZoneProps };
