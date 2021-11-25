import { json, useLoaderData, useCatch } from "remix";

// https://remix.run/docs/en/v1/api/conventions#loader
export let loader = async ({ params }) => {
    const res = await fetch(`${process.env.API_BASEURL}/session/${params.slug}`);

    if (!res.ok) {
        throw json("Not Found", { status: 404 }); // CatchBoundary (if any) will handle
    }

    const session = await res.json();
    
    return { session };
};

export default function ParamDemo() {
    let data = useLoaderData();
    return (
        <>
            <h1>{data.session.title}</h1>
            <p>{data.session.description}</p>
            <p>By {data.session.speaker.name}</p>
        </>
    );
}

export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 404:
      return <div>Invalid Session</div>;
  }

  // You could also `throw new Error("Unknown status in catch boundary")`.
  // This will be caught by the closest `ErrorBoundary`.
  return (
    <div>Something went wrong</div>
  );
}