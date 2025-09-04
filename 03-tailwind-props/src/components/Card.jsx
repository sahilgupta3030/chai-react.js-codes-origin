function Card(props) {
  const { username = "demouser", role = "worker" } = props;
  return (
    <>
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden flex items-center space-x-4 p-4">
        <img
          class="h-20 w-20 object-cover rounded-lg"
          src="https://assets.leetcode.com/users/sahilgupta3030/avatar_1715928014.png"
          alt="Profile image"
        />
        <div>
          <h2 class="text-xl font-semibold text-gray-800">{username}</h2>
          <p class="text-sm text-gray-500">{role}</p>
          <p class="mt-1 text-gray-600 text-sm">
            Working on frontend technologies with a focus on performance and UX.
          </p>
        </div>
      </div>
    </>
  );
}

export default Card;
