import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Setup() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  if (!session || !session.user) return null;
  if (loading) return null;

  if (!loading && session.user.name) {
    router.push("/");
  }

  return (
    <form
      className="mt-10 ml-20"
      onSubmit={async (e) => {
        e.preventDefault();

        const body = new FormData();
        body.append("image", image);
        body.append("name", name);
        body.append("username", username);

        await fetch("/api/setup", {
          body,
          method: "POST",
        });

        session.user.name = name;
        session.user.username = username;
        router.push("/");
      }}
    >
      <div className="flex-1 mb-5">
        <div className="flex-1 mb-2 text-xl font-medium">Name</div>
        <input
          className="p-1 bg-gray-800 rounded"
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex-1 mb-5">
        <div className="flex-1 mb-2 text-xl font-medium">Username</div>
        <input
          className="flex-1 p-1 mb-2 bg-gray-800 rounded"
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="text-sm text-gray-500">
        <label className="relative block my-3 font-medium underline cursor-pointer">
          {!image && <p className="mb-2 text-xl font-medium">Avatar</p>}
          <img className="w-20 h-20 rounded bg-slate-800" src={imageURL} />
          <input
            className="hidden"
            name="image"
            type="file"
            accept="image/*"
            placeholder="Avatar"
            required
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                if (event.target.files[0].size > 3072000) {
                  alert("Maximum size allowed is 3MB");
                  return false;
                }
                setImage(event.target.files[0]);
                setImageURL(URL.createObjectURL(event.target.files[0]));
              }
            }}
          />
        </label>
      </div>

      <button className="py-2 text-xl font-bold bg-blue-700 px-14 rounded-xl hover:gb-blue-900">
        Save
      </button>
    </form>
  );
}
