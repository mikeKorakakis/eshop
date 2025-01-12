import { getCustomer } from '@/lib/actions';
import { User } from '@/types/types';
import React from 'react'

interface Props {
	user_id: number;
	className?: string;
}

export default function UserInfo({ user_id, className }: Props) {
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
	if (!user.avatar_url) return null;


	return (
		<h4 className="text-sm font-bold text-gray-900">{user.full_name}</h4>
	)
}
