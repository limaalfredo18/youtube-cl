import { useState } from "react";
import { useRouter } from "next/router";

export default function SubscribedButton({ user, subscribed }) {
  const router = useRouter();

  const [subscribedButtonText, setSubscribedButtonText] =
    useState("subscribed");
  const [subscribedButtonColor, setSubscribedButtonColor] = useState("green");

  const [unSubscribeButtontext, setUnSubscribedButtonText] =
    useState("Unsubscribe");
  const [unSubscribeButtonColor, setUnSubscribedButtonColor] = useState("red");

  return (
    <>
      {subscribed ? (
        <button
          className={`bg-${subscribedButtonColor}-500 px-3 py-2 rounded-md`}
          onClick={async () => {
            await fetch("/api/unsubscribe", {
              body: JSON.stringify({
                unsubscribeTo: user.id,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            });

            router.reload(window.location.pathname);
          }}
          onMouseOver={() => {
            setSubscribedButtonText("Unsubscribe");
            setSubscribedButtonColor("red");
          }}
          onMouseOut={() => {
            setSubscribedButtonText("Subscribed");
            setSubscribedButtonColor("green");
          }}
        >
          {subscribedButtonText}
        </button>
      ) : (
        <button
          className={`px-3 py-2 bg-${unSubscribeButtonColor}-500 rounded-md `}
          onClick={async () => {
            await fetch("/api/subscribe", {
              body: JSON.stringify({
                subscribeTo: user.id,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            });

            router.reload(window.location.pathname);
          }}
          onMouseOver={() => {
            setUnSubscribedButtonText("Subscribed");
            setUnSubscribedButtonColor("green");
          }}
          onMouseOut={() => {
            setUnSubscribedButtonText("Unsubscribe");
            setUnSubscribedButtonColor("red");
          }}
        >
          {unSubscribeButtontext}
        </button>
      )}
    </>
  );
}
