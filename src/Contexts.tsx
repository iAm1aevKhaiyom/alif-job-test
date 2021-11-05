// -----------------------------------------------------------------------------
import { PropsWithChildren } from 'react';
import { API } from './API';
import { AwaitedType, createCtx } from './utils';

// -----------------------------------------------------------------------------
const [MeContext, MeProvider] =
  createCtx<AwaitedType<ReturnType<typeof API.whoAmI>>>(null);

// -----------------------------------------------------------------------------
const [IsModalVisibleContext, IsModalVisibleProvider] = createCtx(false);

// -----------------------------------------------------------------------------
export const AllContextProviders = ({ children }: PropsWithChildren<{}>) => (
  <IsModalVisibleProvider>
    <MeProvider>{children}</MeProvider>
  </IsModalVisibleProvider>
);

// -----------------------------------------------------------------------------
export { IsModalVisibleContext, MeContext };
