import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {  Button,} from "@material-ui/core";
import { PermIdentity } from "@material-ui/icons";
import {CampyContext} from '../../context/CampyContext'

const useStyles = makeStyles((theme) => ({
  button: {
   
 }
}));

export const DemoUser = () => {
  const classes = useStyles();

  const { login, authToken, getUser, authAxios } = useContext(CampyContext);

  const email = 'demo@mail.com'
  const password = 'password';

  if (authToken) {
    return <Redirect to='/' />
  }

  const postLogin = () => {
    authAxios.post("/auth/login", {
      email,
      password,
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          const { access_token, user_id } = res.data;
          login(access_token);
          getUser(user_id)
          //TODO Refactor the code so it does not need to acces the user id
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>
      <div style={{ height: 20 }} />
      <Button className={classes.button}
        color="primary"
        variant="contained"
        width="100%"
        onClick={postLogin}
      >
        <PermIdentity />
        Login As Demo User
      </Button>

      <div />
    </div>
  );
};
