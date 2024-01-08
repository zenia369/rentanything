import { MapMarker } from "@prisma/client";
import { FC } from "react";
import Modal from "./Modal";
import { useSearchParams } from "@remix-run/react";

interface OpenMarkerProps {
  marker: MapMarker;
}

const OpenMarker: FC<OpenMarkerProps> = ({ marker }) => {
  const [, setSearchParams] = useSearchParams();

  const handleClose = () => {
    setSearchParams((prev) => {
      prev.delete("open");
      return prev;
    });
  };

  return (
    <Modal handleClose={handleClose}>
      <div className="flex gap-2">
        <img src={marker.preview!} alt={marker.name} className="w-1/2" />
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">Назва: {marker.name}</h1>
          <p className="text-base">
            Опубліковано: {new Date(marker.createdAt).toLocaleDateString()}
          </p>
          <p className="text-base">
            Регіон: {marker.region}
            {marker?.city ? `, ${marker?.city}` : ""}
          </p>
          <p className="mt-auto">
            Мінімальна вартість: {marker.minimalPriceUAH} <span>грн</span>
          </p>
        </div>
      </div>
      <p className="mt-4 text-base">
        <span className="text-lg">Опис:</span>
        <br />
        {marker.description}
      </p>
    </Modal>
  );
};

export default OpenMarker;
