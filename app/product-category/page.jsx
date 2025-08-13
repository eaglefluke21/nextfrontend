import { NextResponse } from 'next/server';
import ProductCategoryUI from './ui';
import getProductCategories from '@/lib/api/getProductCategories';

export default async function ProductCategoryPage() {
  let errorMsg = '';
  let json = {};
  try {
    
    const{data,error} = getProductCategories();
    json = data;
    errorMsg = error;
    const response = NextResponse.json(json);

    if (res.status === 200 && json.message === 'Token refreshed') {
      response.headers.set('x-refreshed', 'true');
      json.refreshed = true;
      json.newTokens = {
        access_token: json.data.access_token,
        refresh_token: json.data.refresh_token,
      };
    }
  } catch (err) {
    errorMsg = 'serve error : product category ';
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product Category</h1>
      <ProductCategoryUI data={json} error={errorMsg} />
    </div>
  );
}
