/* eslint-disable react/jsx-indent */
// import './404.scss';
// import { setToken, useState } from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

// == Composant
function Page404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to="/">Back Home</Link>}
    />
  );
}

// == Export
export default Page404;
