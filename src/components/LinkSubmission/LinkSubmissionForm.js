import React, { useState, useEffect } from "react";
import { Input, Select, Checkbox, Typography, Button, message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const URL_Builder = ({ setUrl }) => {
  var subCategories = [];
  const [url, setLocalUrl] = useState("");
  const [selectedProtocol, setSelectedProtocol] = useState("http://");
  return (
    <Input
      addonBefore={
        <Select
          defaultValue="http://"
          className="select-before"
          onChange={(value) => setSelectedProtocol(value)}
        >
          <Option value="http://">http://</Option>
          <Option value="https://">https://</Option>
        </Select>
      }
      defaultValue="mywebsite.com"
      value={url}
      onChange={(e) => {
        setLocalUrl(e.target.value);
        setUrl(`${selectedProtocol}${e.target.value}`);
      }}
    />
  );
};

const GetCategories = ({
  list = [],
  subCategories,
  setCategories,
  setSubCategories,
}) => {
  const [checkedValues, setCheckedValues] = useState([]);
  const [subChecked, setSbChecked] = useState([]);

  useEffect(() => {
    setCategories(checkedValues);
    setSubCategories(
      subChecked !== [] || subChecked !== null ? subChecked : []
    );
  }, [checkedValues, subChecked]);

  const onChangeCategories = (checkedValues) => {
    setCheckedValues(checkedValues);
  };

  const onChangeSubCategories = (checkedValues, categoryId) => {
    setSbChecked((prev) => {
      return [
        {
          categoryId: categoryId,
          subCategories: checkedValues,
        },
        ...prev,
      ];
    });
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <Title level={4}>{"Categories".toUpperCase()}</Title>
      <Checkbox.Group
        onChange={onChangeCategories}
        options={list}
      ></Checkbox.Group>
      <div style={{ marginTop: "20px" }}>
        {checkedValues.length > 0 ? (
          <Title level={4}>{"Sub-Categories".toUpperCase()}</Title>
        ) : (
          ""
        )}
        {subCategories.map((c, i) => {
          if (checkedValues.includes(c.categoryId)) {
            return (
              <div key={i}>
                <Title level={5}>
                  {`${
                    list.filter((d) => {
                      return d.id == c.categoryId;
                    })[0].label
                  }`.toUpperCase()}
                </Title>
                <Checkbox.Group
                  onChange={(selectedValues) =>
                    onChangeSubCategories(selectedValues, c.categoryId)
                  }
                  options={c.sub_categories}
                ></Checkbox.Group>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

const LinkSubmissionForm = ({ submitForm, categories, subCategories }) => {
  const history = useHistory();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoriesLocal, setCategoriesLocal] = useState([]);
  const [subCategoriesLocal, setSubCategoriesLocal] = useState([]);
  const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const [captchaSuccess, setCaptchaSuccess] = useState(false);

  const handleSave = () => {
    if (captchaSuccess && url !== "" && title !== "" && description !== "") {
      console.log(subCategoriesLocal);
      message.success("Form Successfully Submitted");
      submitForm({
        link: url,
        title,
        description,
        categories: categoriesLocal,
        subCategories: subCategoriesLocal,
      });
      setTimeout(() => {
        history.push("/home");
      }, 300);
    } else {
      message.error("Please enter valid aruguments and enter captcha");
    }
  };

  const handleCancel = () => {};
  return (
    <div
      style={{
        display: "flex",
        width: "80%",
        margin: "10vh auto",
        flexDirection: "column",
      }}
    >
      <Title level={2}>{"Link Submission".toUpperCase()}</Title>
      <URL_Builder setUrl={(value) => setUrl(value)} />
      <Input
        placeholder="Website Title"
        maxLength={50}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginTop: "10px", padding: "10px 5px", fontSize: "16px" }}
      />
      <TextArea
        rows={4}
        maxLength={300}
        style={{ marginTop: "10px", padding: "10px 5px", fontSize: "16px" }}
        placeholder="Description/ Max Limit 300 words"
        autoSize={true}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <GetCategories
        list={categories}
        subCategories={subCategories}
        setCategories={(value) => setCategoriesLocal(value)}
        setSubCategories={(value) => setSubCategoriesLocal(value)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <ReCAPTCHA
          sitekey={TEST_SITE_KEY}
          onChange={(value) => {
            setCaptchaSuccess(true);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button type="primary" size="large" onClick={handleSave}>
          SAVE
        </Button>
        <Button
          type="primary"
          danger
          size="large"
          style={{ marginLeft: "10px" }}
          onClick={handleCancel}
        >
          CANCEL
        </Button>
      </div>
    </div>
  );
};

export default LinkSubmissionForm;
