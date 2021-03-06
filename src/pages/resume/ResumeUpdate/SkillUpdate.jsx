import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Label, Button, Dropdown, Card, Icon } from "semantic-ui-react";
import SkillService from "../../../services/skillService";
import * as yup from "yup";
import swal from "sweetalert";

export default function SkillUpdate({ id }) {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState({});

  useEffect(() => {
    let skillService = new SkillService();
    skillService.getByStaffId(id).then((result) => setSkills(result.data.data));
  }, [id]);

  const initialValues = {
    skillId: "",
    name: "",
  };

  const schema = yup.object().shape({
    skillId: yup.string().required("Bir seçim yapılmalıdır"),
  });

  const skillOption = skills.map((skill, index) => ({
    key: index,
    text: skill.name,
    value: skill.skillId,
  }));

  const handleSkillValue = (value) => {
    return {
      skillId: value.skillId,
      name: value.name,
      staff: {
        id: id,
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        identificationNumber: "",
        birthYear: "",
        verifiedByEmail: true,
      },
    };
  };
  const handleChangeSemantic = (prop, value, fieldName) => {
    prop.setFieldValue(fieldName, value);
    if (value !== "") {
      let skillService = new SkillService();
      skillService.getById(value).then((result) => setSkill(result.data.data));
    } else {
      setSkill({});
    }
  };

  const handleReadOnly = (prop) => {
    return prop.values.skillId === "";
  };

  const handleOnSubmit = (values) => {
    values.skillId = values.skillId !== "" ? values.skillId : skill.skillId;
    values.name = values.name !== "" ? values.name : skill.name;
    let skillService = new SkillService();
    skillService
      .update(handleSkillValue(values))
      .then((result) =>
        swal(
          `${result.data.message}`,
          "",
          `${result.data.success ? "success" : "error"}`
        ).then(() => window.location.reload())
      );
  };

  const handleSkillDelete = () => {
    if (skill.skillId !== undefined) {
      let skillService = new SkillService();
      skillService.delete(skill.skillId).then((result) =>
        swal(
          `${result.data.message}`,
          "",

          `${result.data.success ? "success" : "error"}`
        ).then(window.location.reload())
      );
    } else {
      swal("Bir okul seçiniz", "", "error").then();
    }
  };

  return (
    <Card color={"teal"} fluid style={{ marginTop: 20 }}>
      <Card.Header content={"Yetenek Bilgisini Güncelle"} />
      <Card.Content>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => {
            handleOnSubmit(values);
          }}
        >
          {(formikprops) => (
            <Form style={{ marginTop: 20 }} onSubmit={formikprops.handleSubmit}>
              <Form.Field>
                <Dropdown
                  style={{ width: "100%" }}
                  clearable
                  item
                  name="skillId"
                  placeholder="Güncellenecek Yetenek"
                  additionPosition="bottom"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(formikprops, data.value, "skillId")
                  }
                  onBlur={formikprops.handleBlur}
                  value={formikprops.values.skillId}
                  options={skillOption}
                />
                {formikprops.touched.skillId && !!formikprops.errors.skillId ? (
                  <Label
                    pointing
                    basic
                    color={"red"}
                    content={formikprops.errors.skillId}
                  />
                ) : null}

                <input
                  style={{ marginTop: 10 }}
                  name="name"
                  placeholder="Yetenek Adı"
                  readOnly={handleReadOnly(formikprops)}
                  type="text"
                  onChange={formikprops.handleChange}
                  onBlur={formikprops.handleBlur}
                  value={formikprops.values.name}
                />
                {formikprops.touched.name && !!formikprops.errors.name ? (
                  <Label
                    pointing
                    basic
                    color={"red"}
                    content={formikprops.errors.name}
                  />
                ) : null}
              </Form.Field>

              <Card.Header
                style={{ color: "red" }}
                content={"(Girilmeyen veriler eskisi gibi kalacaktır)"}
              />
              <br />
              <Button
                style={{ width: "50%" }}
                type="submit"
                animated="fade"
                positive
              >
                <Button.Content visible>
                  <Icon name="check circle" />
                </Button.Content>
                <Button.Content hidden>Güncelle</Button.Content>
              </Button>
            </Form>
          )}
        </Formik>
        <br />
        <Button
          style={{ width: "50%" }}
          onClick={() => {
            handleSkillDelete();
          }}
          animated="fade"
          negative
        >
          <Button.Content visible>
            <Icon name="trash alternate" />
          </Button.Content>
          <Button.Content hidden>Seçili Yeteneği Sil</Button.Content>
        </Button>
      </Card.Content>
    </Card>
  );
}
