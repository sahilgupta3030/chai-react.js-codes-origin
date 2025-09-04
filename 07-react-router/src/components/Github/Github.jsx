import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData();
  return (
    <div className="text-center m-4 p-4 text-3xl bg-gray-600 text-white">
      Github followers: {data.followers}
      <img src={data.avatar_url} alt="git_profile_picture" width={400} />
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/sahilgupta3030");
  return response.json();
};
