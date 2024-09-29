import { z } from "zod";
import { PrivateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";



export const paymentRouter = router({
    createSession: PrivateProcedure
        .input(z.object({ productIds: z.array(z.string()) }))
        .mutation( async ({ ctx, input }) => {
            const { user } = ctx
            let { productIds } = input

            if (productIds.length === 0) {
                throw new TRPCError({code: 'BAD_REQUEST'})
            }

            const payload = await getPayloadClient()

            const { docs: products } =  await payload.find({
                collection: 'products',
                where: {
                    id: {
                        in: productIds,
                    }
                }
            })
        })
})