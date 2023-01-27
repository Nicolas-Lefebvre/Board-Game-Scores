/* eslint-disable import/no-extraneous-dependencies */
import './addBoardgame.scss';

import axios from 'axios';
// import Link from 'antd/es/typography/Link';

import {
  Button,
  Form,
  InputNumber,
  Space,
  Input,
  // DatePicker,
  Radio,
} from 'antd';

import { useNavigate } from 'react-router-dom';

// const formItemLayout = {
//   labelCol: { span: 0 },
//   wrapperCol: { span: 24 },
// };
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
// -----------------YEAR PICKER INFOS--------------------
// const onChange = (date, dateString) => {
//   console.log(dateString);
// };

// ============================================ Composant===========================================
function AddBoardgame() {
  const navigate = useNavigate();

  const onFinish = (values, dateString) => {
    console.log('Received values of form: ', values, dateString);
    axios.post(
      // URL
      'http://laura-poitou.vpnuser.lan:8000/api/boardgames',
      // données
      {
        name: values.name,
        editor: values.editor,
        author: values.author,
        year: values.year,
        scoreType: values.scoreType,
        picture: values.picture,
        description: values.description,
        minPlayer: values.min_player,
        maxPlayer: values.max_player,
      },
    )
      .then(() => {
        console.log('LA REQUETE EST UN SUCCES. Jeu bien ajouté');
      })

      .catch((error) => {
        console.log(error);
      })

      .finally(() => {
        navigate('/jeux');
      });
  };

  return (
    <div className="container addGame-container">
      <h2>Ajouter un jeu</h2>

      <div className="form-container">
        <Form
          name="validate_other"
          // {...formItemLayout}
          onFinish={onFinish}
          // initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
          // style={{ maxWidth: 2000 }}
        >

          {/* ------------------------------------SELECTION JEU------------------------------- */}
          <section>
            {/* <h3>Jeu</h3> */}
            <Space>
              <Form.Item label="Nom du jeu*" name="name">
                <Input name="name" required />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Editeur" name="editor">
                <Input name="editor" />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Auteur" name="author">
                <Input name="author" />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Date de parution" name="year">
                {/* <DatePicker
                  onChange={onChange}
                  picker="year"
                  name="year"
                /> */}
                <Input name="year" />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Description" name="description">
                <TextArea rows={4} cols={50} name="description" />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item name="scoreType" label="Type de scoring">
                <Radio.Group>
                  <Radio value="highestScore">Le plus haut score gagne</Radio>
                  <Radio value="lowestScore">Le plus petit score gagne</Radio>
                  <Radio value="noScore">Pas de système de scoring</Radio>
                </Radio.Group>
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="Joueurs Min*" name="max_player">
                <InputNumber name="max_player" min={1} required />
              </Form.Item>
              <Form.Item label="Joueurs Max*" name="min_player">
                <InputNumber name="min_player" min={1} required />
              </Form.Item>
            </Space>

            <Space>
              <Form.Item label="Lien vers image" name="picture">
                <Input name="picture" />
              </Form.Item>
            </Space>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Valider
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
