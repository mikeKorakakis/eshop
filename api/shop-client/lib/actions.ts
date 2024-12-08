'use server';

import { cookies } from 'next/headers';
import { SetHttpCookieType } from './types';
import { getDictionary } from './get-dictionary';
import { client } from './client';
import { Category, CreditCard, Product, Order, OrderItem, CartItem, User, Comment } from '@/types/types';
import { test_user_id } from './constants';

export async function setCookieServer(data: SetHttpCookieType) {
  const { name, value, path, httpOnly, secure, sameSite } = data;
  const days = data.days || 1;
  const date = new Date();

  const expires = date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  cookies().set({
    name,
    value,
    httpOnly: !!httpOnly,
    path: path || '/',
    sameSite,
    secure,
    expires
  });
}

export async function signup({ username, email, full_name, group_id, avatar_url }: User) {
	await client.POST('/users', {
	  body: {
		username,
		email,
		full_name,
		group_id,
		avatar_url
	  }
	});
  }

export async function getDictionaryServer({ lng }: { lng: 'el' | 'en' }) {
  const res = await getDictionary(lng);
  return res;
}

export async function getCustomers() {
  const res = await client.GET('/users');
  const customers = res.data?.data as User[];
  return customers;
}

export async function createCustomer({ username, email, full_name, group_id, avatar_url }: User) {
  await client.POST('/users', {
    body: {
      username,
      email,
      full_name,
      group_id,
      avatar_url
    }
  });
}

export async function updateCustomer({
  user_id,
  username,
  email,
  full_name,
  group_id,
  avatar_url
}: User) {
  await client.PUT('/users/{id}', {
    params: {
      path: { id: user_id! }
    },
    body: {
      user_id,
      username,
      email,
      full_name,
      group_id,
      avatar_url
    }
  });
}

export async function changePassword({
	user_id,
	newPassword
  }: {user_id: number, newPassword: string}) {
	const customer = await getCustomer({ customer_id: user_id });
	await client.PUT('/users/{id}', {
	  params: {
		path: { id: user_id! }
	  },
	  body: {
		  ...customer,
		password: newPassword,
	  }
	});
  }

export async function getCustomer({ customer_id }: { customer_id: number }) {
  const res = await client.GET(`/users/{id}`, {
    params: {
      path: { id: customer_id }
    }
  });
  const customer = res.data?.data as User;
  return customer;
}

export async function getOrder({ order_id }: { order_id: number }) {
  const ordersRes = await client.GET(`/orders/{id}`, {
    params: {
      path: { id: order_id }
    }
  });
  const order = ordersRes.data?.data as Order;
  return order;
}

export async function getOrders() {
  const ordersRes = await client.GET(`/orders`);
  const allOrders = ordersRes.data?.data as Order[];
  return allOrders;
}

export async function getUserOrders({ user_id }: { user_id: number }) {
  const ordersRes = await client.GET(`/orders`);
  const allOrders = ordersRes.data?.data as Order[];
  const orders = allOrders.filter((order) => (order.user_id = user_id));
  return orders;
}

export async function getProduct({ product_id }: { product_id: number }) {
  const res = await client.GET(`/products/{id}`, {
    params: {
      path: { id: product_id! }
    }
  });
  const product = res.data?.data as Product;
  return product;
}

export async function getProducts() {
  const res = await client.GET(`/products`);
  const products = res.data?.data as Product[];
  return products;
}

export async function createProduct({
  name,
  description,
  price,
  country_of_origin,
  category_id,
  image_url,
  owner_id
}: Product) {
  await client.POST('/products', {
    body: {
      name,
      description,
      price,
      country_of_origin,
      category_id,
      image_url,
      owner_id
    }
  });
}

export async function updateProduct({
  product_id,
  name,
  description,
  price,
  country_of_origin,
  category_id,
  image_url,
  owner_id
}: Product) {
  await client.PUT('/products/{id}', {
    params: {
      path: { id: product_id! }
    },
    body: {
      name,
      description,
      price,
      country_of_origin,
      category_id,
      image_url,
      owner_id
    }
  });
}

export async function deleteProduct({ product_id }: { product_id: number }) {
  await client.DELETE('/products/{id}', {
    params: {
      path: { id: product_id }
    }
  });
}

export async function getCategories() {
  const res = await client.GET('/categories');
  const categories = res.data?.data;
  return categories;
}

export async function getCategory({ category_id }: { category_id: number }) {
  const res = await client.GET('/categories/{id}', {
    params: {
      path: { id: category_id }
    }
  });
  const category = res.data?.data;
  return category;
}

