import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { DataForm } from '../utils/types';
import { MemoryRouter } from 'react-router-dom';

/* eslint-disable testing-library/no-node-access */
    // Testing library's author, Kent, recommends to disable this :D
    // https://stackoverflow.com/questions/62770973/parent-node-in-react-testing-library#comment124767504_70434335

let posts: DataForm[] = [];

const handlers = () => {
    let nextId = 0;

    return [
        rest.get('*/api/v1/posts', (req, res, ctx) => {
            return res(ctx.json(posts))
        }),
        rest.get('*/api/v1/posts/:id', (req, res, ctx) => {
            return res(ctx.json(posts[parseInt(req.params.id as string)]))
        }),
        rest.post('*/api/v1/posts/', async (req, res, ctx) => {
            const data = await req.json();
            data.id = nextId++;
            posts.push(data);
            return res(ctx.json(data))
        }),
        rest.delete('*/api/v1/posts/:id', (req, res, ctx) => {
            posts = posts.filter( (e) => e.id !== parseInt(req.params.id as string))
            return res(ctx.json({}))
        }),
        rest.put('*/api/v1/posts/:id', async (req, res, ctx) => {
            const data = await req.json();
            const post = posts.find( (e) => e.id === parseInt(req.params.id as string));
            Object.assign(post!, data);
            return res(ctx.json(data));
        }),
    ]
}

const server = setupServer(...handlers());

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
    posts = [];
});
afterAll(() => server.close());

test('Shows the add vinyl screen', () => {
    render(<App />, {wrapper: MemoryRouter});
    fireEvent.click(screen.getByText('Add Vinyl'));
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Artist')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Submit')).toBeInTheDocument();
})

test('Adds the vinyl to the DataBase', async () => {
    render(<App />, {wrapper: MemoryRouter});
    fireEvent.click(screen.getByText('Add Vinyl'));
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Living la Vida Loca' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Lorem ipsum' } });
    fireEvent.change(screen.getByPlaceholderText('Artist'), { target: { value: 'Ricky Martin' } });
    fireEvent.click(screen.getByDisplayValue('Submit'));
    await waitForElementToBeRemoved(screen.queryByDisplayValue('Submit'));
    fireEvent.click(screen.getByText('Vinyl In DataBase'));
    await screen.findByText('Living la Vida Loca');
    expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
    expect(screen.getByText('Ricky Martin')).toBeInTheDocument();
})

test('Shows empty list of vinyls', async () => {
    render(<App />, {wrapper: MemoryRouter});
    fireEvent.click(screen.getByText('Vinyl In DataBase'));
    await screen.findByText('No Vinyl found. Please return to Options to add a Vinyl.');
})

test('Shows a detailed vinyl', async () => {
    posts.push({
        id: 0,
        title: 'Test title',
        content: 'Test description',
        lat: 'Test artist',
        long: 'Test vinyl type'
    })
    render(<App />, {wrapper: MemoryRouter});
    fireEvent.click(screen.getByText('Vinyl In DataBase'));
    await screen.findByText('Test title');
    fireEvent.click(screen.getByText('Title:').closest('div')!);
    await screen.findByText('Test title');
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Test artist')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Change Data')).toBeInTheDocument();
})

test('Delete a vinyl', async () => {
    posts.push({
        id: 0,
        title: 'Test title',
        content: 'Test description',
        lat: 'Test artist',
        long: 'Test vinyl type'
    })
    render(<App />, {wrapper: MemoryRouter});
    fireEvent.click(screen.getByText('Vinyl In DataBase'));
    await screen.findByText('Test title');
    fireEvent.click(screen.getByText('Title:').closest('div')!);
    await screen.findByText('Delete');
    fireEvent.click(screen.getByText('Delete'));
    await screen.findByText('No Vinyl found. Please return to Options to add a Vinyl.');
    expect(posts).toEqual([]);
})

test('Update a vinyl', async () => {
    posts.push({
        id: 0,
        title: 'Test title',
        content: 'Test description',
        lat: 'Test artist',
        long: 'Test vinyl type'
    })
    render(<App />, {wrapper: MemoryRouter});
    fireEvent.click(screen.getByText('Vinyl In DataBase'));
    await screen.findByText('Test title');
    fireEvent.click(screen.getByText('Title:').closest('div')!);
    await screen.findByText('Change Data');
    fireEvent.click(screen.getByText('Change Data'));
    await screen.findByPlaceholderText('Title');
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Living la Vida Loca' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Lorem ipsum' } });
    fireEvent.change(screen.getByPlaceholderText('Artist'), { target: { value: 'Ricky Martin' } });
    fireEvent.click(screen.getByDisplayValue('Submit'));
    await waitForElementToBeRemoved(screen.queryByDisplayValue('Submit'));
    await screen.findByText('Living la Vida Loca');
    expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
    expect(screen.getByText('Ricky Martin')).toBeInTheDocument();
})