import { z } from "zod";
import { CreateRecordSchema } from "./schema";

export const transformCrateMarkerDTO = (
  marker: z.infer<typeof CreateRecordSchema>
) => ({
  ...marker,
  city: marker?.city ? marker.city : null,
  latLngTuple: marker?.latLngTuple?.filter(Boolean).length
    ? marker.latLngTuple.map((value) => Number(value))
    : [],
});
