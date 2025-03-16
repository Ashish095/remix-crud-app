import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteItem } from "../data";

export const action = async ({
  params,
}: ActionFunctionArgs) => {
  invariant(params.id, "Missing Id in param");
  await deleteItem(params.id);
  return redirect("/");
};