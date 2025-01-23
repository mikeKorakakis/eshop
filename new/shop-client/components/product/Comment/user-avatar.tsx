import { getCustomer } from '@/lib/actions';
import { formatImage } from '@/lib/helpers';
import { User } from '@/types';
import React from 'react'
import Image from 'next/image';
import clsx from 'clsx';

interface Props {
	user_id: number;
	className?: string;
}

export default function UserAvatar({ user_id, className }: Props) {
	const [user, setUser] = React.useState<User>();

	React.useEffect(() => {
		// fetch user by user_id
		const getCust = async () => {
			const user = await getCustomer({ customer_id: user_id });
			if (!user) return;
			setUser(user);
		}
		getCust();
	}, [user_id]);

	if (!user) return null;
	if (!user?.media?.path) return null;


	return (
		<Image src={formatImage(user?.media?.path)} alt={user.full_name!} className={clsx("size-12 rounded-full", className)} width={400} height={400} />
	)
}
