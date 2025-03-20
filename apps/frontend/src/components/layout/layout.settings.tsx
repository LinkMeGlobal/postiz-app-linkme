'use client';

import { ReactNode, useCallback, useEffect } from 'react';
import { Title } from '@gitroom/frontend/components/layout/title';
import { ContextWrapper } from '@gitroom/frontend/components/layout/user.context';
import { TopMenu } from '@gitroom/frontend/components/layout/top.menu';
import { MantineWrapper } from '@gitroom/react/helpers/mantine.wrapper';
import { ToolTip } from '@gitroom/frontend/components/layout/top.tip';
import { ShowMediaBoxModal } from '@gitroom/frontend/components/media/media.component';
import Image from 'next/image';
import { Toaster, useToaster } from '@gitroom/react/toaster/toaster';
import { ShowPostSelector } from '@gitroom/frontend/components/post-url-selector/post.url.selector';
import { OrganizationSelector } from '@gitroom/frontend/components/layout/organization.selector';
import NotificationComponent from '@gitroom/frontend/components/notifications/notification.component';
import Link from 'next/link';
import useSWR from 'swr';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import { ShowLinkedinCompany } from '@gitroom/frontend/components/launches/helpers/linkedin.component';
import { SettingsComponent } from '@gitroom/frontend/components/layout/settings.component';
import { Onboarding } from '@gitroom/frontend/components/onboarding/onboarding';
import { Support } from '@gitroom/frontend/components/layout/support';
import { ContinueProvider } from '@gitroom/frontend/components/layout/continue.provider';
import { CopilotKit } from '@copilotkit/react-core';
import { Impersonate } from '@gitroom/frontend/components/layout/impersonate';
import clsx from 'clsx';
import { BillingComponent } from '@gitroom/frontend/components/billing/billing.component';
import dynamic from 'next/dynamic';
import { NewSubscription } from '@gitroom/frontend/components/layout/new.subscription';
import { useVariables } from '@gitroom/react/helpers/variable.context';
const ModeComponent = dynamic(
  () => import('@gitroom/frontend/components/layout/mode.component'),
  { ssr: false }
);

import { extend } from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { CheckPayment } from '@gitroom/frontend/components/layout/check.payment';

extend(utc);
extend(weekOfYear);
extend(isoWeek);
extend(isBetween);

