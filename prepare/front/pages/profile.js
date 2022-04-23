import React from "react";

import NicknameEditForm from "../components/NicknameEditForm";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const followerList = [
    { nickname: "지니" },
    { nickname: "저니" },
    { nickname: "오피셜" },
  ];
  const followingList = [
    { nickname: "지니" },
    { nickname: "저니" },
    { nickname: "오피셜" },
  ];

  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList header="팔로잉" data={me.followings} />
      <FollowList header="팔로워" data={me.followers} />
    </AppLayout>
  );
};

export default Profile;
