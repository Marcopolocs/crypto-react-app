import { z } from 'zod';

const cryptoCoinPriceDataSchema = z.object({
  market_cap: z.number(),
  percent_change_1h: z.number().transform((data) => +data.toFixed(2)),
  percent_change_7d: z.number().transform((data) => +data.toFixed(2)),
  percent_change_24h: z.number().transform((data) => +data.toFixed(2)),
  percent_change_30d: z.number(),
  percent_change_60d: z.number(),
  percent_change_90d: z.number(),
  price: z.number(),
  volume_24h: z.number(),
  volume_change_24h: z.number(),
});

const cryptoGeneralDataSchema = z
  .object({
    circulating_supply: z.number(),
    cmc_rank: z.number(),
    symbol: z.string(),
    total_supply: z.number(),
    id: z.number(),
    max_supply: z.number().nullable(),
    name: z.string(),
    quote: z.object({
      USD: cryptoCoinPriceDataSchema,
    }),
    slug: z.string(),
  })
  .transform((generalData) => ({
    name: generalData.name,
    symbol: generalData.symbol,
    slug: generalData.slug,
    circulating_supply: generalData.circulating_supply,
    total_supply: generalData.total_supply,
    cmc_rank: generalData.cmc_rank,
    price: generalData.quote.USD.price,
    market_cap: generalData.quote.USD.market_cap,
    percent_change_1h: generalData.quote.USD.percent_change_1h,
    percent_change_7d: generalData.quote.USD.percent_change_7d,
    percent_change_24h: generalData.quote.USD.percent_change_24h,
  }));

export const cryptoArraySchema = z.array(cryptoGeneralDataSchema);

export type ICryptoListData = z.infer<typeof cryptoGeneralDataSchema>;
