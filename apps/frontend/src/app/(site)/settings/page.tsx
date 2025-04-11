import { SettingsPopup } from '@gitroom/frontend/components/layout/settings.component';

export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';

export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Linkme Scheduler' : 'LinkMe Scheduler'} Settings`,
  description: '',
};
export default async function Index({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  return <SettingsPopup />;
}
