import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export type ProfileListItem = {
  id: string;
  url: string;
};

type ProfileListProps = {
  onSelect: (pdf: ProfileListItem) => void;
};

const ListContainer = styled.div`
  margin-top: 20px;
`;

const ListTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const ListItem = styled.li<{ isSelected: boolean }>`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.isSelected ? '#dbe4ff' : '#fff')};
  border: 1px solid ${(props) => (props.isSelected ? '#4c8bf5' : '#ddd')};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isSelected ? '#dbe4ff' : '#f1f1f1')};
  }
`;

const ProfileList: React.FC<ProfileListProps> = ({ onSelect }) => {
  const [profiles, setProfiles] = useState<ProfileListItem[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<ProfileListItem | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/documents');
        const res = await response.json();
        setProfiles(res.data);

        const [defaultProfile] = res.data;

        if (!selectedProfile && defaultProfile) {
          setSelectedProfile(defaultProfile);
          onSelect(defaultProfile);
        }
      } catch (err) {
        console.error('Error fetching profiles:', err);
      }
    };

    fetchProfiles();
  }, []);

  const handleSelectProfile = (profile: ProfileListItem) => {
    setSelectedProfile(profile);
    onSelect(profile);
  };

  return (
    <ListContainer>
      <ListTitle>Profile List</ListTitle>
      <ul>
        {profiles.map((profile) => (
          <ListItem
            key={profile.id}
            isSelected={!!(selectedProfile && profile.id === selectedProfile.id)}
            onClick={() => handleSelectProfile(profile)}
          >
            {profile.url}
          </ListItem>
        ))}
      </ul>
    </ListContainer>
  );
};

export default ProfileList;
