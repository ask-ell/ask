import { IServerProvider } from '@ask-ell/core';

import { createBackend } from './infra';

async function main(): Promise<void> {
  const backEnd: IServerProvider = await createBackend();
  await backEnd.listen(3000);
}

main();
