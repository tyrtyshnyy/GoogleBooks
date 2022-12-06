import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
import s from "./style.module.css";

const { Option } = Select;

interface FormResult {
  textSearch: string;
}
const SearchGroup = () => {
  const [searchForm] = Form.useForm();

  const initialValue: FormResult = {
    textSearch: "",
  };

  const style: React.CSSProperties = { background: "#0092ff", padding: "8px" };

  return (
    <div className={s.wrapper}>
      <Form
        layout="horizontal"
        form={searchForm}
        initialValues={initialValue}
        // onValuesChange={onFormLayoutChange}
      >
        <Divider orientation="left">Поиск книг</Divider>
        <Row align="middle" justify="space-between">
          <Col xs={17} sm={20} md={10} lg={10} xl={10}>
            <div className={s.column}>
              <Form.Item
                validateTrigger={"onBlur"}
                rules={[
                  {
                    required: true,
                    min: 2,
                    message: "Пожалуйста введите текст",
                  },
                ]}
                name="textSearch"
              >
                <Input placeholder="Поиск" className={s.input} size={"large"} />
              </Form.Item>
            </div>
          </Col>

          <Col xs={7} sm={4} md={4} lg={4} xl={4}>
            <div className={s.column}>
              <Form.Item validateTrigger={"onBlur"} name="category">
                <Button>Поиск</Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={5} lg={5} xl={5}>
            <div className={s.column}>
              <Form.Item validateTrigger={"onBlur"} name="category">
                <Select placeholder="Выбрать категорию" className={s.input}>
                  <Option>;</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>
          <Col xs={12} sm={12} md={5} lg={5} xl={5}>
            <div className={s.column}>
              <Form.Item validateTrigger={"onBlur"} name="sortBy">
                <Select placeholder="Сортировка по.." className={s.input}>
                  <Option>;</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchGroup;
