'use server';

import { cookies } from 'next/headers';
import { OrderWithItemsAndUser, SetHttpCookieType } from './types';
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
import { activeSlideStatus } from 'yet-another-react-lightbox/*';

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

export async function signup({ username, email, full_name, password, group_id, media_id }: User) {
  const bearer = await getToken();
  const res = await client(bearer).POST('/register', {
    body: {
      username,
      email,
      password,
      full_name,
      group_id,
      media_id
    }
  });

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

  return access_token;
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

  const login_res = res as any;
  const { access_token } = login_res.data;

  await setCookieServer({
    name: 'authToken',
    value: access_token,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    days: 1
  });
  return access_token;
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
  const customers = res.data as User[];
  return customers;
}

export async function createCustomer({
  username,
  email,
  password,
  full_name,
  group_id,
  avatar_url
}: User) {
  const bearer = await getToken();
  const res = await client(bearer).POST('/users', {
    body: {
      username,
      email,
      password,
      full_name,
      group_id,
      avatar_url
    }
  });
  return res.response.status;
}

export async function updateCustomer({
  user_id,
  username,
  password,
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
      password,
      email,
      full_name,
      group_id,
      avatar_url
    }
  });
  return res.response.status;
}

export async function deleteCustomer({ user_id }: { user_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).DELETE('/users/{id}', {
    params: {
      path: { id: user_id }
    }
  });
  return res.response.status;
}

export async function changePassword({
  currentPassword,
  newPassword
}: {
  currentPassword: string;
  newPassword: string;
}) {
  const bearer = await getToken();
  const res = await client(bearer).PUT('/change-password', {
    body: {
      current_password: currentPassword,
      new_password: newPassword
    }
  });
  if (!(res.response.status === 200)) throw new Error('password_error');
}

export async function changeOtherUserPassword({
  user_id,
  newPassword
}: {
  user_id: number;
  newPassword: string;
}) {
  const customer = await getCustomer({ customer_id: user_id });
  const bearer = await getToken();
  const res = await client(bearer).PUT('/users/{id}', {
    params: {
      path: { id: user_id! }
    },
    body: {
      ...customer,
      password: newPassword
    }
  });
  if (!(res.response.status === 200)) throw new Error('password_error');
}

export async function getCustomer({ customer_id }: { customer_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).GET(`/users/{id}`, {
    params: {
      path: { id: customer_id }
    }
  });
  const customer = res.data as User;
  return customer;
}

export async function getOrder({ order_id }: { order_id: number }) {
  const bearer = await getToken();
  const ordersRes = await client(bearer).GET(`/orders/{id}`, {
    params: {
      path: { id: order_id }
    }
  });
  const order = ordersRes.data as Order;
  return order;
}

export async function getOrders() {
  const bearer = await getToken();
  const ordersRes = await client(bearer).GET(`/orders`);
  const allOrders = ordersRes.data as OrderWithItemsAndUser[];
  return allOrders;
}

export async function getUserOrders({ user_id }: { user_id: number }) {
  const bearer = await getToken();
  const ordersRes = await client(bearer).GET(`/users/{id}/orders`, {
    params: {
      path: { id: user_id }
    }
  });
  const orders = ordersRes.data as Order[];
  return orders;
}
export async function getCurrentUserOrders() {
  const bearer = await getToken();
  const ordersRes = await client(bearer).GET(`/me/orders`);
  const orders = ordersRes.data as OrderWithItemsAndUser[];
  return orders;
}

export async function getProduct({ product_id }: { product_id: number }) {
  const bearer = await getToken();
  const res = await client('bearer').GET(`/products/{id}`, {
    params: {
      path: { id: product_id! }
    }
  });
  const product = res.data as Product;
  return product;
}

export async function getProducts() {
  const bearer = await getToken();
  const res = await client(bearer).GET(`/products`);
  const products = res.data as Product[];
  return products;
}

export async function getProductsByCategory({ category_id }: { category_id: number }) {
  const bearer = await getToken();
  // @ts-ignore
  const res = await client(bearer).GET(`/categories/{id}/products`, {
    params: {
      path: { id: category_id }
    }
  });
  const productsByCategory = res.data as Product[];
  return productsByCategory;
}

