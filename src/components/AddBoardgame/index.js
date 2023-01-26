/* eslint-disable import/no-extraneous-dependencies */
import './addBoardgame.scss';

// import axios from 'axios';
// import Link from 'antd/es/typography/Link';

import {
  Button,
  Form,
  InputNumber,
  Space,
  Input,
} from 'antd';

const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 20 },
};
// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 8,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 16,
//     },
//   },
// };

const { TextArea } = Input;

// --------------------- OPTIONS DATES -----------------
// const { RangePicker } = DatePicker;
// const rangeConfig = {
//   rules: [
//     {
//       type: 'array',
//       required: true,
//       message: 'Please select time!',
//     },
//   ],
// };
// const config = {
//   rules: [
//     {
//       type: 'object',
//       required: false,
//       message: 'Please select time!',
//     },
//   ],
// };
// -------------------------------------------------------
const onFinish = (values) => {
  console.log('Received values of form: ', values);
};

// ============================================ Composant===========================================
function AddBoardgame() {
  
  return (
    <div className="container addGame-container">
      <h2>Ajouter un jeu</h2>

      <div>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
          style={{ maxWidth: 2000 }}
        >

          {/* ------------------------------------SELECTION JEU------------------------------- */}
          <section>
            <h3>Jeu</h3>
            <Form.Item label="Nom du jeu" name="name">
              <Input name="name" />
            </Form.Item>
            <Form.Item label="Editeur" name="editor">
              <Input name="editor" />
            </Form.Item>
            <Form.Item label="Auteur" name="author">
              <Input name="author" />
            </Form.Item>
            <Form.Item label="Date de parution" name="year">
              <Input type="date" name="year" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea name="description" />
            </Form.Item>

            <Space>
              <Form.Item label="Joueurs Min" name="max_player">
                <InputNumber name="max_player" min={1} />
              </Form.Item>
              <Form.Item label="Joueurs Max" name="min_player">
                <InputNumber name="min_player" min={1} />
              </Form.Item>
            </Space>

            <Form.Item label="Lien vers image" name="picture">
              <Input name="picture" />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </section>
        </Form>
      </div>

    </div>
  );
}

// == Export
export default AddBoardgame;
