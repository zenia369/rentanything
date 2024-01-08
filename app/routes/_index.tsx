import { MapMarker } from "@prisma/client";
import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ClientOnly } from "~/components/ClientOnly";

import Map from "~/components/Map.client";
import OpenMarker from "~/components/OpenMarker";
import Sidebar from "~/components/Sidebar";
import PageLayout from "~/components/layouts/PageLayout";
import { StateProvider } from "~/context/State.context";
import { getMarkerInfoById, getMarkersByQuery } from "~/models/map.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Rent anything | Kushnir" },
    { name: "description", content: "Welcome on rent anything site!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("region");
  const open = url.searchParams.get("open");

  const markers = await getMarkersByQuery(query ?? "");
  const openMarker = open ? await getMarkerInfoById(open) : null;

  return json({ markers, openMarker });
}

export interface StateIndexPage {
  filter: string[] | null;
}

const state: StateIndexPage = {
  filter: null,
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <>
      <StateProvider value={state}>
        <PageLayout>
          <ClientOnly fallback={<div className="w-full h-full bg-gray-300" />}>
            <Map />
          </ClientOnly>
          <Sidebar markers={loaderData.markers as unknown as MapMarker[]} />
        </PageLayout>
      </StateProvider>
      {loaderData?.openMarker ? (
        <OpenMarker marker={loaderData.openMarker as unknown as MapMarker} />
      ) : null}
    </>
  );
}
