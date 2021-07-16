import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import BaseButton from "../../components/base/baseButton/BaseButton";
import { useForm } from "react-hook-form";
import { notify } from "reapop";
import { useDispatch, useSelector } from "react-redux";
import { edit, getImg, uploadImg } from "../../actions/auth/accountActions";
import TextBase from "../../components/base/textBase/TextBase";
import Error from "../../components/base/textErrorBase/TextErrorBase";

function Profile() {
  var ava,
    imgUrl = null;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.loading);
  const errorMess = useSelector((state) => state.account.errorData);
  const errorStatus = useSelector((state) => state.account.errorStt);
  const alertUp = useSelector((state) => state.account.alertUpdate);
  const alertAva = useSelector((state) => state.account.alertAvatar);
  const url = useSelector((state) => state.account.urlImg);
  const [save, setSave] = useState(false);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState(
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).account)
      .userInfo.email
  );
  const [age, setAge] = useState(
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).account)
      .userInfo.age
  );
  const [name, setName] = useState(
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).account)
      .userInfo.name
  );
  const [img, setImg] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(
      getImg(
        JSON.parse(JSON.parse(localStorage.getItem("persist:root")).account)
          .userInfo._id
      )
    );
    if (errorStatus !== "") {
      dispatch(notify(errorStatus + " " + errorMess.error, "error"));
    }
    if (alertAva) {
      dispatch(notify("Avatar Updated", "success"));
    }
    if (alertUp) {
      dispatch(notify("Edit Successfully", "success"));
    }
    setImg(`https://api-nodejs-todolist.herokuapp.com/${url}`);
  }, [url, dispatch, errorMess, errorStatus, alertAva, alertUp]);

  const onFileChange = (e) => {
    setSave(true);
    imgUrl = e.target.files[0];
    ava = URL.createObjectURL(e.target.files[0]);
    setFile(imgUrl);
    setImg(ava);
  };

  const uploadAva = (e) => {
    e.preventDefault();
    dispatch(uploadImg(file));
    setSave(false);
  };

  const onSubmit = () => {
    dispatch(edit({ name: name, age: age }));
  };

  return (
    <div className="container__profile--page">
      {isLoading ? <Loading /> : null}
      <div className="container__profile">
        <TextBase component="h3" variant="title-profile">
          My Account
        </TextBase>
        <div className="container__form--profile">
          <TextBase component="p" variant="form-profile">
            USER INFORMATION
          </TextBase>
          <div className="user__profile">
            <form onSubmit={uploadAva}>
              <div className="user__img">
                <img src={img} alt="" />
                <div className="input__img">
                  <input
                    type="file"
                    accept="image/*"
                    className="avatar"
                    id="img"
                    name="img"
                    onChange={onFileChange}
                  />
                  <label htmlFor="img">Choose</label>
                </div>
              </div>
              <div className="button__avatar--container">
                {save ? <BaseButton type="submit">Save</BaseButton> : null}
              </div>
            </form>
            <div className="info">
              <div className="info__name">
                <h6>
                  {name}, {age}
                </h6>
              </div>
              <div className="info__email">
                <h6>{email}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="form__edit">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Type your name"
                value={name}
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
                value={email}
                disabled
                {...register("email", { required: "This is required" })}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <Error>{errors.email.message}</Error>}
            </div>

            <div className="form-group">
              <label htmlFor="">Age</label>
              <input
                type="number"
                placeholder="Type your password"
                value={age}
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
            <BaseButton type="submit" class="form">
              Save
            </BaseButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
