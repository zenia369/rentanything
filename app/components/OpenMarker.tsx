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
      <div className="">{marker.name}</div>
    </Modal>
  );
};

export default OpenMarker;
