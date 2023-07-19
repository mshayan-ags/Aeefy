import React from "react";
import { Form, Button } from "rsuite";
import Logo from "../Images/Logo.png";
import { withAuthContext } from "../Context";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

const SignUp = ({ setToken }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (name, target) => {
    setState({ ...state, [name]: target });
  };

  const handleSubmit = () => {
    if (state?.email && state?.password) {
      axios
        .post(`${process.env.REACT_APP_PUBLIC_PATH}/SignUp`, state)
        .then((res) => {
          if (res?.data?.status == 200) {
            localStorage.setItem("token", res?.data?.token);
            setToken(res?.data?.token);
            navigate("/Chat");
            window.location.reload();
          }
          swal({
            text: res?.data?.message,
            button: {
              text: "Ok",
              closeModal: true,
            },
            icon: res?.data?.status == 200 ? "success" : "error",
            time: 3000,
          });
        })
        .catch((err) => {
          swal({
            text:
              err?.response?.data?.status == 500
                ? "There was some Error in Your Request\n Please Change Your Email!"
                : "There was some Error",
            button: {
              text: "Ok",
              closeModal: true,
            },
            icon: "error",
            time: 3000,
          });
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: "100vh",
        background: "#009859",
      }}
    >
      <div
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          width: "90%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            width: "50%",
            justifyContent: "center",
            background: "#FFF",
            height: "80vh",
          }}
        >
          <img src={Logo} />
        </div>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            width: "50%",
            justifyContent: "center",
            background:
              "linear-gradient(0deg, rgba(148,188,88,1) 0%, rgba(131,175,87,1) 38%, rgba(86,140,85,1) 76%, rgba(62,121,84,1) 99%)",
            height: "80vh",
          }}
        >
          <Form>
            <Form.Group>
              <Form.ControlLabel srOnly>Name</Form.ControlLabel>
              <Form.Control
                onChange={(value) => handleChange("name", value)}
                placeholder="Username"
                name="username"
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel srOnly>Email</Form.ControlLabel>
              <Form.Control
                onChange={(value) => handleChange("email", value)}
                placeholder="Email"
                name="Email"
              />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel srOnly>Phone</Form.ControlLabel>
              <Form.Control
                onChange={(value) => handleChange("Phone", value)}
                placeholder="Phone"
                name="Phone"
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel srOnly>Password</Form.ControlLabel>
              <Form.Control
                onChange={(value) => handleChange("password", value)}
                placeholder="Password"
                name="password"
                type="password"
              />
            </Form.Group>
            <Button
              block
              style={{
                color:
                  "linear-gradient(0deg, rgba(148,188,88,1) 0%, rgba(131,175,87,1) 38%, rgba(86,140,85,1) 76%, rgba(62,121,84,1) 99%)",
              }}
              onClick={() => handleSubmit()}
            >
              Signup
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withAuthContext(SignUp);
