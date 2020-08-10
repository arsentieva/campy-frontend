import React, { useContext, useEffect } from 'react'
import { CampyContext } from '../../context/CampyContext'
export const EditLocation = () => {
  const { currentUser, getUser, userID } = useContext(CampyContext);
import url from "../../config";


  useEffect(() => {
    const getUserData = async () => {
      await getUser(userID)
    }
    getUserData();
  }, [userID])
  return currentUser ? (
    <div>
      Add location stuff
    </div>
  ) : null;
}
