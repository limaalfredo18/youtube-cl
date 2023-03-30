import timeAgo from "lib/timeAgo";
import Link from "next/link";
import Image from "next/image";

export default function Video({ video }) {
  return (
    <div className="">
      <div className="px-5 pb-5">
        {video.thumbnail && (
          <Link href={`/video/${video.id}`}>
            <Image
              className="mb-2 rounded cursor-pointer"
              src={video.thumbnail}
              width="800"
              height="450"
            />
          </Link>
        )}
        <p className="relative float-right p-1 mr-1 text-white bg-black rounded -mt-11">
          {Math.floor(video.length / 60)
            .toString()
            .padStart(2, "0")}
          :{(video.length % 60).toString().padStart(2, "0")}
        </p>
        <div className="flex">
          {video.author.image && (
            <img
              className="w-10 h-10 mt-2 mr-2 rounded-full"
              src={video.author.image}
            />
          )}
          <div>
            <Link
              className="text-lg font-bold text-white cursor-pointer"
              href={`/video/${video.id}`}
            >
              {video.title}
            </Link>
            <div className="">
              <div className="">
                <div className="text-gray-400">
                  <Link
                    className="mr-2 underline cursor-pointer"
                    href={`/channel/${video.author.username}`}
                  >
                    {video.author.name}
                  </Link>
                  · {video.views} views ·{" "}
                  {timeAgo.format(new Date(video.createdAt))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
