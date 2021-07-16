import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { notify } from "reapop";
import { signUp } from "../../actions/auth/accountActions";
import BaseButton from "../../components/base/baseButton/BaseButton";
import Error from "../../components/base/textErrorBase/TextErrorBase";
import Loading from "../../components/loading/Loading";

function Register(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.account.token);
  const isLoading = useSelector((state) => state.account.loading);
  const errorMess = useSelector((state) => state.account.errorData);
  const errorStatus = useSelector((state) => state.account.errorStt);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(1);
  const [password, setPassword] = useState("");
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userSignin !== "") {
      dispatch(notify("Register Successfully!", "success"));
      history.push("/");
    }
    if (errorStatus !== "") {
      dispatch(notify(errorStatus + " " + errorMess, "error"));
    }
  }, [userSignin, history, dispatch, errorMess, errorStatus]);

  const onSubmit = () => {
    dispatch(
      signUp({ name: name, email: email, age: age, password: password })
    );
  };

  return (
    <div className="login__container">
      <div className="title__register">
        <h1>REGISTER</h1>
      </div>
      <div className="form__register">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Type your name"
              {...register("name", {
                required: "This is required",
                minLength: {
                  value: 4,
                  message: "Name must be at least 4 letters",
                },
                maxLength: {
                  value: 128,
                  message: "Name must have at most 128 letters",
                },
              })}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <Error>{errors.name.message}</Error>}
          </div>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Type your email"
              {...register("email", {
                required: "This is required",
                email: "Email must be valid",
              })}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <Error>{errors.email.message}</Error>}
          </div>
          <div className="form-group">
            <label htmlFor="">Age</label>
            <input
              type="number"
              placeholder="Type your age"
              {...register("age", {
                required: "This is required",
                min: {
                  value: 10,
                  message: "You exceeded the min value ",
                },
              })}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && <Error>{errors.age.message}</Error>}
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Type your password"
              {...register("password", {
                required: "This is required",
                minLength: {
                  value: 8,
                  message: "You exceeded the min length ",
                },
              })}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <Error>{errors.password.message}</Error>}
          </div>
          <div className="form-group">
            <label htmlFor="">Confrim Password</label>
            <input
              type="password"
              placeholder="Type your password"
              {...register("cofirmPassword", {
                required: "This is required",
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
            />
            {errors.cofirmPassword && (
              <Error>{errors.cofirmPassword.message}</Error>
            )}
          </div>
          <BaseButton class="form" type="submit">
            Register
          </BaseButton>
        </form>
      </div>
      {isLoading ? <Loading /> : null}
    </div>
  );
}

export default Register;
