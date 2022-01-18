import useSWR from 'swr'
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import { Title, Content, MyButton, FormTitle, FormInput } from '../components';

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
    const { data: items, error } = useSWR(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/item/list`, fetcher)

    if (error) return <div>failed to load</div>
    if (!items) return <div>loading...</div>

    return (
        <div>
            <Title>Inventory Tracker</Title>'
            <Content>
                <div>
                    {!!items.length && <table>
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Name</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                    {items.map(item => (
                        <tr key={item.sku}>
                            <td><Link href={`/item/${item.sku}`}>{item.sku}</Link></td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                    </tbody>
                    </table>}
                    <MyButton disabled={!items.length} onClick={exportCsv}>Export to CSV</MyButton>
                </div>
                {!items.length && <p>Inventory is empty!</p>}
                <CreateItemForm />
            </Content>
        </div>
    )
}

const CreateItemForm = () => {
    return (
        <form onSubmit={createItem}>
            <FormTitle>Create a new item</FormTitle>
            <FormInput name='sku' placeholder='Enter SKU'/><br/>
            <FormInput name='name' placeholder='Enter name'/><br/>
            <FormInput name='description' placeholder='Enter description'/><br/>
            <FormInput name='size' placeholder='Enter size'/><br/>
            <FormInput name='color' placeholder='Enter color'/><br/>
            <FormInput type='number' name='count' placeholder='Enter count'/><br/>
            <MyButton type='submit'>Create</MyButton>
        </form>
    );
}

const createItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    try {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/item`, { 
            sku: data.get('sku'),
            name: data.get('name'),
            description: data.get('description'),
            size: data.get('size'),
            color: data.get('color'),
            count: data.get('count'),
        });
        window.location.replace('/item/' + data.get('sku'));
    } catch (error) {
        const errorMsg: string = (error as any)?.response?.data ?? 'Unknown error';
        alert(errorMsg);
    }
};

const exportCsv = () => {
    window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/item/export`);
};