import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SystemStaffService from "../../services/systemStaffService";
import { Button, Card, FormField, Form, Icon } from "semantic-ui-react";
import { Formik } from "formik";
import * as yup from "yup";
import MFBTextInput from "../../utilities/customFormControls/MFBTextInput";
import swal from "sweetalert";

export default function SystemStaffUpdate() {
  let { id } = useParams();
  const [systemStaff, setSystemStaff] = useState({});
  let initialValues = {
    birthYear: "",
    email: "",
    firstName: "",
    id: id,
    identificationNumber: "",
    lastName: "",
    password: "",
    verifiedByEmail: true,
  };
  useEffect(() => {
    let systemStaffService = new SystemStaffService();
    systemStaffService
      .getById(id)
      .then((result) => setSystemStaff(result.data.data));
  }, [id]);

  const handleValues = (values) => {
    if (values.identificationNumber === "") {
      values.identificationNumber = systemStaff.identificationNumber;
    }
    if (values.birthYear === "") {
      values.birthYear = systemStaff.birthYear;
    }
    if (values.email === "") {
      values.email = systemStaff.email;
    }
    if (values.firstName === "") {
      values.firstName = systemStaff.firstName;
    }
    if (values.lastName === "") {
      values.lastName = systemStaff.lastName;
    }
    if (values.password === "") {
      values.password = systemStaff.password;
    }
  };
  const schema = yup.object().shape({
    email: yup.string().email("Geçerli bir email adresi giriniz"),
  });
  const handleOnSubmit = (values) => {
    handleValues(values);
    let systemStaffService = new SystemStaffService();
    systemStaffService
      .update(values)
      .then((result) =>
        swal(
          `${result.data.message}`,
          "",
          `${result.data.success ? "success" : "error"}`
        )
      );
  };

  return (
    <div>
      <Card
        fluid
        color="teal"
        style={{ marginTop: 20 }}
        header={"Bilgiler Güncelle"}
      />
      <Card fluid={true}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => {
            handleOnSubmit(values);
          }}
        >
          {(formikprops) => (
            <div>
              <Form
                onClick={() => {
                  handleValues(formikprops.values);
                }}
                onSubmit={formikprops.handleSubmit}
              >
                <FormField>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder={"İsim"}
                    name={"firstName"}
                    value={formikprops.values.firstName}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </FormField>

                <FormField>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder="Soyisim"
                    name={"lastName"}
                    value={formikprops.values.lastName}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </FormField>
                <FormField>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder="Doğum Yılı"
                    name={"birthYear"}
                    value={formikprops.values.birthYear}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </FormField>
                <FormField>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder="Kimlik Numarası"
                    name={"identificationNumber"}
                    value={formikprops.values.identificationNumber}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </FormField>
                <FormField>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder="Mail Adresi"
                    name={"email"}
                    value={formikprops.values.email}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </FormField>
                <FormField>
                  <MFBTextInput
                    style={{ width: "100%" }}
                    placeholder="Parola"
                    name={"password"}
                    type={"password"}
                    value={formikprops.values.password}
                    onChange={formikprops.handleChange}
                    onBlur={formikprops.handleBlur}
                  />
                </FormField>
                <FormField>
                  <Button color={"green"} animated={"fade"} type={"submit"}>
                    <Button.Content visible>Güncelle</Button.Content>
                    <Button.Content hidden>
                      <Icon name={"pencil"} />
                    </Button.Content>
                  </Button>
                </FormField>
              </Form>
            </div>
          )}
        </Formik>
      </Card>
    </div>
  );
}
