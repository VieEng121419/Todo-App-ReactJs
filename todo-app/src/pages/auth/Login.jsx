import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { notify } from "reapop";
import { login } from "../../actions/auth/accountActions";
import BaseButton from "../../components/base/baseButton/BaseButton";
import Error from "../../components/base/textErrorBase/TextErrorBase";
import Loading from "../../components/loading/Loading";

Login.propTypes = {};

function Login() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.account.token);
  const isLoading = useSelector((state) => state.account.loading);
  const errorMess = useSelector((state) => state.account.errorData);
  const errorStatus = useSelector((state) => state.account.errorStt);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userSignin !== "") {
      dispatch(notify("Login Successfully!", "success"));
      history.push("/");
    }
    if (errorStatus !== "") {
      dispatch(notify(errorStatus + " " + errorMess, "error"));
    }
  }, [userSignin, history, dispatch, errorMess, errorStatus]);

  const onSubmit = () => {
    dispatch(login({ email: email, password: password }));
  };

  return (
    <div className="login__container">
      <div className="title__register">
        <h1>LOGIN</h1>
      </div>
      <div className="form__register">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Type your email"
              {...register("email", { required: "This is required" })}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <Error>{errors.email.message}</Error>}
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
          <BaseButton class="form" type="submit">
            Login
          </BaseButton>
        </form>
      </div>
      {isLoading ? <Loading /> : null}
    </div>
  );
}

export default Login;
