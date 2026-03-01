const check = async () => {
    const res = await fetch('http://localhost:3001/api/products');
    const data = await res.json();
    const p = data.products.find(p => p.id === 'h6');
    console.log('Title:', p.title);
    console.log('is_out_of_stock:', p.is_out_of_stock);
    console.log('type:', typeof p.is_out_of_stock);
};
check();
