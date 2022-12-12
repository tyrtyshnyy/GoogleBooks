import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
import { FC } from "react";
import { NavigateFunction } from "react-router-dom";

import { addBooks, loadingBooks } from "../../store/bookSlice";
import { useAppDispatch } from "../../utils/hook";
import { bookApi } from "../../utils/service/GoogleBooks";
import s from "./style.module.css";

const { Option } = Select;
interface SearchGroupProps {
  startIndex: number;
  navigate: NavigateFunction
}
interface FormResult {
  nameBook: string;
  sortBy?: string;
  category?: string;
}
const SearchGroup: FC<SearchGroupProps> = ({ startIndex, navigate  }) => {
  const [searchBooksForm] = Form.useForm();


  const dispatch = useAppDispatch();

  const initialValue: FormResult = {
    nameBook: "",
  };

  const getBooks = () => {
    dispatch(loadingBooks(true))
    searchBooksForm
      .validateFields()
      .then((e: FormResult) => {
        console.log(e.category);

        bookApi
          .getAll(e.nameBook, e.category, e.sortBy)
          .then((result) => {
            dispatch(loadingBooks(false))
            dispatch(addBooks(result))
            navigate('../')
          })
          .catch((e) => {
            dispatch(loadingBooks(false))
            console.log("ошибка", e);
          });
      })

      .catch((e) => {

        console.log(e);
      });
  };

  return (
    <div className={s.wrapper}>
      <Form
        layout="horizontal"
        form={searchBooksForm}
        initialValues={initialValue}
        // onValuesChange={onFormLayoutChange}
      >
        <Divider orientation="left">Поиск книг</Divider>
        <Row align="middle" justify="space-between">
          <Col xs={17} sm={20} md={20} lg={20} xl={20}>
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
                name="nameBook"
              >
                <Input placeholder="Поиск" className={s.input} size={"large"} />
              </Form.Item>
            </div>
          </Col>

          <Col xs={7} sm={4} md={4} lg={4} xl={4}>
            <div className={s.column}>
              <Form.Item validateTrigger={"onBlur"} name="category">
                <Button onClick={getBooks}>Поиск</Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={10} sm={10} md={10} lg={10} xl={10}>
            <div className={s.column}>
              <Form.Item validateTrigger={"onBlur"} name="category">
                <Select placeholder="Выбрать категорию" className={s.input}>
                  <Option key="art">искусство</Option>
                  <Option key="biography">биография</Option>
                  <Option key="computers">компьютер</Option>
                  <Option key="history">история</Option>
                  <Option key="medical">медицина</Option>
                  <Option key="poetry">искусство</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>
          <Col xs={10} sm={10} md={10} lg={10} xl={10}>
            <div className={s.column}>
              <Form.Item validateTrigger={"onBlur"} name="sortBy">
                <Select placeholder="Сортировка по.." className={s.input}>
                  <Option key="relevance">релевантности</Option>
                  <Option key="newest">новизне</Option>
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
