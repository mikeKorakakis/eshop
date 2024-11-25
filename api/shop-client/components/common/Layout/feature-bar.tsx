'use client';

import { Dictionary } from '@/lib/get-dictionary';
import { useAcceptCookies } from '@/lib/hooks/use-accept-cookies';
import Link from 'next/link';
import FeatureBar from '@/components/common/FeatureBar';
import { LINKS } from '@/lib/constants';
import Button from '@/components/ui/Button';

const { link_privacy_policy } = LINKS;

type Props = {
  dictionary: Dictionary;
};

export default function FeatureBarComp({ dictionary }: Props) {
  const common_dictionary  = dictionary.common;
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  return (
    <FeatureBar
      title={
        <span>
          {common_dictionary.cookie_prompt_1}{' '}
          <Link href={link_privacy_policy} className="underline">
            {common_dictionary.privacy_policy}
          </Link>{' '}
          {common_dictionary.cookie_prompt_2}
        </span>
      }
      hide={acceptedCookies}
      action={
        <div className="w-full md:w-fit">
          <Button
            variant="slim"
            className="h-10 w-full md:ml-4 md:w-min"
            onClick={() => onAcceptCookies()}
          >
            {common_dictionary.cookie_button}
          </Button>
        </div>
      }
    />
  );
}
