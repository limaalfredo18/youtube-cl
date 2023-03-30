import {
  getUser,
  getVideos,
  getSubscribersCount,
  isSubscribed,
} from "lib/data";
import Link from "next/link";
import SubscribedButton from "components/SubscribedButton";
import { useSession, getSession } from "next-auth/react";

import { useState } from "react";
import Head from "next/head";

import { amount } from "lib/config";
import prisma from "lib/prisma";

import Videos from "components/Videos";
import LoadMore from "components/LoadMore";
import Heading from "components/Heading";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */

export default function Channel({
  user,
  initialVideos,
  subscribers,
  subscribed,
}) {
  const [videos, setVideos] = useState(initialVideos);
  const [reachedEnd, setReachedEnd] = useState(initialVideos.length < amount);

  const { data: session, status } = useSession();

  const loading = status === "loading";
  if (loading) return null;

  if (!user)
    return <p className="p-5 text-center">Channel does not exist 😞</p>;

  return (
    <>
      <Head>
        <title>Channel of {user.name}</title>
        <meta name="description" content={`Channel of ${user.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading />
      <div>
        <div className="flex justify-between">
          <div className="flex m-5">
            {user.image && (
              <img
                className="w-20 h-20 mt-2 mr-2 rounded-full"
                src={user.image}
              />
            )}
            <div className="mt-5">
              <p className="text-lg font-bold text-white">{user.name}</p>
              <div className="">
                <div className="">
                  <div className="text-gray-400">{subscribers} subscribers</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 mr-5">
            {session && user.id === session.user.id ? (
              <>
                <Link
                  className="px-3 py-2 bg-green-500 rounded-md"
                  href={`/upload`}
                >
                  Upload new video
                </Link>
              </>
            ) : (
              <SubscribedButton user={user} subscribed={subscribed} />
            )}
          </div>
        </div>
        <div>
          <Videos videos={videos} />

          {!reachedEnd && (
            <LoadMore
              videos={videos}
              setVideos={setVideos}
              setReachedEnd={setReachedEnd}
              author={user}
            />
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let user = await getUser(context.params.username, prisma);
  user = JSON.parse(JSON.stringify(user));

  let videos = await getVideos({ author: user.id }, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  let subscribers = await getSubscribersCount(context.params.username, prisma);
  subscribers = JSON.parse(JSON.stringify(subscribers));

  let subscribed = null;
  if (session) {
    subscribed = await isSubscribed(session.user.username, user.id, prisma);
  }

  return {
    props: {
      initialVideos: videos,
      user,
      subscribers,
      subscribed,
    },
  };
}