export async function getProductComments({ product_id }: { product_id: number }) {
  const bearer = await getToken();
  // @ts-ignore
  const res = await client(bearer).GET(`/products/{id}/comments`, {
    params: {
      path: { id: product_id }
    }
  });
  const comments = res.data as Comment[];
  return comments;
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
  const res = await client(bearer).POST('/products', {
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
  return res.response.status;
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
  const res = await client(bearer).PUT('/products/{id}', {
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
  return res.response.status;
}

export async function deleteProduct({ product_id }: { product_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).DELETE('/products/{id}', {
    params: {
      path: { id: product_id }
    }
  });
  return res.response.status;
}

export async function getCategories() {
  const bearer = await getToken();
  const res = await client(bearer).GET('/categories');
  const categories = res.data as Category[];
  return categories;
}

export async function getCategory({ category_id }: { category_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).GET('/categories/{id}', {
    params: {
      path: { id: category_id }
    }
  });
  const category = res.data as Category;
  return category;
}

export async function createCategory({ name, description, ordering, parent_id, media_id }: Category) {
  const bearer = await getToken();
  const res = await client(bearer).POST('/categories', {
    body: {
      name,
      description,
      ordering,
      parent_id,
	  media_id
    }
  });
  return res.response.status;
}

export async function updateCategory({
  category_id,
  name,
  description,
  ordering,
  parent_id,
  media_id
}: Category) {
  const bearer = await getToken();
  const res = await client(bearer).PUT('/categories/{id}', {
    body: {
      name,
      description,
      ordering,
      parent_id,
	  media_id
    },
    params: {
      path: { id: category_id! }
    }
  });
  return res.response.status;
}

export async function deleteCategory({ category_id }: { category_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).DELETE('/categories/{id}', {
    params: {
      path: { id: category_id }
    }
  });
  return res.response.status;
}

export async function getComments() {
  const bearer = await getToken();
  const res = await client(bearer).GET('/comments');
  const comments = res.data;
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
  const res = await client(bearer).DELETE('/comments/{id}', {
    params: {
      path: { id: comment_id }
    }
  });
  return res.response.status;
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
  const allOrderProducts = orderProductsRes.data as OrderItem[];
  return allOrderProducts;
}

export async function getOrderItemsByOrder({ order_id }: { order_id: number }) {
  const bearer = await getToken();

  const orderProductsRes = await client(bearer).GET(`/orders/{id}/order-items`, {
    params: {
      path: { id: order_id }
    }
  });

  const orderProducts = orderProductsRes.data as OrderItem[];
  return orderProducts;
}

export async function getUserCreditCard({ user_id }: { user_id: number }) {
  const bearer = await getToken();
  // @ts-ignore
  const userBalanceRes = await client(bearer).GET('/users/{user_id}/credit_card', {
    params: {
      path: { user_id }
    }
  });
  return userBalanceRes.data as CreditCard;
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
  const res = await client(bearer).POST('/orders', {
    body: {
      user_id: user_id,
      total_amount: total_amount,
      order_date: order_date,
      order_status: order_status
    }
  });
  return res.data as Order;
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
  const res = await client(bearer).POST('/order-items', {
    body: {
      product_id: product_id,
      price_at_purchase: price_at_purchase,
      quantity: quantity,
      order_id: order_id
    }
  });
}

export async function makePurchase2({
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
    throw new Error('payment_failed');
    // toast.error(common_dictionary.PAYMENT_FAILED_ERROR)
    // return
  }

  if (userCreditCard?.balance < total_amount) {
    throw new Error('payment_declined');
    // toast.error(common_dictionary.PAYMENT_DECLINED_ERROR);
  }

  const new_balance = userCreditCard.balance - total_amount;

  await updateCreditCardBalance({
    user_id,
    new_balance
  });

  const order = await createOrder({
    user_id: user_id,
    total_amount: total_amount,
    order_date: new Date().toISOString(),
    order_status: 'pending'
  });

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

export async function makePurchase({
  card_number,
  total_amount,
  products
}: {
  card_number: string;
  total_amount: number;
  products: CartItem[];
}) {
  const bearer = await getToken();
  const mappedProducts = products.map((product) => ({
    product_id: product.id,
    quantity: product.quantity
  }));
  const res = await client(bearer).POST('/make-purchase', {
    body: {
      card_number,
      total_amount,
      products: mappedProducts
    }
  });

  const order = res.data as Order;
  if (!order) throw new Error('payment_failed');
  return order;
}
