import React from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton, Typography} from '@material-ui/core'
import { Person, PersonAdd, MeetingRoom} from '@material-ui/icons'

export const AuthOptions = () => {
  const history = useHistory();

  const signUp = () => {
    history.push('/sign-up')
  }
  const login = () => {
    history.push("/login");
  };
  // const logout = () => {
  // };
  return (
    <div>
      <IconButton onClick={login}>
        <Person />
        <Typography>Login</Typography>
      </IconButton>
      <IconButton onClick={signUp}>
        <PersonAdd />
        <Typography>Sign Up</Typography>
      </IconButton>
      {/* <IconButton onClick={logout}>
        <MeetingRoom />
        <Typography>Logout</Typography>
      </IconButton> */}
    </div>
  );
}
