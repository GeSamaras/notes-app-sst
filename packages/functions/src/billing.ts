import Stripe from "stripe";
import { Config } from "sst/node/config";
import handler from "@notes/core/handler";
import { calculateCost } from "@notes/core/cost";

export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body || "{}");
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key
  const stripe = new Stripe(Config.sk_test_51OLO2QJ0rpAKf5RrjMxIS4cAaNKi3lv3N1B8mc4P6H4StyrCLVAbKgBGJId6UQouGPZ01tw6mluD3XGYCxNVa6kE00v5neujdR, {
    apiVersion: "2023-10-16",
  });

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });

  return JSON.stringify({ status: true });
});