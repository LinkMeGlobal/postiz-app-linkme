import { internalFetch } from '@gitroom/helpers/utils/internal.fetch';

export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
import Image from 'next/image';
import Link from 'next/link';
import { CommentsComponents } from '@gitroom/frontend/components/preview/comments.components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { VideoOrImage } from '@gitroom/react/helpers/video.or.image';
import { CopyClient } from '@gitroom/frontend/components/preview/copy.client';

dayjs.extend(utc);
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Linkme Scheduler' : 'Gitroom'} Preview`,
  description: '',
};

export default async function Auth({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: { share?: string };
}) {
  const post = await (await internalFetch(`/public/posts/${id}`)).json();

  if (!post.length) {
    return (
      <div className="text-white fixed left-0 top-0 w-full h-full flex justify-center items-center text-[20px]">
        Post not found
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto w-full max-w-[1346px] py-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="min-w-[55px]">
                <Link
                  href="/"
                  className="text-2xl flex items-center justify-center gap-[10px] text-textColor order-1"
                >
                  <div className="max-w-[55px]">
                    <Image
                      src={'/postiz.svg'}
                      width={55}
                      height={55}
                      alt="Logo"
                    />
                  </div>
                  <div>
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
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-400 flex items-center gap-[20px]">
            {!!searchParams?.share && (
              <div>
                <CopyClient />
              </div>
            )}
            <div className="flex-1">
              Publication Date:{' '}
              {dayjs
                .utc(post[0].createdAt)
                .local()
                .format('MMMM D, YYYY h:mm A')}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row text-white w-full max-w-[1346px] mx-auto">
        <div className="flex-1">
          <div className="gap-[20px] flex flex-col">
            {post.map((p: any, index: number) => (
              <div
                key={String(p.id)}
                className="relative px-4 py-4 bg-third border border-tableBorder"
              >
                <div className="flex space-x-3">
                  <div>
                    <div className="flex shrink-0 rounded-full h-30 w-30 relative">
                      <div className="w-[50px] h-[50px] z-[20]">
                        <img
                          className="w-full h-full relative z-[20] bg-black aspect-square rounded-full border-tableBorder"
                          alt={post[0].integration.name}
                          src={post[0].integration.picture}
                        />
                      </div>
                      <div className="absolute -right-[5px] -bottom-[5px] w-[30px] h-[30px] z-[20]">
                        <img
                          className="w-full h-full bg-black aspect-square rounded-full border-tableBorder"
                          alt={post[0].integration.providerIdentifier}
                          src={`/icons/platforms/${post[0].integration.providerIdentifier}.png`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-sm font-semibold">
                        {post[0].integration.name}
                      </h2>
                      <span className="text-sm text-gray-500">
                        @{post[0].integration.profile}
                      </span>
                    </div>
                    <div className="flex flex-col gap-[20px]">
                      <div
                        className="text-sm whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: p.content }}
                      />
                      <div className="flex w-full gap-[10px]">
                        {JSON.parse(p?.image || '[]').map((p: any) => (
                          <div
                            key={p.name}
                            className="flex-1 rounded-[10px] max-h-[500px] overflow-hidden"
                          >
                            <VideoOrImage isContain={true} src={p.path} autoplay={true} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-96 lg:flex-shrink-0">
          <div className="p-4 pt-0">
            <CommentsComponents postId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
