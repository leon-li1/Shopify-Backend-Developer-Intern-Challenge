import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import useSWR from 'swr';
import { Title, Content, MyButton, FormInput, ItemHeading } from '../../components';
import axios from 'axios';

const fetcher = (url: string) => fetch(url).then(res => res.json())

const ItemPage = () => {
    const { sku } = useRouter().query as { sku: string };
    const { data: item, error } = useSWR(sku ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/item/${sku}` : null, fetcher)

    if (error) return <div>failed to load</div>
    if (!item) return <div>loading...</div>
    
    return (
        <Content>
            <Title>Inventory Tracker</Title>
            <ItemHeading>{item.sku} – {item.name}</ItemHeading>
            <form onSubmit={e => updateItem(sku, e)} autoComplete='off'>
                <FormInput name='name' defaultValue={item.name} placeholder='Name'/><br/>
                <FormInput name='description' defaultValue={item.description} placeholder='Description'/><br/>
                <FormInput name='color' defaultValue={item.color} placeholder='No color'/><br/>
                <FormInput name='size' defaultValue={item.size} placeholder='No size'/><br/>
                <FormInput type='number' name='count' defaultValue={item.count} placeholder='Count'/><br/><br/>
                <MyButton type='submit'>Save</MyButton>
            </form>
            <MyButton onClick={() => deleteItem(sku)}>Delete this Item</MyButton>
            <Link href='/'><MyButton>Back to items</MyButton></Link>
        </Content>
    )
}

async function updateItem(sku: string, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);

    try {
        await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/item/${sku}`, { 
            sku: data.get('sku'),
            name: data.get('name'),
            description: data.get('description'),
            size: data.get('size'),
            color: data.get('color'),
            count: data.get('count'),
        });
        window.location.reload();
    } catch (error) {
        const errorMsg: string = (error as any)?.response?.data ?? 'Unknown error';
        alert(errorMsg);
    }
}

async function deleteItem(sku: string) {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/item/${sku}`);
        window.location.replace('/');
    } catch (error) {
        const errorMsg: string = (error as any)?.response?.data ?? 'Unknown error';
        alert(errorMsg);
    }
}

export default ItemPage;