export const LayoutSettings = ({ children }: { children: ReactNode }) => {
  const fetch = useFetch();
  const { isGeneral } = useVariables();
  const { backendUrl, billingEnabled } = useVariables();
  const searchParams = useSearchParams();
  const load = useCallback(async (path: string) => {
    return await (await fetch(path)).json();
  }, []);

  const { data: user, mutate } = useSWR('/user/self', load, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
  });

  if (!user) return null;

  return (
    <ContextWrapper user={user}>
      <CopilotKit
        credentials="include"
        runtimeUrl={backendUrl + '/copilot/chat'}
      >
        <MantineWrapper>
          {user.tier === 'FREE' && searchParams.get('check') && (
            <CheckPayment check={searchParams.get('check')!} mutate={mutate} />
          )}
          <ToolTip />
          <ShowMediaBoxModal />
          <ShowLinkedinCompany />
          <Toaster />
          <ShowPostSelector />
          <NewSubscription />
          {user.tier !== 'FREE' && <Onboarding />}
          <Support />
          <ContinueProvider />
          <div className="min-h-[100vh] w-full max-w-[1440px] mx-auto bg-primary px-6 text-textColor flex flex-col">
            {user?.admin && <Impersonate />}
            <nav className="flex items-center justify-between">
              <Link
                href="/"
                className="text-2xl flex items-center gap-[10px] text-textColor order-1"
              >
                <div className="min-w-[55px]">
                  <Image
                    src={isGeneral ? '/postiz.svg' : '/logo.svg'}
                    width={55}
                    height={53}
                    alt="Logo"
                  />
                </div>
                <div
                  className={clsx(!isGeneral ? 'mt-[12px]' : 'min-w-[80px]')}
                >
                  {isGeneral ? (
                    <svg width="143" height="46" viewBox="0 0 143 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.9945 32.3969V37.5754H4.19736C3.55744 37.5754 3.03906 37.0623 3.03906 36.429V7.82227H9.06651V32.3969H20.9945Z" className="fill-[#000] dark:fill-[#fff]"></path><path d="M30.4844 17.459V37.5751H24.582V17.459H30.4844Z" className="fill-[#000] dark:fill-[#fff]"></path><path d="M56.715 24.3546V37.5743H50.8735V26.9837C50.8735 24.5386 48.8697 22.5571 46.3994 22.5571C45.1642 22.5571 44.047 23.0525 43.2373 23.854C42.4275 24.6554 41.927 25.7612 41.927 26.9837V37.5743H36.207V17.4582H41.8663L41.852 21.7203C41.852 19.2327 45.4019 17.0371 47.9134 17.0371H49.3201C53.4046 17.0371 56.715 20.3137 56.715 24.3546Z" className="fill-[#000] dark:fill-[#fff]"></path><path d="M115.827 23.2773V37.5745H110.304V24.3053C110.304 22.6316 108.927 21.2763 107.235 21.287C106.082 21.294 105.04 21.7611 104.287 22.5113C103.533 23.2632 103.068 24.2982 103.068 25.4393V37.5745H97.5447V24.3053C97.5447 22.6316 96.1683 21.2763 94.4755 21.287C93.3226 21.294 92.2751 21.7611 91.5154 22.5113C90.7557 23.2632 90.2838 24.2982 90.2838 25.4393L90.2427 37.5745H84.6979V17.7697C84.6979 16.418 83.048 15.7422 82.0828 16.6976L72.3981 26.2815L82.6673 37.5745H75.4565L68.0634 28.992V37.5745H62.1289V6.72266H68.0634V22.9996L78.2218 12.945C82.6887 8.52196 90.3285 11.6694 90.3088 17.9237L90.2963 21.8956C90.2963 19.0011 92.6791 16.6604 95.6016 16.6604H96.381C99.0015 16.6604 101.27 18.1537 102.367 20.3263C103.297 18.3607 105.438 16.6604 108.361 16.6604H109.14C112.833 16.6604 115.827 19.6239 115.827 23.2773Z" className="fill-[#000] dark:fill-[#fff]"></path><path d="M139.962 28.6608V26.8262C139.962 24.0184 138.813 21.4778 136.954 19.6378C135.096 17.7978 132.528 16.6602 129.691 16.6602C124.019 16.6602 119.422 21.2106 119.422 26.8262V28.2415C119.422 33.8465 124.012 38.3916 129.677 38.3916H131.135C133.145 38.3916 135.35 37.5848 137.056 36.2827C138.761 34.9805 139.962 33.1795 139.962 31.1908H134.664C134.664 32.8539 133.302 34.2021 131.622 34.2021H130.063C127.394 34.2021 125.233 32.0613 125.233 29.4216V28.6608H139.962ZM129.827 20.6197H130.131C131.391 20.6197 132.531 21.1257 133.357 21.9431C134.183 22.7605 134.694 23.891 134.694 25.1383H125.263C125.263 22.6419 127.307 20.6197 129.827 20.6197Z" className="fill-[#000] dark:fill-[#fff]"></path><path d="M31.2182 10.435C31.2182 12.3263 29.5701 13.8602 27.5359 13.8602C25.5035 13.8602 23.8555 12.3263 23.8555 10.435C23.8555 8.54369 25.5035 7.00977 27.5359 7.00977C29.5701 7.00977 31.2182 8.54369 31.2182 10.435Z" className="fill-[#000] dark:fill-[#fff]"></path></svg>
                  ) : (
                    'Gitroom'
                  )}
                </div>
              </Link>
              {user?.orgId &&
                (user.tier !== 'FREE' || !isGeneral || !billingEnabled) ? (
                <TopMenu />
              ) : (
                <></>
              )}
              <div
                id="systray-buttons"
                className="flex items-center justify-self-end gap-[8px] order-2 md:order-3"
              >
                <ModeComponent />
                <SettingsComponent />
                <NotificationComponent />
                <OrganizationSelector />
              </div>
            </nav>
            <div className="flex-1 flex">
              <div className="flex-1 rounded-3xl px-0 py-[17px] flex flex-col">
                {user.tier === 'FREE' && isGeneral && billingEnabled ? (
                  <>
                    <div className="text-center mb-[20px] text-xl [@media(max-width:1024px)]:text-xl">
                      <h1 className="text-3xl [@media(max-width:1024px)]:text-xl">
                        Join 1000+ Entrepreneurs Who Use Linkme Scheduler
                        <br />
                        To Manage All Your Social Media Channels
                      </h1>
                      <br />
                      {user?.allowTrial && (
                        <div className="table mx-auto">
                          <div className="flex gap-[5px] items-center">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M16.2806 9.21937C16.3504 9.28903 16.4057 9.37175 16.4434 9.46279C16.4812 9.55384 16.5006 9.65144 16.5006 9.75C16.5006 9.84856 16.4812 9.94616 16.4434 10.0372C16.4057 10.1283 16.3504 10.211 16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.289 9.14964 15.3718 9.09432 15.4628 9.05658C15.5538 9.01884 15.6514 8.99941 15.75 8.99941C15.8486 8.99941 15.9462 9.01884 16.0372 9.05658C16.1283 9.09432 16.211 9.14964 16.2806 9.21937ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z"
                                  fill="#06ff00"
                                />
                              </svg>
                            </div>
                            <div>100% no-risk trial</div>
                          </div>
                          <div className="flex gap-[5px] items-center">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M16.2806 9.21937C16.3504 9.28903 16.4057 9.37175 16.4434 9.46279C16.4812 9.55384 16.5006 9.65144 16.5006 9.75C16.5006 9.84856 16.4812 9.94616 16.4434 10.0372C16.4057 10.1283 16.3504 10.211 16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.289 9.14964 15.3718 9.09432 15.4628 9.05658C15.5538 9.01884 15.6514 8.99941 15.75 8.99941C15.8486 8.99941 15.9462 9.01884 16.0372 9.05658C16.1283 9.09432 16.211 9.14964 16.2806 9.21937ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z"
                                  fill="#06ff00"
                                />
                              </svg>
                            </div>
                            <div>Pay nothing for the first 7 days</div>
                          </div>
                          <div className="flex gap-[5px] items-center">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M16.2806 9.21937C16.3504 9.28903 16.4057 9.37175 16.4434 9.46279C16.4812 9.55384 16.5006 9.65144 16.5006 9.75C16.5006 9.84856 16.4812 9.94616 16.4434 10.0372C16.4057 10.1283 16.3504 10.211 16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.289 9.14964 15.3718 9.09432 15.4628 9.05658C15.5538 9.01884 15.6514 8.99941 15.75 8.99941C15.8486 8.99941 15.9462 9.01884 16.0372 9.05658C16.1283 9.09432 16.211 9.14964 16.2806 9.21937ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z"
                                  fill="#06ff00"
                                />
                              </svg>
                            </div>
                            <div>Cancel anytime, hassle-free</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <BillingComponent />
                  </>
                ) : (
                  <>
                    <Title />
                    <div className="flex flex-1 flex-col">{children}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </MantineWrapper>
      </CopilotKit>
    </ContextWrapper>
  );
};
