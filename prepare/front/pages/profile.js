import React, { useEffect } from "react";
import Router from "next/router";
import NicknameEditForm from "../components/NicknameEditForm";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from "../reducers/user";

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });

    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  });

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
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
