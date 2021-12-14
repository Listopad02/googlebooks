import React from "react";
import { useParams } from "react-router-dom";

const ElementWrapper = props => {

  const { Component, ...other } = props;
  const params = useParams();

  return <Component {...{ ...other, match: { params } }} />
};

export default ElementWrapper;