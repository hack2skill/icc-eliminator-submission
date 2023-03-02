import { useRouter } from "next/router";

export default function Card(props) {
  const router = useRouter();
  const handleClick = (event) => {
    if (props.path) router.push(`${props.path}`);
  };
  return (
    <div className="max-w-md rounded shadow-lg bg-gold">
      <div className="px-6 py-4">
        <div className="font-light text-xl mb-2">{props.title}</div>
        {props.text && (
          <button
            type="button"
            onClick={handleClick}
            className="inline-block px-6 py-2.5 bg-black text-white font-light text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {props.text}
          </button>
        )}
      </div>
    </div>
  );
}
