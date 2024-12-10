'use server';

import { cookies } from 'next/headers';
import { SetHttpCookieType } from './types';
import { getDictionary } from './get-dictionary';
import { client } from './client';
import {
  Category,
  CreditCard,
  Product,
  Order,
  OrderItem,
  CartItem,
  User,
  Comment
} from '@/types/types';
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

export async function getToken() {
  const cookieStore = await cookies();
  const bearer = cookieStore.get('authToken')?.value as string | undefined;
  return bearer;
}

export async function signup({ username, email, full_name, password, group_id, avatar_url }: User) {
  console.log(username, email, full_name, group_id, avatar_url);
  const bearer = await getToken();
  const res = await client(bearer).POST('/register', {
    body: {
      username,
      email,
	  password,
      full_name,
      group_id,
      avatar_url
    }
  });

  console.log(res);

  const register_res = res.data as any[];
  const { access_token } = register_res;

  await setCookieServer({
    name: 'authToken',
    value: access_token,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    days: 1
  });
}

export async function me() {
  const bearer = await getToken();
  const res = await client(bearer).GET('/me');
  const user = res.data as User;
  return user;
}


export async function login({ username, password }: { username: string; password: string }) {
  const bearer = '';
  const res = await client(bearer).POST('/login', {
    body: {
      username: username,
      password: password
    }
  });

  const login_res = res.data as any[];
  const { access_token } = login_res;

  await setCookieServer({
    name: 'authToken',
    value: access_token,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    days: 1
  });
}

export async function logout() {
  const bearer = await getToken();
  const cookieStore = await cookies();
  await client(bearer).POST('/logout');
  cookieStore.delete('authToken');
}

export async function register({ username, email, full_name, group_id, avatar_url }: User) {
  const bearer = await getToken();
  const res = await client(bearer).POST('/register', {
    body: {
      username,
      email,
      full_name,
      group_id,
      avatar_url
    }
  });

  const login_res = res.data as any[];
  const { access_token } = login_res;

  await setCookieServer({
    name: 'authToken',
    value: access_token,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    days: 1
  });
}

export async function getDictionaryServer({ lng }: { lng: 'el' | 'en' }) {
  const res = await getDictionary(lng);
  return res;
}

export async function getCustomers() {
  const bearer = await getToken();
  const res = await client(bearer).GET('/users');
  const customers = res.data?.data as User[];
  console.log('customers',customers);
  return customers;
}

export async function createCustomer({ username, email, full_name, group_id, avatar_url }: User) {
  const bearer = await getToken();
  await client(bearer).POST('/users', {
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
  const bearer = await getToken();
  const res = await client(bearer).PUT('/users/{id}', {
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
  console.log(res);
}

export async function changePassword({
  user_id,
  newPassword
}: {
  user_id: number;
  newPassword: string;
}) {
  const customer = await getCustomer({ customer_id: user_id });
  const bearer = await getToken();
  await client(bearer).PUT('/users/{id}', {
    params: {
      path: { id: user_id! }
    },
    body: {
      ...customer,
      password: newPassword
    }
  });
}

export async function getCustomer({ customer_id }: { customer_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).GET(`/users/{id}`, {
    params: {
      path: { id: customer_id }
    }
  });
  const customer = res.data?.data as User;
  return customer;
}

export async function getOrder({ order_id }: { order_id: number }) {
  const bearer = await getToken();
  const ordersRes = await client(bearer).GET(`/orders/{id}`, {
    params: {
      path: { id: order_id }
    }
  });
  const order = ordersRes.data?.data as Order;
  return order;
}

export async function getOrders() {
  const bearer = await getToken();
  const ordersRes = await client(bearer).GET(`/orders`);
  const allOrders = ordersRes.data?.data as Order[];
  console.log('allOrders',allOrders);
  return allOrders;
}

export async function getUserOrders({ user_id }: { user_id: number }) {
  const bearer = await getToken();
  const ordersRes = await client(bearer).GET(`/orders`);
  const allOrders = ordersRes.data?.data as Order[];
  const orders = allOrders.filter((order) => (order.user_id = user_id));
  return orders;
}

export async function getProduct({ product_id }: { product_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).GET(`/products/{id}`, {
    params: {
      path: { id: product_id! }
    }
  });
  const product = res.data?.data as Product;
  return product;
}

export async function getProducts() {
  const bearer = await getToken();
  const res = await client(bearer).GET(`/products`);
  const products = res.data?.data as Product[];
  console.log('products',products);
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
  const bearer = await getToken();
  await client(bearer).POST('/products', {
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
  const bearer = await getToken();
  await client(bearer).PUT('/products/{id}', {
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
  const bearer = await getToken();
  await client(bearer).DELETE('/products/{id}', {
    params: {
      path: { id: product_id }
    }
  });
}

export async function getCategories() {
  const bearer = await getToken();
  const res = await client(bearer).GET('/categories');
  const categories = res.data?.data;
  console.log('categories',categories);
  return categories;
}

export async function getCategory({ category_id }: { category_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).GET('/categories/{id}', {
    params: {
      path: { id: category_id }
    }
  });
  const category = res.data?.data;
  return category;
}

export async function createCategory({ name, description, ordering, parent_id }: Category) {
  const bearer = await getToken();
  await client(bearer).POST('/categories', {
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
  const bearer = await getToken();
  await client(bearer).PUT('/categories/{id}', {
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
  const bearer = await getToken();
  await client(bearer).DELETE('/categories/{id}', {
    params: {
      path: { id: category_id }
    }
  });
}

export async function getComments() {
  const bearer = await getToken();
  const res = await client(bearer).GET('/comments');
  const comments = res.data?.data;
  console.log('comments',comments);
  return comments;
}

export async function getComment({ comment_id }: { comment_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).GET('/comments/{id}', {
    params: {
      path: { id: comment_id }
    }
  });

  const comment = res.data?.data;
  return comment;
}

export async function deleteComment({ comment_id }: { comment_id: number }) {
  const bearer = await getToken();
  await client(bearer).DELETE('/comments/{id}', {
    params: {
      path: { id: comment_id }
    }
  });
}

export async function createComment({ product_id, user_id, content }: Comment) {
  const bearer = await getToken();
  await client(bearer).POST('/comments', {
    body: {
      product_id,
      user_id,
      content,
      created_date: new Date().toISOString()
    }
  });
}

export async function getOrderItems() {
  const bearer = await getToken();
  const orderProductsRes = await client(bearer).GET(`/order-items`);
  const allOrderProducts = orderProductsRes.data?.data as OrderItem[];
  return allOrderProducts;
}

export async function getOrderItemsByOrder({ order_id }: { order_id: number }) {
  const allOrderProducts = await getOrderItems();
  const orderProducts = allOrderProducts?.filter((x) => x.order_id === order_id);
  return orderProducts;
}

export async function getUserCreditCard({ user_id }: { user_id: number }) {
  const bearer = await getToken();
  const userBalanceRes = await client(bearer).GET('/credit-cards');
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
  const bearer = await getToken();
  await client(bearer).PUT('/credit-cards/{id}', {
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
  const bearer = await getToken();
  await client(bearer).POST('/orders', {
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
  const bearer = await getToken();
  client(bearer).POST('/order-items', {
    body: {
      product_id: product_id,
      price_at_purchase: price_at_purchase,
      quantity: quantity,
      order_id: order_id
    }
  });
}

export async function makePurchase({
  card_number,
  total_amount,
  products
}: {
  card_number: string;
  total_amount: number;
  products: CartItem[];
}) {
  const user = await me();
  const user_id = user.user_id;
  if (!user_id) throw 'user_not_found';	
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
