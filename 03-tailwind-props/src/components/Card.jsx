// Card is a React component (just a JS function)
// Normal functions take parameters, React functions take "props"
function Card(props) {
  // Destructuring props to get username and role
  // (If no props are passed.. defaults "demouser" and "worker" will be used)
  const { username = "demouser", role = "worker" } = props;

  return (
    <>
      {/* Outer container of the card with tailwindcss styling */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden flex items-center space-x-4 p-4">

        {/* Profile image shown in every card (same image for now) */}
        <img
          className="h-20 w-20 object-cover rounded-lg"
          src="https://assets.leetcode.com/users/sahilgupta3030/avatar_1715928014.png"
          alt="Profile image"
        />

        <div>
          {/* Showing username from props */}
          <h2 className="text-xl font-semibold text-gray-800">{username}</h2>

          {/* Showing role from props */}
          <p className="text-sm text-gray-500">{role}</p>

          {/* Static description text (same in all cards) */}
          <p className="mt-1 text-gray-600 text-sm">
            Working on frontend technologies with a focus on performance and UX.
          </p>
        </div>
      </div>
    </>
  );
}

export default Card;
