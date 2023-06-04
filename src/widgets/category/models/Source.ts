import { Server } from 'shared/lib/source';
import { CategoryModel } from './Model';

export const CATEGORY_SOURCE = new Server({
    endpoint: 'categories',
    model: CategoryModel,
});
