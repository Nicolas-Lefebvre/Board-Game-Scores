/* eslint-disable react/jsx-indent */
// import './404.scss';
// import { setToken, useState } from 'react';
import { Button, Result } from 'antd';

// == Composant
function Page404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}

// == Export
export default Page404;
