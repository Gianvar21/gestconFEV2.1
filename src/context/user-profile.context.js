import React, { useState, useEffect, createContext, useRef } from 'react';
import { getProfileLookupsForDDL } from './contact-manager.context';
import { useParams } from 'react-router-dom';

import { profileService as service } from '../services';

export const UserProfileContext = createContext();

const UserProfileProvider = (props) => {
  const mountedRef = useRef(true);
  const profileRef = useRef();
  const { profileType, profileId } = useParams();
  const [loading, setLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [lookupList, setLookupList] = useState([]);

  useEffect(() => {
    getFullProfile(res);
    return () => {
      console.log('Does it need cleanup?');
    };
  }, []);

  const getFullProfile = async () => {
    return await service.getFullProfile(profileType, profileId).then(
      (res) => {
        if (!mountedRef.current) return null;
        setProfileInfo(tempList);
        profileRef.current = tempList;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <UserProfileContext.Provider
      value={{
        getFullProfile,
      }}
    >
      {props.children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
