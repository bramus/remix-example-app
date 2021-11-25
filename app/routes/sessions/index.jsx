import { Link, useLoaderData } from "remix";

// https://remix.run/docs/en/v1/api/conventions#loader
export let loader = async () => {
    const res = await fetch(`${process.env.API_BASEURL}/event/2018`);
    const sessions = await res.json();

    return {
        sessions,
    };
};

export default function SessionsOverview() {
  let data = useLoaderData();

  return (
    <ul>
        {data.sessions.map((session) => <li key={session.slug}><Link to={session.slug}>{session.title}</Link></li>)}
    </ul>
  );
}