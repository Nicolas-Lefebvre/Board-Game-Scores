/* eslint-disable import/no-extraneous-dependencies */
import './addGame.scss';

import Link from 'antd/es/typography/Link';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  // Checkbox,
  // Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  // Row,
  Select,
  // Slider,
  Switch,
  Upload,
  Space,
  Input,
  // DatePicker,
  // TimePicker,
} from 'antd';
import FormItem from 'antd/es/form/FormItem';

const { Option } = Select;

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

const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

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
function AddGame() {
  return (
    <div className="container addGame-container">
      <h2>Ajouter une partie</h2>

      <div>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
          style={{ maxWidth: 2000 }}
        >

          {/* ------------------------------------STATUS PARTIE--------------------------------- */}
          <section>
            <h3>Jeu</h3>
            <Form.Item name="gameStatus" label={<span style={{ fontSize: '1.2rem' }}>Status partie :</span>}>
              <Radio.Group>
                <Radio value="finished"><span style={{ fontSize: '1.2rem' }}>Partie terminée</span></Radio>
                <Radio value="pending">Partie en cours</Radio>
              </Radio.Group>
            </Form.Item>

            {/* ------------------------------------SELECTION JEU------------------------------- */}
            <Form.Item
              name="boardGame"
              label=<span>Jeu</span>
              hasFeedback
              rules={[{ required: true, message: 'Selectionnez un jeu' }]}
            >
              <Select placeholder="Please select a country">
                <Option value="catan">Catan</Option>
                <Option value="monopoly">Monopoly</Option>
              </Select>
            </Form.Item>
            <Link to="#">Ajouter un jeu à ma collection</Link>
          </section>

          {/* ------------------------------------SELECTION JOUEURS----------------------------- */}
          <section>
            <h3>Joueurs</h3>
            <Form.List
              name="users"
              className="players-wrapper"
              initialValue={[
                { name: '', score: '' },
                { name: '', score: '' },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                        justifyContent: 'center',
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[
                          {
                            required: true,
                            message: 'Il manque le Nom',
                          },
                        ]}
                      >
                        <Input placeholder="Nom Joueur" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'score']}
                        rules={[
                          {
                            required: true,
                            message: 'Il manque le score',
                          },
                        ]}
                      >
                        <Input placeholder="Score" />
                      </Form.Item>
                      {/* ------------------------isWINNER ------------------------ */}
                      <Form.Item
                        label="Vainqueur"
                        valuePropName="checked"
                        {...restField}
                        name={[name, 'winner']}
                      >
                        <Switch />
                      </Form.Item>
                      {/* ------------------------NOTE ------------------------ */}
                      <Form.Item name={[name, 'rate']} label="Note">
                        <Rate />
                      </Form.Item>
                      {/* ------------------------EQUIPE ----------------------- */}
                      <Form.Item label="N° équipe">
                        <Form.Item name={[name, 'teamNumber']} noStyle>
                          <InputNumber min={1} max={10} />
                        </Form.Item>
                        {/* <span className="ant-form-text" style={{ marginLeft: 8 }}>
                          n° Equipe
                        </span> */}
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item style={{
                    display: 'flex',
                    // marginBottom: 8,
                    justifyContent: 'center',
                  }}
                  >
                    <Button type="dashed" style={{ width: '200px', height: '40px', fontWeight: 'bold' }} onClick={() => add()} block icon={<PlusOutlined />}>
                      Ajouter un joueur
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </section>

          {/* ------------------------------------FIN SELECTION JOUEUR-------------------------- */}

          {/* ------------------------------------SELECTIONS DATES ET HEURE------------------- */}
          <section>
            <h3>Date et heure</h3>
            {/* <Form.Item name="startDate" label="Date et heure de début" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item name="endDate" label="Date et heure de fin" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item> */}
            <FormItem name="startDate">
              <div className="form-group">
                <label htmlFor="partieDate">Début partie :
                  <input type="datetime-local" id="partieDate" name="startDate" />
                </label>
              </div>
            </FormItem>
            <FormItem name="endDate">
              <div className="form-group">
                <label htmlFor="partieDate">Fin partie :
                  <input type="datetime-local" id="partieDate" name="endDate" />
                </label>
              </div>
            </FormItem>
          </section>
          {/* ------------------------------------COMMENTAIRE ET PHOTO-------------------------- */}
          <section>
            <h3>Commentaires</h3>
            <Form.Item label="TextArea">
              <TextArea rows={4} />
            </Form.Item>
            <h3>Photo souvenir</h3>
            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Formats acceptés"
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </section>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Valider
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
}

// == Export
export default AddGame;
