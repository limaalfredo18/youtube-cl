export default function Utils() {
  return (
    <div className="mt-10 ml-20">
      <h2 className="mb-10 text-2xl font-bold">Utils</h2>

      <div className="flex-1 mb=5">
        <button
          className="px-8 py-2 mt-5 mr-8 font-bold bg-blue-700 border-blue-700 hover:bg-blue-900 rounded-xl"
          onClick={async () => {
            await fetch("api/utils", {
              body: JSON.stringify({
                task: "generate_content",
              }),
              headers: { "Content-Type": "application/json" },
              method: "POST",
            });
          }}
        >
          Generate Content
        </button>
      </div>

      <div className="flex-1 mb=5">
        <button
          className="px-8 py-2 mt-5 mr-8 font-bold bg-blue-700 border-blue-700 hover:bg-blue-900 rounded-xl"
          onClick={async () => {
            await fetch("api/utils", {
              body: JSON.stringify({
                task: "clean_database",
              }),
              headers: { "Content-Type": "application/json" },
              method: "POST",
            });
          }}
        >
          Clean database
        </button>
      </div>
    </div>
  );
}
