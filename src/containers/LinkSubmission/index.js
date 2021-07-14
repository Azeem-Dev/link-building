import React, { useEffect, useState } from "react";
import { getUtil, postUtil } from "../../utils/api/link-building-api";
import LinkSubmissionForm from "./../../components/LinkSubmission/LinkSubmissionForm";
import { useHistory } from "react-router-dom";

const LinkSubmission = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    let catg = [];
    let subcatg = [];
    getUtil("Category/GetAllCategories").then((c) => {
      c.data.map((item) => {
        catg.push({ id: item.id, value: item.id, label: item.name });
        subcatg.push({
          categoryId: item.id,
          sub_categories: item.subCategories.map((d) => {
            console.log(d);
            return {
              id: d.id,
              value: d.id,
              label: d.name,
            };
          }),
        });
      });
      setCategories(catg);
      subcatg.forEach((item) => {
        if (item.sub_categories[0].id == undefined) {
          item.sub_categories = [];
        }
      });
      setSubCategories(subcatg);
      console.log("category", catg);
      console.log("subcategory", subcatg);
    });
  }, []);

  const submitForm = (formData) => {
    console.log(formData);
    postUtil("Link/SubmitLink", formData).then((c) =>
      setTimeout(() => {
        history.push("/home");
      }, 300)
    );
  };

  return (
    <div>
      <LinkSubmissionForm
        submitForm={submitForm}
        categories={categories}
        subCategories={subCategories}
      />
    </div>
  );
};

export default LinkSubmission;
