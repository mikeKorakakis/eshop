'use server';

import { cookies } from 'next/headers';
import {
  ChangePasswordInput,
  OrderWithItemsAndUser,
  SetHttpCookieType,
  ShippingMethod,
  SignupInput,
  SignupRes,
  UpdateCustomerInput
} from '@/types';
import { getDictionary } from './get-dictionary';
import { client } from './client';
import { Category, CreditCard, Product, Order, OrderItem, CartItem, User, Comment } from '@/types';

export async function setCookieServer(data: SetHttpCookieType) {
  const { name, value, httpOnly, secure, sameSite } = data;
  const days = data.days || 1;
  const date = new Date();

  const expires = date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  cookies().set({
    name,
    value,
    httpOnly: !!httpOnly,
    path: '/',
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

export async function login({ username, password }: { username: string; password: string }) {
  const res = await client(undefined)
    .post('login', {
      json: {
        username,
        password
      }
    })
    .json<SignupRes>();

  const { access_token } = res;
  if (!access_token) return false;

  await setCookieServer({
    name: 'authToken',
    value: access_token,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    days: 1
  });

  return true;
}

export async function me() {
  const bearer = await getToken();
  try {
    const user = await client(bearer).get('me').json<User>();
    return user;
  } catch (error) {
    return null;
  }
}

const isAdmin = async () => {
  const user = await me();
  return user?.group_id === 1;
};

export async function logout() {
  const bearer = await getToken();
  const cookieStore = await cookies();
  const res = await client(bearer).post('logout');
  const status = res.status;
  if (status === 200) cookieStore.delete('authToken');
  return status;
}

export async function signup({
  username,
  password,
  email,
  full_name,
  group_id,
  media_id
}: SignupInput) {
  const bearer = await getToken();
  const res = await client(bearer).post('register', {
    json: {
      username,
      password,
      email,
      full_name,
      group_id,
      media_id
    }
  });
  const { access_token } = await res.json<SignupRes>();

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
  const res = await client(bearer).get('users').json<User[]>();
  return res;
}

export async function createCustomer({
  username,
  email,
  password,
  full_name,
  group_id
}: Omit<UpdateCustomerInput, 'user_id' | 'media_id'>) {
  const userIsAdmin = await isAdmin();
  if (!userIsAdmin) throw new Error('not_authorized');

  const bearer = await getToken();
  const res = await client(bearer).post('users', {
    json: {
      username,
      email,
      password,
      full_name,
      group_id
    }
  });
  return res.status;
}

export async function updateCustomer({
  user_id,
  username,
  full_name,
  media_id,
  group_id,
  password
}: UpdateCustomerInput) {
  const bearer = await getToken();
  const userIsAdmin = await isAdmin();
  const user = await me();
  const customer = await getCustomer({ customer_id: user_id });
  if (user?.user_id !== user_id && !userIsAdmin) throw new Error('not_authorized');
  const res = await client(bearer).put(`users/${user_id}`, {
    json: {
      user_id,
      username,
      password: password ?? customer.password,
      email: customer.email,
      full_name,
      group_id: group_id ?? customer.group_id,
      media_id: media_id ?? customer.media?.media_id
    }
  });

  return res.status;
}

export async function deleteCustomer({ user_id }: { user_id: number }) {
  const userIsAdmin = await isAdmin();
  if (!userIsAdmin) throw new Error('not_authorized');
  const bearer = await getToken();
  const res = await client(bearer).delete(`users/${user_id}`);
  return res.status;
}

export async function changePassword({ currentPassword, newPassword }: ChangePasswordInput) {
  const bearer = await getToken();
  const res = await client(bearer).put('change-password', {
    json: {
      current_password: currentPassword,
      new_password: newPassword
    }
  });
  console.log(await res.status);
  if (!(res.status === 200)) throw new Error('password_error');
  return res.status;
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
  const res = await client(bearer).put(`users/${user_id}`, {
    json: {
      ...customer,
      password: newPassword
    }
  });
  if (!(res.status === 200)) throw new Error('password_error');
}

export async function getCustomer({ customer_id }: { customer_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).get(`users/${customer_id}`, {}).json<User>();
  return res;
}

export async function getOrder({ order_id }: { order_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).get(`orders/${order_id}`).json<Order>();
  return res;
}

export async function getOrders() {
  const bearer = await getToken();
  const res = await client(bearer).get(`orders`).json<OrderWithItemsAndUser[]>();
  return res;
}

export async function getUserOrders({ user_id }: { user_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).get(`users/${user_id}/orders`).json<Order[]>();

  return res;
}
export async function getCurrentUserOrders() {
  const bearer = await getToken();
  const res = await client(bearer).get(`me/orders`).json<OrderWithItemsAndUser[]>();
  return res;
}

export async function getProduct({ product_id }: { product_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).get(`products/${product_id}`).json<Product>();
  return res;
}

export async function getProducts() {
  const bearer = await getToken();
  const res = await client(bearer).get(`products`).json<Product[]>();
  return res;
}

export async function getProductsByCategory({ category_id }: { category_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).get(`categories/${category_id}/products`).json<Product[]>();
  return res;
}

export async function getProductComments({ product_id }: { product_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).get(`products/${product_id}/comments`).json<Comment[]>();
  return res;
}

export async function createProduct({
  name,
  description,
  price,
  country_of_origin,
  category_id,
  media_id,
}: Omit<Product, 'product_id' | 'added_date' | 'owner_id' | 'media' | 'category'>) {
  const user = await me();
  const userIsAdmin = user?.group_id === 1;
  if (!userIsAdmin) throw new Error('not_authorized');
  const bearer = await getToken();
  const res = await client(bearer).post('products', {
    json: {
      name,
      description,
      price,
      country_of_origin,
      category_id,
      media_id ,
      owner_id: user?.user_id
    }
  });
  return res.status;
}

export async function updateProduct({
  product_id,
  name,
  description,
  price,
  country_of_origin,
  category_id,
  media_id
}: Omit<Product, 'added_date' | 'owner_id' | 'media' | 'category'>) {
	console.log(product_id, name, description, price, country_of_origin, category_id, media_id)
  const userIsAdmin = await isAdmin();
  if (!userIsAdmin) throw new Error('not_authorized');
  const bearer = await getToken();
  const res = await client(bearer).put(`products/${product_id}`, {
    json: {
      name,
      description,
      price,
      country_of_origin,
      category_id,
      media_id
    }
  });
  console.log(await res.json())
  return res.status;
}

export async function deleteProduct({ product_id }: { product_id: number }) {
  const userIsAdmin = await isAdmin();
  if (!userIsAdmin) throw new Error('not_authorized');
  const bearer = await getToken();
  const res = await client(bearer).delete(`products/${product_id}`);
  return res.status;
}

export async function getCategories() {
  const bearer = await getToken();
  const res = await client(bearer).get('categories').json<Category[]>();
  return res;
}

export async function getCategory({ category_id }: { category_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).get(`categories/${category_id}`).json<Category>();
  return res;
}

export async function createCategory({
  name,
  description,
  ordering,
  parent_id,
  media_id
}: Omit<Category, 'category_id' | 'media'>) {
  const userIsAdmin = await isAdmin();
  if (!userIsAdmin) throw new Error('not_authorized');
  const bearer = await getToken();
  const res = await client(bearer).post('categories', {
    json: {
      name,
      description,
      ordering,
      parent_id,
      media_id
    }
  });
  return res.status;
}

export async function updateCategory({
  category_id,
  name,
  description,
  ordering,
  parent_id,
  media_id
}: Omit<Category, 'media'>) {
  const userIsAdmin = await isAdmin();
  if (!userIsAdmin) throw new Error('not_authorized');
  const category = await getCategory({ category_id });
  const bearer = await getToken();
  const res = await client(bearer).put(`categories/${category_id}`, {
    json: {
      name,
      description,
      ordering,
      parent_id: parent_id ?? category.parent_id,
      media_id
    }
  });
  return res.status;
}

export async function deleteCategory({ category_id }: { category_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).delete(`categories/${category_id}`);
  return res.status;
}

export async function getComments() {
  const bearer = await getToken();
  const res = await client(bearer).get('comments').json<Comment[]>();
  return res;
}

export async function getComment({ comment_id }: { comment_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).get(`comments/${comment_id}`).json<Comment>();
  return res;
}

export async function deleteComment({ comment_id }: { comment_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).delete(`comments/${comment_id}`);
  return res.status;
}

export async function createComment({ product_id, content }: Omit<Comment, 'comment_id' | 'created_date' | 'user_id'>) {
  const bearer = await getToken();
  const user = await me();
  await client(bearer).post('comments', {
    json: {
      product_id,
      user_id: user?.user_id,
      content,
      created_date: new Date().toISOString()
    }
  });
}

export async function getShippingMethods() {
	const bearer = await getToken();
	const res = await client(bearer).get(`shipping-methods`).json<ShippingMethod[]>();
	return res;
  }

export async function getOrderItems() {
  const bearer = await getToken();
  const res = await client(bearer).get(`order-items`).json<OrderItem[]>();
  return res;
}

export async function getOrderItemsByOrder({ order_id }: { order_id: number }) {
  const bearer = await getToken();

  const res = await client(bearer).get(`orders/${order_id}/order-items`).json<OrderItem[]>();

  return res;
}

export async function getUserCreditCard({ user_id }: { user_id: number }) {
  const bearer = await getToken();
  const res = await client(bearer).get(`users/${user_id}/credit_card`).json<CreditCard>();
  return res;
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
  const credit_card_id = userCreditCard.credit_card_id;
  await client(bearer).put(`credit-cards/${credit_card_id}`, {
    json: {
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
  const res = await client(bearer)
    .post('orders', {
      json: {
        user_id: user_id,
        total_amount: total_amount,
        order_date: order_date,
        order_status: order_status
      }
    })
    .json<Order>();
  return res;
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
  const res = await client(bearer)
    .post('order-items', {
      json: {
        product_id: product_id,
        price_at_purchase: price_at_purchase,
        quantity: quantity,
        order_id: order_id
      }
    })
    .json<OrderItem>();
  return res;
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
  const user_id = user?.user_id;
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
  products,
  address,
  city,
  postal_code,
  shipping_method_id
}: {
  card_number: string;
  total_amount: number;
  products: CartItem[];
  address: string;
  city: string;
  postal_code: string;
  shipping_method_id: number;
}) {
  const bearer = await getToken();
  const mappedProducts = products.map((product) => ({
    product_id: product.id,
    quantity: product.quantity
  }));
  const res = await client(bearer)
    .post('make-purchase', {
      json: {
        card_number,
        total_amount,
        products: mappedProducts,
		address,
		city,
		postal_code,
		shipping_method_id
      }
    })
    .json<Order>();

  if (!res) throw new Error('payment_failed');
  return res;
}
