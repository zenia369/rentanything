import { useFormAction, useNavigation } from "@remix-run/react";

const useIsSubmitting = ({
  formAction,
  formMethod = "POST",
}: {
  formAction?: string;
  formMethod?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
} = {}) => {
  const contextualFormAction = useFormAction();
  const navigation = useNavigation();
  return (
    navigation.state === "submitting" &&
    navigation.formAction === (formAction ?? contextualFormAction) &&
    navigation.formMethod === formMethod
  );
};

export default useIsSubmitting;
