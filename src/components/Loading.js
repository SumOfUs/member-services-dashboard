// @flow weak
import React from 'react';

type Props = {
  loading: boolean,
};
export default (props: Props) => {
  if (props.loading) return <i className="fa fa-spin" />;
  return null;
};
