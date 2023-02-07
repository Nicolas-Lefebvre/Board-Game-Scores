import './contact.scss';
import Facebook from 'src/assets/images/Facebook-logo.png';
import Instagram from 'src/assets/images/Instagram-logo.png';
import Twitter from 'src/assets/images/Twitter-logo.png';
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
function Contact() {
    const navigate = useNavigate();

    const onFinish = (values, dateString) => {
      console.log('Received values of form: ', values, dateString);
      axios.post(
        // URL
        'http://syham-zedri.vpnuser.lan:8000/api/boardgames',
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
        <h2>Contactez nous!</h2>
  
        <div className="form-container">
          <Form
            name="validate_other"
            // {...formItemLayout}
            onFinish={onFinish}
            // initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
            // style={{ maxWidth: 2000 }}
          >
            <p>Vous pouvez nous contacter sur les réseaux sociaux ou via notre formulaire de contact, nous vous répondrons dans les meilleurs délais!</p>

            <img src={Facebook} alt="" className="image" />
            <img src={Instagram} alt="" className="image" />
            <img src={Twitter} alt="" className="image" />

            <section>
              <Space>
                <Form.Item label="Nom*" name="name">
                  <Input name="name" required />
                </Form.Item>
              </Space>
              <Space>
                <Form.Item label="Email*" name="name">
                  <Input name="name" required />
                </Form.Item>
              </Space>
              <Space>
                <Form.Item label="Commentaire*" name="description">
                  <TextArea rows={4} cols={50} name="description" />
                </Form.Item>
              </Space>
              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Envoyer
                </Button>
  
              </Form.Item>
            </section>
          </Form>
        </div>
  
      </div>
    );
  }

// == Export
export default Contact;
