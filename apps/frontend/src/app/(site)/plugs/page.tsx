import { Plugs } from '@gitroom/frontend/components/plugs/plugs';

export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';

export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Linkme Scheduler' : 'LinkMe Scheduler'} Plugs`,
  description: '',
};

export default async function Index() {
  return (
    <>
      <Plugs />
    </>
  );
}
