import ProductCategoryUI from './ui';
import ClientRefreshBoundary from '@/lib/components/clientRefreshBoundary';
import { fetchWithAuth } from '@/lib/fetch/fetchwithAuth';
const baseurl = process.env.PHP_LOCAL_SITE_URL;

export default async function ProductCategoryPage() {
 let errorMsg = '';
 let json = {};
 let shouldRefresh = false;
  try {
    console.log('in product-category page');

    const{res, shouldClientRefresh} = await fetchWithAuth(`${baseurl}/v1/tenant/categories`, {
      cache: 'no-store'
    });

     shouldRefresh = shouldClientRefresh;

     if(!res.ok){
      errorMsg = 'Failed to fetch product category';
     }else{
      json = await res.json();
     }
     console.log('should refresh value', typeof(shouldRefresh),shouldRefresh);
  } catch (err) {
    errorMsg = 'serve error : product category ';
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product Category</h1>
      <ProductCategoryUI data={json} error={errorMsg} />
      <ClientRefreshBoundary shouldRefresh={shouldRefresh}/>
    </div>
  );
}
