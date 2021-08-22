import { NextApiRequest, NextApiResponse } from 'next';
import { getModels } from 'src/database/getModels';
import { getAsString } from 'src/getAsString';

export default async function models(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const make = getAsString(req.query.make);
  const models = await getModels(make);
  res.json(models);
}
