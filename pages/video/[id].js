import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

import Link from "next/link";

import { useEffect } from "react";
import prisma from "lib/prisma";
import { getVideo, getVideos } from "lib/data";
import timeAgo from "lib/timeAgo";
import Video from "components/Video";
import Head from "next/head";
import Heading from "components/Heading";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */

export default function SingleVideo({ video, videos }) {
  if (!video) return <p className="p-5 text-center 😞">Video does not exist</p>;

  useEffect(() => {
    const incrementViews = async () => {
      await fetch("/api/view", {
        body: JSON.stringify({
          video: video.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    };
    incrementViews();
  }, []);

  return (
    <>
      <Head>
        <title>{video.title}</title>
        <meta name="description" content={video.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading />

      <div className="flex h-screen">
        <div className="flex flex-col w-full pl-0 mb-4 bg-black border-t border-b border-r border-black md:w-2/3 border-3">
          <div className="relative pt-[60%]">
            <ReactPlayer
              className="absolute top-0 left-0 react-player "
              url={video.url}
              width="100%"
              height="100%"
              controls={true}
              light={video.thumbnail}
            />
          </div>

          <div className="px-5 mt-5">
            <div className="flex">
              <div>
                <p className="text-2xl font-bold">{video.title}</p>

                <div className="text-gray-400">
                  {video.views + 1} views •{" "}
                  {timeAgo.format(new Date(video.createdAt))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-5 mt-5 border-t gray-500">
              <Link className="flex" href={`/chanel/${video.author.username}`}>
                {video.author.image && (
                  <img
                    className="w-16 h-16 mt-2 mr-2 rounded-full"
                    src={video.author.image}
                  />
                )}
                <span className="mt-6 ml-2 text-xl">{video.author.name}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:block md:w-1/3">
          <div className="flex flex-wrap ">
            {videos.map((video, index) => {
              return (
                <div key={index} className="w-full">
                  <Video video={video} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let video = await getVideo(context.params.id, prisma);
  video = JSON.parse(JSON.stringify(video));

  let videos = await getVideos({ take: 3 }, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  return {
    props: {
      video,
      videos,
    },
  };
}
