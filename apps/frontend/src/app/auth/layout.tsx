export const dynamic = 'force-dynamic';

import { ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import loadDynamic from 'next/dynamic';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ReturnUrlComponent />
      <div className="absolute left-0 top-0 z-[0] h-[100vh] w-[100vw] overflow-hidden bg-loginBg bg-contain bg-no-repeat bg-left-top" />
      <div className="relative z-[1] px-3 lg:pr-[100px] xs:mt-[70px] flex justify-center lg:justify-end items-center h-[100vh] w-[100vw] overflow-hidden">
        <div className="w-full max-w-lg h-[614px] flex flex-col bg-loginBox bg-no-repeat bg-contain">
          <div className="w-full relative">
            <div className="custom:fixed custom:text-left custom:left-[20px] custom:justify-start custom:top-[20px] absolute -top-[100px] text-textColor justify-center items-center w-full flex gap-[10px]">
              <Image
                src={isGeneralServerSide() ? '/postiz.svg' : '/logo.svg'}
                width={55}
                height={53}
                alt="Logo"
              />
              <div
                className={clsx(!isGeneralServerSide() ? 'mt-[12px]' : 'min-w-[80px]')}
              >
                {isGeneralServerSide() ? (
                  <svg width="143" height="46" viewBox="0 0 143 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9945 32.3969V37.5754H4.19736C3.55744 37.5754 3.03906 37.0623 3.03906 36.429V7.82227H9.06651V32.3969H20.9945Z" className="fill-[#000] dark:fill-[#fff]">
                    </path>
                    <path d="M30.4844 17.459V37.5751H24.582V17.459H30.4844Z" className="fill-[#000] dark:fill-[#fff]">
                    </path>
                    <path d="M56.715 24.3546V37.5743H50.8735V26.9837C50.8735 24.5386 48.8697 22.5571 46.3994 22.5571C45.1642 22.5571 44.047 23.0525 43.2373 23.854C42.4275 24.6554 41.927 25.7612 41.927 26.9837V37.5743H36.207V17.4582H41.8663L41.852 21.7203C41.852 19.2327 45.4019 17.0371 47.9134 17.0371H49.3201C53.4046 17.0371 56.715 20.3137 56.715 24.3546Z" className="fill-[#000] dark:fill-[#fff]">
                    </path>
                    <path d="M115.827 23.2773V37.5745H110.304V24.3053C110.304 22.6316 108.927 21.2763 107.235 21.287C106.082 21.294 105.04 21.7611 104.287 22.5113C103.533 23.2632 103.068 24.2982 103.068 25.4393V37.5745H97.5447V24.3053C97.5447 22.6316 96.1683 21.2763 94.4755 21.287C93.3226 21.294 92.2751 21.7611 91.5154 22.5113C90.7557 23.2632 90.2838 24.2982 90.2838 25.4393L90.2427 37.5745H84.6979V17.7697C84.6979 16.418 83.048 15.7422 82.0828 16.6976L72.3981 26.2815L82.6673 37.5745H75.4565L68.0634 28.992V37.5745H62.1289V6.72266H68.0634V22.9996L78.2218 12.945C82.6887 8.52196 90.3285 11.6694 90.3088 17.9237L90.2963 21.8956C90.2963 19.0011 92.6791 16.6604 95.6016 16.6604H96.381C99.0015 16.6604 101.27 18.1537 102.367 20.3263C103.297 18.3607 105.438 16.6604 108.361 16.6604H109.14C112.833 16.6604 115.827 19.6239 115.827 23.2773Z" className="fill-[#000] dark:fill-[#fff]">
                    </path>
                    <path d="M139.962 28.6608V26.8262C139.962 24.0184 138.813 21.4778 136.954 19.6378C135.096 17.7978 132.528 16.6602 129.691 16.6602C124.019 16.6602 119.422 21.2106 119.422 26.8262V28.2415C119.422 33.8465 124.012 38.3916 129.677 38.3916H131.135C133.145 38.3916 135.35 37.5848 137.056 36.2827C138.761 34.9805 139.962 33.1795 139.962 31.1908H134.664C134.664 32.8539 133.302 34.2021 131.622 34.2021H130.063C127.394 34.2021 125.233 32.0613 125.233 29.4216V28.6608H139.962ZM129.827 20.6197H130.131C131.391 20.6197 132.531 21.1257 133.357 21.9431C134.183 22.7605 134.694 23.891 134.694 25.1383H125.263C125.263 22.6419 127.307 20.6197 129.827 20.6197Z" className="fill-[#000] dark:fill-[#fff]">
                    </path>
                    <path d="M31.2182 10.435C31.2182 12.3263 29.5701 13.8602 27.5359 13.8602C25.5035 13.8602 23.8555 12.3263 23.8555 10.435C23.8555 8.54369 25.5035 7.00977 27.5359 7.00977C29.5701 7.00977 31.2182 8.54369 31.2182 10.435Z" className="fill-[#000] dark:fill-[#fff]">
                    </path>
                  </svg>
                ) : (
                  <div className="text-[40px]">LinkMe Scheduler</div>
                )}
              </div>
            </div>
          </div>
          <div className="p-[32px] w-full h-[660px] text-textColor">
            {children}
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex-1 flex justify-end">
              <div className="absolute top-0 bg-gradient-to-t from-customColor9 w-[1px] translate-x-[22px] h-full" />
            </div>
            <div>
              <div className="absolute right-0 bg-gradient-to-l from-customColor9 h-[1px] translate-y-[60px] w-full" />
            </div>
          </div>
          <div className="absolute top-0 bg-gradient-to-t from-customColor9 w-[1px] -translate-x-[22px] h-full" />
          <div className="absolute right-0 bg-gradient-to-l from-customColor9 h-[1px] -translate-y-[22px] w-full" />
        </div>
      </div>
    </>
  );
}
