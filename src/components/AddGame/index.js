/* eslint-disable import/no-extraneous-dependencies */
import './addGame.scss';

import Link from 'antd/es/typography/Link';
import { InboxOutlined, UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
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
                { name: "", score: "" },
                { name: "", score: "" },
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

          <section>
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
          {/* <Form.Item
            name="select-multiple"
            label="Select[multiple]"
            rules={[{ required: true,
            message: 'Please select your favourite colors!', type: 'array' }]}
          >
            <Select mode="multiple" placeholder="Please select favourite colors">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>

          <Form.Item label="InputNumber">
            <Form.Item name="input-number" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text" style={{ marginLeft: 8 }}>
              machines
            </span>
          </Form.Item>

          <Form.Item name="switch" label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="slider" label="Slider">
            <Slider
              marks={{
                0: 'A',
                20: 'B',
                40: 'C',
                60: 'D',
                80: 'E',
                100: 'F',
              }}
            />
          </Form.Item>

          <Form.Item
            name="radio-button"
            label="Radio.Button"
            rules={[{ required: true, message: 'Please pick an item!' }]}
          >
            <Radio.Group>
              <Radio.Button value="a">item 1</Radio.Button>
              <Radio.Button value="b">item 2</Radio.Button>
              <Radio.Button value="c">item 3</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="checkbox-group" label="Checkbox.Group">
            <Checkbox.Group>
              <Row>
                <Col span={8}>
                  <Checkbox value="A" style={{ lineHeight: '32px' }}>
                    A
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>
                    B
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="C" style={{ lineHeight: '32px' }}>
                    C
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="D" style={{ lineHeight: '32px' }}>
                    D
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="E" style={{ lineHeight: '32px' }}>
                    E
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="F" style={{ lineHeight: '32px' }}>
                    F
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="rate" label="Rate">
            <Rate />
          </Form.Item> */}


          {/* <Form.Item label="Dragger">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item> */}

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
}

// == Export
export default AddGame;
