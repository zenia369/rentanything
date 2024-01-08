import { useForm, useFieldList, conform } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import {
  ActionFunctionArgs,
  json,
  redirect,
  unstable_parseMultipartFormData as parseMultipartFormData,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_composeUploadHandlers as composeUploadHandlers,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { IoMdSave } from "react-icons/io";
import { UploadApiResponse } from "cloudinary";
import Input, { ErrorList, inputStyles } from "~/components/Input";
import useIsSubmitting from "~/hooks/useIsSubmitting";
import { createMarker } from "~/models/map.server";
import { CreateRecordSchema, MAX_UPLOAD_SIZE } from "~/utils/schema";
import { transformCrateMarkerDTO } from "~/utils/transfrom";
import regions from "~/assets/regions.json";
import { uploadImage } from "~/utils/cloudinary.server";

export async function action({ request }: ActionFunctionArgs) {
  const uploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "preview") {
        return undefined;
      }

      try {
        const uploadedImage = await uploadImage(data);
        return (uploadedImage as UploadApiResponse).secure_url;
      } catch (error) {
        return null;
      }
    },
    createMemoryUploadHandler({
      maxPartSize: MAX_UPLOAD_SIZE,
    })
  );

  const formData = await parseMultipartFormData(request, uploadHandler);

  const submission = parse(formData, {
    schema: CreateRecordSchema,
  });

  if (submission.intent !== "submit") {
    return json({ status: "idle", submission } as const);
  }

  if (!submission.value) {
    return json({ status: "error", submission } as const, {
      status: 400,
    });
  }

  try {
    const marker = submission.value;

    await createMarker(transformCrateMarkerDTO(marker));

    return redirect("/");
  } catch (error) {
    throw new Response("Error while creating marker", { status: 500 });
  }
}

export default function Page() {
  const actionData = useActionData<typeof action>();
  const isSubmitting = useIsSubmitting();

  const [form, fields] = useForm({
    id: "create-marker",
    constraint: getFieldsetConstraint(CreateRecordSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: CreateRecordSchema });
    },
    defaultValue: {
      latLngTuple: [null, null],
    },
  });
  const latLngTuple = useFieldList(form.ref, fields.latLngTuple);

  return (
    <main className="container mx-auto">
      <h1 className="text-center mt-6 text-2xl font-bold">
        Створити оголошення
      </h1>
      <Form
        method="POST"
        encType="multipart/form-data"
        {...form.props}
        className="flex flex-col gap-2 max-w-md mx-auto mt-4"
      >
        <button className="hidden" type="submit" />
        <Input {...conform.input(fields.name)} placeholder={fields.name.name} />
        <ErrorList id={fields.name.id} errors={fields.name.errors} />
        <Input
          {...conform.input(fields.region)}
          placeholder={fields.region.name}
          list="regions"
        />
        <datalist id="regions">
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </datalist>
        <ErrorList id={fields.region.id} errors={fields.region.errors} />
        <Input
          {...conform.input(fields.minimalPriceUAH, { type: "number" })}
          placeholder="Minimal price UAH"
        />
        <ErrorList
          id={fields.minimalPriceUAH.id}
          errors={fields.minimalPriceUAH.errors}
        />
        <textarea
          {...conform.input(fields.description)}
          className={`${inputStyles} h-auto`}
          placeholder={fields.description.name}
          rows={3}
        />
        <ErrorList
          id={fields.description.id}
          errors={fields.description.errors}
        />
        <Input
          {...conform.input(fields.city)}
          placeholder={`${fields.city.name} (optional)`}
        />
        <ErrorList id={fields.city.id} errors={fields.city.errors} />
        <fieldset className="flex justify-between gap-2 items-center">
          {latLngTuple.map((item, idx) => (
            <div key={item.key} className="flex-1">
              <Input
                {...conform.input(item, { type: "number" })}
                placeholder={`${idx === 0 ? "Lat" : "Lng"} (optional)`}
                className="w-full"
                step={0.00001}
              />
              <ErrorList id={item.id} errors={item.errors} />
            </div>
          ))}
        </fieldset>
        <div className={`${inputStyles} h-auto`}>
          <p className="text-gray-600 opacity-70 capitalize">
            Select preview (optional)
          </p>
          <input
            {...conform.input(fields.preview, { type: "file" })}
            accept="image/png, image/jpeg"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 bg-green-400 py-2 text-white text-center rounded disabled:bg-green-200 flex gap-1 items-center justify-center"
        >
          <IoMdSave />
          Зберегти
        </button>
      </Form>
    </main>
  );
}
