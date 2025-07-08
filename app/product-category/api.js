export default async function ProdcutCategoryApi(){
    console.log('reaches function');
    const response = await fetch("http://localhost:8000/v1/tenant/category-image")
    console.log('response',response);
    return response.json();
}