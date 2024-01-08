import { MapMarker } from "@prisma/client";
import { useSearchParams } from "@remix-run/react";
import { useStateContext } from "~/context/State.context";
import { StateIndexPage } from "~/routes/_index";

interface SidebarProps {
  markers: MapMarker[];
}

const Sidebar = ({ markers }: SidebarProps) => {
  const { state } = useStateContext<StateIndexPage>();
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region");
  const marker = searchParams.get("marker");

  const markerList = state?.filter?.length
    ? markers.filter((m) => state.filter?.includes(m.region))
    : markers;

  const handleClick = (id: MapMarker["id"]) => () => {
    setSearchParams((prev) => {
      prev.set("open", id);
      return prev;
    });
  };

  return (
    <div className="px-5 pb-5">
      {region ? (
        <h3>
          Знайдено {markers.length} оголошень на обраній території:{" "}
          {region.replace("Oblast", "")}
        </h3>
      ) : (
        <h3>Знайдено {markers.length} оголошень на всій території України</h3>
      )}
      {markers.length ? (
        <ul className="mt-4 flex flex-col gap-4">
          {markerList.map((m) => (
            <li
              key={m.id}
              className={`rounded-lg shadow ${
                marker === m.id ? "-order-1 border-2 border-gray-300" : ""
              }`}
            >
              <button
                type="button"
                className="text-left"
                onClick={handleClick(m.id)}
              >
                <img src={m.preview!} alt={m.name} className="rounded-t-lg" />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h5>{m.name}</h5>
                    <span>{new Date(m.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{m.description}</p>
                  <div>
                    <p>Мінімальна плата</p>
                    <p>
                      {m.minimalPriceUAH} <span>грн</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      {m.region}
                      {m?.city ? `, ${m?.city}` : ""}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-2 bg-black/30 text-white">
          Нажаль для обраного регіону не знайдено жодного оголошення
        </p>
      )}
    </div>
  );
};

export default Sidebar;
