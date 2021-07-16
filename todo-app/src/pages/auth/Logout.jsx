import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "reapop";
import { logout } from "../../actions/auth/accountActions";
import BaseButton from "../../components/base/baseButton/BaseButton";
import Loading from "../../components/loading/Loading";

function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userSignin = useSelector((state) => state.account.token);
  const isLoading = useSelector((state) => state.account.loading);
  const alertOut = useSelector((state) => state.account.alertLogout);
  useEffect(() => {
    (async function () {
      if (userSignin === "") {
        if (alertOut) {
          await dispatch(notify("Logout Successfully", "success"));
          await history.push("/login");
        }
      }
    })();
  }, [userSignin, history, alertOut, dispatch]);
  const confirmLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="popup__container">
      <div className="popup__container" v-if="isShowPopUp">
        <div className="modal-wrapper">
          <h1 className="modal-title">Do you want log out ?</h1>
          <div className="modal-buttons">
            <BaseButton click={confirmLogout}>Yes</BaseButton> &ensp;
            <BaseButton click={() => history.push("/")}>No</BaseButton>
          </div>
        </div>
        <div className="popup__fill"></div>
      </div>
      {isLoading ? <Loading /> : null}
    </div>
  );
}

export default Logout;
