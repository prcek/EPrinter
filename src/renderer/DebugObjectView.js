import React from 'react';
import PropTypes from 'prop-types';
import {Inspector} from 'react-inspector';
import Lodash from 'lodash';


class DebugObjectView extends React.PureComponent {

  constructor(props) {
    super(props);
  }


  render() {
    const { object,name } = this.props;
    return ( 
      <React.Fragment>
        <span>
        {name}
        {object && (<Inspector data={ Lodash.clone(object) } />)}
        </span>
      </React.Fragment>
    );
  
  }
}

DebugObjectView.propTypes = {
  object: PropTypes.object,
  name: PropTypes.string
};
DebugObjectView.defaultProps = {
  
};

export default DebugObjectView;