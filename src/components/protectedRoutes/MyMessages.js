import React, { useContext, useEffect } from 'react'
import { CampyContext } from '../../CampyContext'
import url from "../../config";

export const MyMessages = () => {
  const { currentUser } = useContext(CampyContext);

  return currentUser ? (
    <div>
      Add location stuff
    </div>
  ) : null;
}
