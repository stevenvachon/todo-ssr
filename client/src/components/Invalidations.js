import PropTypes from 'prop-types';
import React from 'react';

const Invalidations = props => {
  const item = ({message, property}) => {
    return <p key={property}><strong>{message}</strong></p>;
  };

  const items = () => {
    if (props.items.length > 0) {
      return <aside className="danger">{props.items.map(item)}</aside>;
    }
  };

  return items() || null;
};

Invalidations.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    property: PropTypes.string
  })).isRequired
};

export default Invalidations;
