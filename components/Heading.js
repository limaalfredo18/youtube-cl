import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Heading() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const loading = status === "loading";
  if (loading) return null;

  return (
    <header className="flex px-5 pt-5 pb-2 mb-2 h-14 bg-slate-800">
      <div className="">
        {router.asPath === "/" ? (
          <h1 className="text-xl font-bold text-white">Youtube Clone</h1>
        ) : (
          <Link className="underline" href={`/`}>
            Home
          </Link>
        )}
      </div>

      <div className="ml-10 -mt-1 grow"></div>

      {session &&
        (router.asPath === "/subscriptions" ? (
          <a className="flex">
            <p className="mr-3 font-bold">Subscriptions</p>
          </a>
        ) : (
          <Link href={`/subscriptions`} className="flex mr-3 underline">
            Subscriptions
          </Link>
        ))}

      {session && (
        <Link className="flex" href={`/channel/${session.user.username}`}>
          <img
            src={session.user.image}
            className="w-8 h-8 mb-2 mr-2 -mt-1 rounded-2xl"
          />
          <p className="mr-3">{session.user.name}</p>
        </Link>
      )}

      <Link
        className="px-4 ml-auto font-bold text-white bg-blue-700 border-blue-700 rounded-xl hover:bg-blue-900"
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
      >
        {session ? "logout" : "login"}
      </Link>
    </header>
  );
}