export async function createCategory({ name, description, ordering, parent_id }: Category) {
  await client.POST('/categories', {
    body: {
      name,
      description,
      ordering,
      parent_id
    }
  });
}

export async function updateCategory({
  category_id,
  name,
  description,
  ordering,
  parent_id
}: Category) {
  await client.PUT('/categories/{id}', {
    body: {
      name,
      description,
      ordering,
      parent_id
    },
    params: {
      path: { id: category_id! }
    }
  });
}

export async function deleteCategory({ category_id }: { category_id: number }) {
  await client.DELETE('/categories/{id}', {
    params: {
      path: { id: category_id }
    }
  });
}

export async function getComments() {
  const res = await client.GET('/comments');
  const comments = res.data?.data;
  return comments;
}

export async function getComment({ comment_id }: { comment_id: number }) {
  const res = await client.GET('/comments/{id}', {
	params: {
		path: { id: comment_id }
	}
  });

  const comment = res.data?.data;
  return comment;
}

export async function deleteComment({ comment_id }: { comment_id: number }) {
  await client.DELETE('/comments/{id}', {
	params: {
		path: { id: comment_id }
	}
  });
}

export async function createComment({ product_id, user_id, content }: Comment) {
  await client.POST('/comments', {
	body: {
	  product_id,
	  user_id,
	  content,
	  created_date: new Date().toISOString()
	}
  });
}


export async function getOrderItems() {
  const orderProductsRes = await client.GET(`/order-items`);
  const allOrderProducts = orderProductsRes.data?.data as OrderItem[];
  return allOrderProducts;
}

export async function getOrderItemsByOrder({ order_id }: { order_id: number }) {
  const allOrderProducts = await getOrderItems();
  const orderProducts = allOrderProducts?.filter((x) => x.order_id === order_id);
  return orderProducts;
}

export async function getUserCreditCard({ user_id }: { user_id: number }) {
  const userBalanceRes = await client.GET('/credit-cards');
  const allUserBalance = userBalanceRes.data?.data as CreditCard[];
  // @ts-ignore
  const userBalance = allUserBalance.findLast((x) => x.user_id === user_id);

  return userBalance;
}

export async function updateCreditCardBalance({
  new_balance,
  user_id
}: {
  new_balance: number;
  user_id: number;
}) {
  const userCreditCard = await getUserCreditCard({ user_id });
  if (!userCreditCard || !userCreditCard.credit_card_id) throw 'credit card not found';
  await client.PUT('/credit-cards/{id}', {
    params: {
      path: { id: userCreditCard.credit_card_id }
    },
    body: {
      ...userCreditCard,
      balance: new_balance
    }
  });
}

export async function createOrder({
  user_id,
  total_amount,
  order_date,
  order_status
}: {
  user_id: number;
  total_amount: number;
  order_date: string;
  order_status: string;
}) {
  await client.POST('/orders', {
    body: {
      user_id: user_id,
      total_amount: total_amount,
      order_date: order_date,
      order_status: order_status
    }
  });
}

export async function createOrderProduct({
  product_id,
  price_at_purchase,
  quantity,
  order_id
}: {
  product_id: number;
  price_at_purchase: number;
  quantity: number;
  order_id: number;
}) {
  client.POST('/order-items', {
    body: {
      product_id: product_id,
      price_at_purchase: price_at_purchase,
      quantity: quantity,
      order_id: order_id
    }
  });
}

export async function makePurchase({
  user_id,
  card_number,
  total_amount,
  products
}: {
  user_id: number;
  card_number: string;
  total_amount: number;
  products: CartItem[];
}) {
  const userCreditCard = await getUserCreditCard({ user_id });
  if (!userCreditCard?.balance || card_number.replaceAll(' ', '') !== userCreditCard.card_number) {
    throw 'payment_failed';
    // toast.error(common_dictionary.PAYMENT_FAILED_ERROR)
    // return
  }
  if (userCreditCard?.balance < total_amount) {
    throw 'payment_declined';
    // toast.error(common_dictionary.PAYMENT_DECLINED_ERROR);
  }

  const new_balance = userCreditCard.balance - total_amount;

  await updateCreditCardBalance({
    user_id,
    new_balance
  });

  await createOrder({
    user_id: test_user_id,
    total_amount: total_amount,
    order_date: new Date().toISOString(),
    order_status: 'pending'
  });

  const orders = await getOrders();

  const order = orders[orders.length - 1];
  for (const product of products) {
    await createOrderProduct({
      product_id: product.id,
      price_at_purchase: product.price,
      quantity: product.quantity,
      order_id: order?.order_id!
    });
  }

  return order;
}
